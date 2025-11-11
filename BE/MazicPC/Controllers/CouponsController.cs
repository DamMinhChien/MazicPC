using AutoMapper;
using MazicPC.DTOs.CouponDTO;
using MazicPC.DTOs.ShippingMethodDTO;
using MazicPC.Extensions;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        [Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<IEnumerable<GetCouponDto>>> GetCoupons()
        {
            var coupons = await _context.Coupons.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<GetCouponDto>>(coupons));
        }

        // GET: api/Coupons/5
        [HttpGet("{id}")]
        [Authorize(Roles = Roles.Admin)]
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
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> PutCoupon(int id, CouponDto couponDto)
        {
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon == null) return NotFound();

            _mapper.Map(couponDto, coupon);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Coupons
        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
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
        [Authorize(Roles = Roles.Admin)]
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
        [Authorize(Roles = Roles.Admin)]
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

        // GET: api/Coupons/validate/SALE10
        [Authorize]
        [HttpGet("validate/{code}")]
        public async Task<IActionResult> ValidateCoupon(string code)
        {
            var accountId = this.GetCurrentAccountId();
            if (string.IsNullOrWhiteSpace(code))
                return BadRequest("Mã giảm giá không được để trống.");

            var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Code == code);

            if (coupon == null)
                return NotFound("Mã giảm giá không tồn tại.");

            var exists = await _context.AccountCoupons.AnyAsync(ac => ac.AccountId == accountId && ac.CouponId == coupon.Id);
            if (exists) return BadRequest("Bạn đã sử dụng mã giảm giá này rồi.");

            var now = DateTime.UtcNow;

            if (now < coupon.StartDate)
                return BadRequest("Mã giảm giá chưa bắt đầu có hiệu lực.");

            if (now > coupon.EndDate)
                return BadRequest("Mã giảm giá đã hết hạn.");

            if (coupon.UsedCount >= coupon.Quantity)
                return BadRequest("Mã giảm giá đã được sử dụng hết.");

            // Hợp lệ
            var result = new
            {
                message = "Mã giảm giá hợp lệ.",
                discount = coupon.Discount,
                isPercent = coupon.IsPercent,
                startDate = coupon.StartDate,
                endDate = coupon.EndDate
            };

            return Ok(result);
        }

    }
}
