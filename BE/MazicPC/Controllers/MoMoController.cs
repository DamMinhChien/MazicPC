using MazicPC.DTOs.MoMoDTO;
using MazicPC.Enum;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Security.Cryptography;
using System.Text;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoMoController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly MazicPcContext _context;

        public MoMoController(IConfiguration config, IHttpClientFactory httpClientFactory, MazicPcContext context)
        {
            _context = context;
            _config = config;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("create-payment")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> CreatePayment([FromBody] MoMoPaymentRequestDto dto)
        {
            var order = await _context.Orders.Include(o => o.Payments).FirstOrDefaultAsync(o => o.Id == dto.OrderId);
            if (order == null) return BadRequest("Đơn hàng không tồn tại");

            var endpoint = _config["MoMo:CreateEndpoint"];
            var partnerCode = _config["MoMo:PartnerCode"];
            var accessKey = _config["MoMo:AccessKey"];
            var secretKey = _config["MoMo:SecretKey"];
            var returnUrl = _config["MoMo:ReturnUrl"];
            var ipnUrl = _config["MoMo:IpnUrl"];
            var requestType = _config["MoMo:RequestType"];
            var amount = (long)order.TotalAmount;

            string orderId = Guid.NewGuid().ToString();
            string requestId = Guid.NewGuid().ToString();
            string orderInfo = $"Thanh toán đơn hàng {order.Id}";
            string extraData = order.Id.ToString();

            string rawHash = $"accessKey={accessKey}&amount={amount}&extraData={extraData}&ipnUrl={ipnUrl}&orderId={orderId}&orderInfo={orderInfo}&partnerCode={partnerCode}&redirectUrl={returnUrl}&requestId={requestId}&requestType={requestType}";
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey!));
            var signature = BitConverter.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(rawHash))).Replace("-", "").ToLower();

            var payload = new
            {
                partnerCode,
                accessKey,
                requestId,
                amount,
                orderId,
                orderInfo,
                redirectUrl = returnUrl,
                lang = "vi",
                ipnUrl,
                extraData,
                requestType,
                signature
            };

            var client = _httpClientFactory.CreateClient();
            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(endpoint, content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine("MoMo CreatePayment Response Raw:");
            Console.WriteLine(responseBody);

            // Cập nhật payment trạng thái Processing
            var payment = order.Payments.Where(p => p.PaymentMethod.ToLower() == PaymentMethodType.momo.ToString().ToLower())
                   .OrderByDescending(p => p.CreatedAt).FirstOrDefault();
            if (payment != null)
            {
                payment.Status = PaymentStatus.Processing.ToString();
                payment.CreatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            return Content(responseBody, "application/json");
        }


        [HttpPost("notify")]
        public async Task<IActionResult> MoMoNotify([FromBody] MoMoNotifyDto data)
        {
            Console.WriteLine("MoMo callback: " + JsonConvert.SerializeObject(data));

            if (!int.TryParse(data.ExtraData, out int orderId))
                return BadRequest();

            var order = await _context.Orders.Include(o => o.Payments)
                                             .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null)
                return BadRequest();

            var payment = order.Payments.Where(p => p.PaymentMethod.ToLower() == PaymentMethodType.momo.ToString().ToLower())
                   .OrderByDescending(p => p.CreatedAt).FirstOrDefault();
            if (payment != null)
            {
                if (data.ResultCode == 0)
                {
                    payment.Status = PaymentStatus.Completed.ToString();
                    payment.TransactionCode = data.TransId.ToString(); // ✅ lưu TransId thực
                    payment.PaidAt = DateTime.UtcNow;
                    order.Status = OrderStatus.Confirmed.ToString();
                }
                else
                {
                    payment.Status = PaymentStatus.Failed.ToString();
                }

                await _context.SaveChangesAsync();
            }

            return Ok();
        }


        [HttpPost("refund-payment")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> RefundPayment([FromBody] MoMoPaymentRequestDto dto)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == dto.OrderId);
            if (order == null) return BadRequest("Đơn hàng không tồn tại");
            if (order.Status != OrderStatus.Cancelled.ToString() && order.Status != OrderStatus.Returned.ToString()) return BadRequest("Cần phải hủy đơn hàng hoặc đã trả hàng trước khi hoàn tiền");

            var payment = order.Payments.Where(p => p.PaymentMethod.ToLower() == PaymentMethodType.momo.ToString().ToLower())
                   .OrderByDescending(p => p.CreatedAt).FirstOrDefault();
            if (payment == null || payment.PaymentMethod.ToLower() != PaymentMethodType.momo.ToString()) return BadRequest("Đơn hàng chưa được thanh toán hoặc không phải thanh toán bằng MoMo");

            var endpoint = _config["MoMo:RefundEndpoint"];
            var partnerCode = _config["MoMo:PartnerCode"];
            var accessKey = _config["MoMo:AccessKey"];
            var secretKey = _config["MoMo:SecretKey"];
            var amount = (long)order.TotalAmount;
            var lang = "vi";
            var description = "";
            if (!long.TryParse(payment!.TransactionCode, out long transId))
            {
                return BadRequest("Mã giao dịch không hợp lệ");
            }

            string orderId = Guid.NewGuid().ToString();
            string requestId = Guid.NewGuid().ToString();

            string rawHash = $"accessKey={accessKey}&amount={amount}&description={description}&orderId={orderId}&partnerCode={partnerCode}&requestId={requestId}&transId={transId}";

            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey!));
            var signatureBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawHash));
            string signature = BitConverter.ToString(signatureBytes).Replace("-", "").ToLower();

            var payload = new
            {
                partnerCode,
                requestId,
                transId,
                amount,
                orderId,
                lang,
                description,
                signature
            };

            Console.WriteLine($"MoMo Refund Request:");
            Console.WriteLine($"endpoint: {endpoint}");
            Console.WriteLine($"rawHash: {rawHash}");
            Console.WriteLine($"signature: {signature}");
            Console.WriteLine($"payload: {JsonConvert.SerializeObject(payload)}");

            // post đến server momo
            var client = _httpClientFactory.CreateClient();
            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(endpoint, content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine("MoMo Refund Response:");
            Console.WriteLine($"statusCode: {response.StatusCode}");
            Console.WriteLine($"body: {responseBody}");

            // parse JSON
            var momoResponse = JsonConvert.DeserializeObject<MomoRefundResponseDto>(responseBody);

            if (momoResponse == null)
            {
                return BadRequest("Không đọc được phản hồi từ MoMo");
            }

            if (momoResponse.ResultCode != 0)
            {
                return BadRequest(momoResponse.Message);
            }

            // refund thành công
            //payment.TransactionCode = momoResponse.TransId.ToString();
            payment.Status = PaymentStatus.Refunded.ToString();
            payment.UpdatedAt = DateTime.Now;
            order.Status = OrderStatus.Returned.ToString();
            await _context.SaveChangesAsync();

            return Ok(momoResponse.Message);
        }

    }
}
