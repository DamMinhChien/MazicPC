using MazicPC.DTOs.CartDTO;
using MazicPC.Extensions;
using MazicPC.Models;
using MazicPC.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly PromotionHelper promotionHelper;

        public CartsController(MazicPcContext context, PromotionHelper promotionHelper)
        {
            _context = context;
            this.promotionHelper = promotionHelper;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts.ToListAsync();
        }

        // GET: api/Carts/5
        [Authorize(Roles = Roles.User)]
        [HttpGet("me")]
        public async Task<IActionResult> GetCart()
        {
            var accId = this.GetCurrentAccountId();
            if (accId == null) return Unauthorized();

            var cart = await _context.Carts
                .FirstOrDefaultAsync(c => c.AccountId == accId);

            if (cart == null)
            {
                // Nếu chưa có giỏ hàng → trả rỗng
                return Ok(new { cartId = (int?)null, items = new List<object>() });
            }

            var items = new List<object>();

            foreach (var item in cart.CartItems)
            {
                var product = item.Product!;
                var (finalPrice, discount, promoName) = await promotionHelper.CalculateDiscountAsync(product);
                items.Add(new
                {
                    item.ProductId,
                    item.Quantity,
                    item.Product!.Name,
                    item.Product.Price,
                    item.Product.StockQty,
                    item.Product.ImageUrl,
                    FinalPrice = finalPrice,
                    DiscountValue = discount,
                    PromotionName = promoName
                });
            }

            return Ok(new
            {
                cartId = cart.Id,
                accountId = cart.AccountId,
                items
            });
        }


        // PUT: api/Carts/5
        [Authorize(Roles = Roles.User)]
        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateCartItem(int productId, [FromBody] UpdateCartItemDto updateDto)
        {
            var accId = this.GetCurrentAccountId();
            if (accId == null) return Unauthorized();

            await using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // 1. Lấy cart của user
                var cart = await _context.Carts
                    .FirstOrDefaultAsync(c => c.AccountId == accId);

                if (cart == null)
                    return NotFound(new { message = "Không tìm thấy giỏ hàng." });

                // 2. Lấy item trong cart
                var cartItem = await _context.CartItems
                    .FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == productId);

                if (cartItem == null)
                    return NotFound(new { message = "Sản phẩm không tồn tại trong giỏ hàng." });

                // 3. Cập nhật số lượng (nếu = 0 thì xóa luôn)
                if (updateDto.Quantity <= 0)
                {
                    _context.CartItems.Remove(cartItem);
                }
                else
                {
                    cartItem.Quantity = updateDto.Quantity;
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(new { message = "Lỗi khi cập nhật giỏ hàng", error = ex.Message });
            }
        }


        // POST: api/Carts
        [Authorize(Roles = Roles.User)]
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto cartDto)
        {
            var accId = this.GetCurrentAccountId();
            if (accId == null) return Unauthorized();

            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.AccountId == accId);

            if (cart == null)
            {
                cart = new Cart { AccountId = accId.Value };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            var item = await _context.CartItems
                .FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == cartDto.ProductId);

            if (item != null)
                item.Quantity += cartDto.Quantity;
            else
                _context.CartItems.Add(new CartItem
                {
                    CartId = cart.Id,
                    ProductId = cartDto.ProductId,
                    Quantity = cartDto.Quantity,
                });

            await _context.SaveChangesAsync();

            return Ok("Thêm vào giỏ hàng thành công");
        }


        // DELETE: api/Carts/5
        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteCart(int productId)
        {
            var accId = this.GetCurrentAccountId();
            if (accId == null) return Unauthorized();

            await using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var cart = await _context.Carts
                    .FirstOrDefaultAsync(c => c.AccountId == accId);

                if (cart == null)
                    return NotFound(new { message = "Không tìm thấy giỏ hàng." });


                var cartItem = await _context.CartItems
                        .FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == productId);

                if (cartItem == null)
                    return NotFound(new { message = "Sản phẩm không tồn tại trong giỏ hàng." });



                _context.CartItems.Remove(cartItem);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(new { message = "Lỗi khi cập nhật giỏ hàng", error = ex.Message });
            }


        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
