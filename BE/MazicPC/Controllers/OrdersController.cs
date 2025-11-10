using AutoMapper;
using MazicPC.DTOs.OrderDTO;
using MazicPC.Enum;
using MazicPC.Extensions;
using MazicPC.Models;
using MazicPC.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SysEnum = System.Enum;


namespace MazicPC.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper _mapper;
        private readonly PromotionHelper _promotionHelper;

        public OrdersController(MazicPcContext context, IMapper mapper, PromotionHelper promotionHelper)
        {
            _context = context;
            _mapper = mapper;
            _promotionHelper = promotionHelper;
        }

        // GET: api/Orders
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetOrderDto>>> GetOrders()
        {
            var accountId = this.GetCurrentAccountId();
            IQueryable<Order> query = _context.Orders;

            // Nếu là user thường thì chỉ lấy đơn hàng của chính mình
            if (!User.IsInRole(Roles.Admin))
            {
                query = query.Where(o => o.AccountId == accountId);
            }

            var orders = await query
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            var result = _mapper.Map<List<GetOrderDto>>(orders);
            return Ok(result);
        }

        [HttpGet("admin")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<IEnumerable<GetAdminOrderDto>>> GetAdminOrders()
        {
            var orders = await _context.Orders
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            var result = _mapper.Map<List<GetAdminOrderDto>>(orders);
            return Ok(result);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<GetOrderDto>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }
            // Nếu không phải admin thì chỉ xem đơn của chính mình
            var accountId = this.GetCurrentAccountId();

            if (!User.IsInRole(Roles.Admin) && order.AccountId != accountId)
                return Forbid();

            var result = _mapper.Map<GetOrderDto>(order);
            return Ok(result);
        }

        // PUT: api/Orders/5
        [HttpPut("{id}/cancel")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> CancelOrder(int id)
        {
            var accountId = this.GetCurrentAccountId();

            // 1️⃣ Lấy đơn hàng thuộc user hiện tại
            var order = await _context.Orders
                .Include(o => o.Payments)
                .FirstOrDefaultAsync(o => o.Id == id && o.AccountId == accountId);

            if (order == null)
                return NotFound("Không tìm thấy đơn hàng.");

            // 2️⃣ Kiểm tra trạng thái đơn hàng có thể hủy được không
            if (order.Status == OrderStatus.Cancelled.ToString())
                return BadRequest("Đơn hàng đã bị hủy trước đó.");

            if (order.Status == OrderStatus.Delivering.ToString() ||
                order.Status == OrderStatus.Completed.ToString())
                return BadRequest("Đơn hàng đã giao hoặc đang vận chuyển, không thể hủy.");

            // 3️⃣ Cập nhật trạng thái đơn hàng
            order.Status = OrderStatus.Cancelled.ToString();
            order.UpdatedAt = DateTime.Now;

            // 4️⃣ Nếu có thanh toán → cập nhật Payment.Status
            var payment = order.Payments.FirstOrDefault();
            if (payment != null)
            {
                // COD: có thể hủy nội bộ
                if (payment.PaymentMethod.ToLower() == PaymentMethodType.cod.ToString())
                {
                    payment.Status = PaymentStatus.Cancelled.ToString();
                }
                else
                {
                    // Ví điện tử → chỉ đánh dấu hủy, hoàn tiền do cổng thanh toán xử lý
                    payment.Status = PaymentStatus.Cancelled.ToString();
                    // (tùy hệ thống: có thể thêm trường IsRefundRequested = true)
                }

                payment.UpdatedAt = DateTime.Now;
            }

            // 5️⃣ Lưu thay đổi
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đơn hàng đã được hủy thành công.",
                orderId = order.Id,
                status = order.Status
            });
        }


        [HttpPut("{id}/status")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            // 1️⃣ Kiểm tra trạng thái hợp lệ
            if (!SysEnum.TryParse<OrderStatus>(status, true, out var parsedStatus))
                return BadRequest("Trạng thái không hợp lệ.");

            // 2️⃣ Lấy đơn hàng
            var order = await _context.Orders
                .Include(o => o.Payments)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound("Không tìm thấy đơn hàng.");

            var currentStatus = SysEnum.Parse<OrderStatus>(order.Status);

            // 3️⃣ Không cho phép cập nhật ngược
            if (currentStatus == OrderStatus.Completed || currentStatus == OrderStatus.Cancelled)
                return BadRequest("Đơn hàng đã hoàn tất hoặc bị hủy, không thể thay đổi trạng thái.");

            // 4️⃣ Cập nhật trạng thái đơn hàng
            order.Status = parsedStatus.ToString();
            order.UpdatedAt = DateTime.Now;

            // 5️⃣ Đồng bộ trạng thái thanh toán
            var payment = order.Payments.FirstOrDefault();
            if (payment != null)
            {
                if (payment.PaymentMethod.ToLower() == PaymentMethodType.cod.ToString())
                {
                    // COD: xử lý nội bộ
                    switch (parsedStatus)
                    {
                        case OrderStatus.Completed:
                            payment.Status = PaymentStatus.Completed.ToString();
                            payment.PaidAt = DateTime.Now;
                            break;
                        case OrderStatus.Cancelled:
                            payment.Status = PaymentStatus.Cancelled.ToString();
                            break;
                        default:
                            payment.Status = PaymentStatus.Pending.ToString();
                            break;
                    }
                }
                else
                {
                    // Ví điện tử: chỉ cập nhật khi hủy đơn
                    if (parsedStatus == OrderStatus.Cancelled)
                        payment.Status = PaymentStatus.Cancelled.ToString();
                }

                payment.UpdatedAt = DateTime.Now;
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Trạng thái đơn hàng đã được cập nhật thành '{parsedStatus}'.",
                orderId = order.Id,
                newStatus = parsedStatus.ToString()
            });
        }

        [HttpPost]
        [Authorize(Roles = Roles.User)]
        public async Task<ActionResult<GetOrderDto>> CreateOrder([FromBody] OrderDto dto)
        {
            var accountId = this.GetCurrentAccountId();

            // 1️⃣ Kiểm tra địa chỉ giao hàng
            var shippingAddress = await _context.ShippingAddresses
                .FirstOrDefaultAsync(a => a.Id == dto.ShippingAddressId && a.AccountId == accountId);
            if (shippingAddress == null)
                return BadRequest("Địa chỉ giao hàng không hợp lệ hoặc không thuộc về bạn.");

            // 2️⃣ Kiểm tra phương thức giao hàng
            var shippingMethod = await _context.ShippingMethods
                .FirstOrDefaultAsync(s => s.Id == dto.ShippingMethodId);
            if (shippingMethod == null)
                return BadRequest("Phương thức giao hàng không hợp lệ hoặc đã bị vô hiệu.");

            // 3️⃣ Kiểm tra mã giảm giá (nếu có)
            Coupon? coupon = null;
            if (!string.IsNullOrWhiteSpace(dto.CouponCode))
            {
                coupon = await _context.Coupons
                    .FirstOrDefaultAsync(c => c.Code == dto.CouponCode);

                if (coupon == null)
                    return BadRequest("Mã giảm giá không tồn tại.");

                // Kiểm tra thời gian
                var now = DateTime.UtcNow;
                if (now < coupon.StartDate)
                    return BadRequest("Mã giảm giá chưa đến thời gian áp dụng.");
                if (now > coupon.EndDate)
                    return BadRequest("Mã giảm giá đã hết hạn.");

                // Kiểm tra số lượng
                if (coupon.Quantity <= 0)
                    return BadRequest("Mã giảm giá đã hết lượt sử dụng.");
            }

            // 4️⃣ Khởi tạo Order
            var order = new Order
            {
                AccountId = (int)accountId!,
                ShippingAddressId = dto.ShippingAddressId,
                ShippingMethodId = dto.ShippingMethodId,
                Status = OrderStatus.Pending.ToString(),
                CreatedAt = DateTime.Now,
                OrderItems = new List<OrderItem>()
            };

            // 5️⃣ Thêm sản phẩm
            foreach (var item in dto.OrderItems)
            {
                var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == item.ProductId);
                if (product == null)
                    return BadRequest($"Sản phẩm ID {item.ProductId} không tồn tại.");

                var (finalPrice, _, _) = await _promotionHelper.CalculateDiscountAsync(product);

                order.OrderItems.Add(new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    Price = finalPrice
                });
            }

            // 6️⃣ Tính tổng tiền hàng
            var totalProductAmount = order.OrderItems.Sum(i => i.Price * i.Quantity);

            // 7️⃣ Áp dụng mã giảm giá (nếu có)
            decimal discountAmount = 0;
            if (coupon != null)
            {
                discountAmount = coupon.IsPercent
                    ? totalProductAmount * (decimal)(coupon.Discount / 100m)
                    : (decimal)coupon.Discount;

                // Giới hạn không vượt quá tổng tiền hàng
                discountAmount = Math.Min(discountAmount, totalProductAmount);

                // Giảm lượt sử dụng coupon
                coupon.Quantity -= 1;
                _context.Coupons.Update(coupon);

                _context.AccountCoupons.Add(new AccountCoupon
                {
                    AccountId = (int)accountId,
                    CouponId = coupon.Id,
                    UsedAt = DateTime.Now
                });
            }

            // 8️⃣ Cộng phí giao hàng
            var shippingFee = shippingMethod.Fee;

            // 9️⃣ Tính tổng cuối cùng
            order.TotalAmount = totalProductAmount - discountAmount + shippingFee;

            // 10️⃣ Tạo payment record
            order.Payments = new List<Payment>
            {
                new Payment
                {
                    PaymentMethod = dto.PaymentMethod,
                    Status = PaymentStatus.Pending.ToString(),
                    Amount = order.TotalAmount,
                    CreatedAt = DateTime.Now
                }
            };

            // 11️⃣ Lưu đơn hàng
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // 12️⃣ Map DTO trả về
            var result = _mapper.Map<GetOrderDto>(order);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, result);
        }

    }
}
