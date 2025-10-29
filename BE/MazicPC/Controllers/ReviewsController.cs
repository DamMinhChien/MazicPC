using AutoMapper;
using MazicPC.DTOs.ManufacturerDTO;
using MazicPC.DTOs.ReviewDTO;
using MazicPC.Enum;
using MazicPC.Extensions;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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

        public ReviewsController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Reviews
        [HttpGet("top10")]
        public async Task<ActionResult<IEnumerable<GetReviewDto>>> GetTop10Reviews()
        {
            var reviews = await _context.Reviews
                .OrderByDescending(r => r.CreatedAt)
                .ThenByDescending(r => r.Rating)
                .Take(10)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<GetReviewDto>>(reviews));
        }


        [HttpGet("{productId}")]
        public async Task<ActionResult<IEnumerable<GetReviewDto>>> GetReviewsByProduct(int productId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.ProductId == productId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<GetReviewDto>>(reviews));
        }

        [HttpPost]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> CreateReview([FromBody] ReviewDto dto)
        {
            var accountId = this.GetCurrentAccountId();

            // 1️⃣ Kiểm tra sản phẩm tồn tại
            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
                return NotFound("Sản phẩm không tồn tại.");

            // 2️⃣ Kiểm tra user đã đánh giá sản phẩm này chưa
            var existing = await _context.Reviews
                .FirstOrDefaultAsync(r => r.ProductId == dto.ProductId && r.AccountId == accountId);
            if (existing != null)
                return BadRequest("Bạn đã đánh giá sản phẩm này rồi.");

            // 3️⃣ Kiểm tra user đã mua sản phẩm này chưa
            var hasPurchased = await _context.OrderItems
                .Include(oi => oi.Order)
                .AnyAsync(oi =>
                    oi.ProductId == dto.ProductId &&
                    oi.Order.AccountId == accountId &&
                    oi.Order.Status == OrderStatus.Delivered.ToString() // chỉ tính đơn đã giao xong
                );

            if (!hasPurchased)
                return BadRequest("Bạn chỉ có thể đánh giá sản phẩm đã mua.");

            // 4️⃣ Tạo mới review
            var review = _mapper.Map<Review>(dto);
            review.AccountId = accountId!.Value;
            review.CreatedAt = DateTime.Now;

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<GetReviewDto>(review);

            return CreatedAtAction(nameof(GetReviewsByProduct), new { id = review.Id }, result);
        }

        // PUT: api/Reviews/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> UpdateReview(int id, [FromBody] ReviewDto dto)
        {
            var accountId = this.GetCurrentAccountId();

            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.Id == id && r.AccountId == accountId);
            if (review == null)
                return NotFound("Không tìm thấy đánh giá hoặc bạn không có quyền sửa.");

            _mapper.Map(review, dto);

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Reviews/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var accountId = this.GetCurrentAccountId();

            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.Id == id && r.AccountId == accountId);
            if (review == null)
                return NotFound("Không tìm thấy đánh giá hoặc bạn không có quyền xóa.");

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
