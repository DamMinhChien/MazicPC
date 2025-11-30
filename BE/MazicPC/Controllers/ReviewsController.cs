using AutoMapper;
using MazicPC.DTOs.ManufacturerDTO;
using MazicPC.DTOs.ReviewDTO;
using MazicPC.Enum;
using MazicPC.Extensions;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper _mapper;

        /// <summary>
        /// Inject DbContext và AutoMapper
        /// </summary>
        public ReviewsController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

   
        // GET: api/Reviews/top10
        // Lấy 10 review mới nhất, ưu tiên rating cao
   
        [HttpGet("top10")]
        public async Task<ActionResult<IEnumerable<GetReviewDto>>> GetTop10Reviews()
        {
            var reviews = await _context.Reviews
                // Sắp xếp theo ngày tạo giảm dần (mới nhất trước)
                .OrderByDescending(r => r.CreatedAt)
                // Nếu trùng ngày thì ưu tiên rating cao
                .ThenByDescending(r => r.Rating)
                // Lấy 10 kết quả đầu
                .Take(10)
                .ToListAsync();

            // Map Entity → DTO trước khi trả về client
            return Ok(_mapper.Map<IEnumerable<GetReviewDto>>(reviews));
        }

        // GET: api/Reviews/{productId}
        // Lấy toàn bộ review của 1 sản phẩm

        [HttpGet("{productId}")]
        public async Task<ActionResult<IEnumerable<GetReviewDto>>> GetReviewsByProduct(int productId)
        {
            var reviews = await _context.Reviews
                // Chỉ lấy review thuộc sản phẩm yêu cầu
                .Where(r => r.ProductId == productId)
                // Sắp xếp mới nhất lên trên
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<GetReviewDto>>(reviews));
        }

      
        // POST: api/Reviews
        // User tạo đánh giá sản phẩm
    
        [HttpPost]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> CreateReview([FromBody] ReviewDto dto)
        {
            // Lấy AccountId từ JWT token
            var accountId = this.GetCurrentAccountId();

            // 1️⃣ Kiểm tra sản phẩm có tồn tại không
            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
                return NotFound("Sản phẩm không tồn tại.");

            // 2️⃣ Kiểm tra user đã review sản phẩm này chưa
            var existing = await _context.Reviews
                .FirstOrDefaultAsync(r =>
                    r.ProductId == dto.ProductId &&
                    r.AccountId == accountId);

            if (existing != null)
                return BadRequest("Bạn đã đánh giá sản phẩm này rồi.");

            // 3️⃣ Kiểm tra user đã mua sản phẩm này chưa
            var hasPurchased = await _context.OrderItems
                .Include(oi => oi.Order)
                .AnyAsync(oi =>
                    oi.ProductId == dto.ProductId &&
                    oi.Order.AccountId == accountId &&
                    // Chỉ tính những đơn đã hoàn thành
                    oi.Order.Status == OrderStatus.Completed.ToString()
                );

            if (!hasPurchased)
                return BadRequest("Bạn chỉ có thể đánh giá sản phẩm đã mua.");

            // 4️⃣ Tạo mới review
            var review = _mapper.Map<Review>(dto);

            // Gán user và thời gian tạo
            review.AccountId = accountId!.Value;
            review.CreatedAt = DateTime.Now;

            // Save database
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // Map lại entity -> DTO trả về client
            var result = _mapper.Map<GetReviewDto>(review);

            return CreatedAtAction(
                nameof(GetReviewsByProduct),
                new { id = review.Id },
                result
            );
        }

 
        // PUT: api/Reviews/{id}
        // User sửa review của chính mình
 
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> UpdateReview(int id, [FromBody] ReviewDto dto)
        {
            var accountId = this.GetCurrentAccountId();

            // Tìm review theo id + accountId
            var review = await _context.Reviews
                .FirstOrDefaultAsync(r =>
                    r.Id == id &&
                    r.AccountId == accountId);

            if (review == null)
                return NotFound("Không tìm thấy đánh giá hoặc bạn không có quyền sửa.");

            // Map dữ liệu DTO → entity
            _mapper.Map(review, dto);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Reviews/{id}
        // User xóa review của chính mình
     
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var accountId = this.GetCurrentAccountId();

            // Chỉ xóa review thuộc sở hữu user
            var review = await _context.Reviews
                .FirstOrDefaultAsync(r =>
                    r.Id == id &&
                    r.AccountId == accountId);

            if (review == null)
                return NotFound("Không tìm thấy đánh giá hoặc bạn không có quyền xóa.");

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
