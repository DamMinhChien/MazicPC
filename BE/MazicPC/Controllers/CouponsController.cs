using AutoMapper;
using MazicPC.DTOs.CouponDTO;
using MazicPC.DTOs.ShippingMethodDTO;
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
    [Authorize(Roles = Roles.Admin)]
    public class CouponsController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper _mapper;

        public CouponsController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Coupons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCouponDto>>> GetCoupons()
        {
            var coupons = await _context.Coupons.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<GetCouponDto>>(coupons));
        }

        // GET: api/Coupons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetCouponDto>> GetCoupon(int id)
        {
            var coupon = await _context.Coupons.FindAsync(id);

            if (coupon == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GetCouponDto>(coupon));
        }

        // PUT: api/Coupons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoupon(int id, CouponDto couponDto)
        {
            var coupon = await _context.ShippingMethods.FindAsync(id);
            if (coupon == null) return NotFound();

            _mapper.Map(couponDto, coupon);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Coupons
        [HttpPost]
        public async Task<ActionResult<GetCouponDto>> PostCoupon(CouponDto couponDto)
        {
            var coupon = _mapper.Map<Coupon>(couponDto);

            _context.Coupons.Add(coupon);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<GetCouponDto>(coupon);

            return CreatedAtAction(nameof(GetCoupon), new { id = result.Id }, result);
        }

        // DELETE: api/Coupons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoupon(int id)
        {
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon == null)
            {
                return NotFound();
            }

            _context.Coupons.Remove(coupon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteCoupons([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var coupons = await _context.Coupons.Where(coupon => ids.Contains(coupon.Id)).ToListAsync();

            if (!coupons.Any())
                return NotFound("Không tìm thấy phương thức vận chuyển nào.");

            _context.Coupons.RemoveRange(coupons);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
