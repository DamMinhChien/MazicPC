using AutoMapper;
using MazicPC.DTOs.ChatDTO;
using MazicPC.DTOs.ProductDTO;
using MazicPC.Models;
using MazicPC.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly AiClient _ai;
        private readonly MazicPcContext _context;
        private readonly IMapper _mapper;
        private readonly PromotionHelper _promotionHelper;
        public ChatController(AiClient ai, MazicPcContext context, IMapper mapper, PromotionHelper promotionHelper)
        {
            _ai = ai;
            _context = context;
            _mapper = mapper;
            _promotionHelper = promotionHelper;
        }

        [HttpPost]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> Chat([FromBody] ChatRequestDto req)
        {
            try
            {
                var aiData = await _ai.AskAI(req.Message);

                if (!aiData.Success)
                {
                    return BadRequest("Dịch vụ AI xử lý không thành công.");
                }

                var products = await _context.Products
                    .Where(p => aiData.ProductIds.Contains(p.Id))
                    .Select(p => new
                    {
                        p.ImageUrl,
                        p.Name,
                        p.Price,
                        p.StockQty,
                        manufacturer = p.Manufacturer == null ? null : p.Manufacturer.Name
                    })
                    .ToListAsync();

                var res = new
                {
                    aiData.Message,
                    products
                };

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi khi giao tiếp với dịch vụ AI: " + ex.Message);
            }
        }

        // GET: api/Chat
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ChatGetProductDto>>> GetProducts()
        {
            var products = await _context.Products.OrderBy(p => p.Name).ToListAsync();

            var result = new List<ChatGetProductDto>();

            foreach (var product in products)
            {
                var (finalPrice, discount, promoName) = await _promotionHelper.CalculateDiscountAsync(product);
                var dto = _mapper.Map<ChatGetProductDto>(product);

                dto.FinalPrice = finalPrice;
                dto.DiscountValue = discount;
                dto.PromotionName = promoName;

                result.Add(dto);
            }

            return Ok(result);
        }
    }
}
