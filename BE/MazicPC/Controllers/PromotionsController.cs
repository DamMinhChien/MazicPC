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

        // GET: api/promotions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetPromotionDto>>> GetPromotions()
        {
            var promotions = await _context.Promotions
                .Include(p => p.PromotionTargets)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<GetPromotionDto>>(promotions));
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
    }
}
