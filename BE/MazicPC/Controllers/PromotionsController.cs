using AutoMapper;
using MazicPC.DTOs.PromotionDTO;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class PromotionsController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper _mapper;

        public PromotionsController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/promotions?type=product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetPromotionDto>>> GetPromotions([FromQuery] string? type)
        {
            var query = _context.Promotions.AsQueryable();

            // Nếu có truyền type => lọc theo targetType
            if (!string.IsNullOrEmpty(type))
            {
                query = query.Where(p => p.PromotionTargets.Any(t => t.TargetType == type));
            }

            var promotions = await query.ToListAsync();
            var result = _mapper.Map<IEnumerable<GetPromotionDto>>(promotions);

            foreach (var promo in result)
            {
                var entity = promotions.First(p => p.Id == promo.Id);

                if (type == "product")
                {
                    promo.TargetNames = await _context.PromotionTargets
                        .Where(t => t.PromotionId == promo.Id && t.TargetType == "product")
                        .Join(_context.Products, t => t.TargetId, pr => pr.Id, (t, pr) => pr.Name)
                        .ToListAsync();
                }
                else if (type == "category")
                {
                    promo.TargetNames = await _context.PromotionTargets
                        .Where(t => t.PromotionId == promo.Id && t.TargetType == "category")
                        .Join(_context.Categories, t => t.TargetId, c => c.Id, (t, c) => c.Name)
                        .ToListAsync();
                }
                else if (type == "manufacturer")
                {
                    promo.TargetNames = await _context.PromotionTargets
                        .Where(t => t.PromotionId == promo.Id && t.TargetType == "manufacturer")
                        .Join(_context.Manufacturers, t => t.TargetId, c => c.Id, (t, c) => c.Name)
                        .ToListAsync();
                }
                else if (type == "global")
                {
                    promo.TargetNames = new List<string> { "All products" };
                }
            }

            return Ok(result);
        }


        // GET: api/promotions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GetPromotionDto>> GetPromotion(int id)
        {
            var promotion = await _context.Promotions
                .Include(p => p.PromotionTargets)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (promotion == null)
                return NotFound();

            return Ok(_mapper.Map<GetPromotionDto>(promotion));
        }

        // POST: api/promotions
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult<GetPromotionDto>> CreatePromotion(PromotionDto dto)
        {
            var promotion = _mapper.Map<Promotion>(dto);
            _context.Promotions.Add(promotion);
            await _context.SaveChangesAsync();

            if (dto.Targets != null && dto.Targets.Any())
            {
                var targets = dto.Targets.Select(t => new PromotionTarget
                {
                    PromotionId = promotion.Id,
                    TargetType = t.TargetType,
                    TargetId = t.TargetId
                }).ToList();

                _context.PromotionTargets.AddRange(targets);
                await _context.SaveChangesAsync();
            }

            var result = await _context.Promotions
                .Include(p => p.PromotionTargets)
                .FirstAsync(p => p.Id == promotion.Id);

            return CreatedAtAction(nameof(GetPromotion), new { id = promotion.Id },
                _mapper.Map<GetPromotionDto>(result));
        }

        // PUT: api/promotions/{id}
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePromotion(int id, PromotionDto dto)
        {
            var promotion = await _context.Promotions
                .Include(p => p.PromotionTargets)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (promotion == null)
                return NotFound();

            _mapper.Map(dto, promotion);
            promotion.UpdatedAt = DateTime.Now;

            // Xóa target cũ, thêm target mới
            _context.PromotionTargets.RemoveRange(promotion.PromotionTargets);

            if (dto.Targets != null && dto.Targets.Any())
            {
                var newTargets = dto.Targets.Select(t => new PromotionTarget
                {
                    PromotionId = promotion.Id,
                    TargetType = t.TargetType,
                    TargetId = t.TargetId
                });
                _context.PromotionTargets.AddRange(newTargets);
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/promotions/{id}
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null)
                return NotFound();

            _context.Promotions.Remove(promotion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/promotions/bulk
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("bulk")]
        public async Task<IActionResult> DeletePromotionsBulk([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách ID không được để trống.");

            var promotions = await _context.Promotions
                .Where(p => ids.Contains(p.Id))
                .ToListAsync();

            if (!promotions.Any())
                return NotFound("Không tìm thấy khuyến mãi nào khớp với danh sách ID.");

            _context.Promotions.RemoveRange(promotions);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
