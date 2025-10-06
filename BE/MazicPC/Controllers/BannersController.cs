using AutoMapper;
using MazicPC.DTOs.BannerDTO;
using MazicPC.DTOs.ManufacturerDTO;
using MazicPC.DTOs.UserDTO;
using MazicPC.Extensions;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannersController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public BannersController(MazicPcContext context, IMapper mapper, IWebHostEnvironment env)
        {
            _context = context;
            _mapper = mapper;
            _env = env;
        }

        // GET: api/Banners
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetBannerDto>>> GetBanners()
        {
            var banners = await _context.Banners.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<GetBannerDto>>(banners));
        }

        // GET: api/banners-with-product
        [HttpGet("with-product")]
        public async Task<ActionResult<IEnumerable<GetBannerWithProductDto>>> GetBannersWithProduct()
        {
            var banners = await _context.Banners.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<GetBannerWithProductDto>>(banners));
        }

        // GET: api/Banners/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetBannerDto>> GetBanner(int id)
        {
            var banner = await _context.Banners.FindAsync(id);

            if (banner == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GetBannerDto>(banner));
        }

        // PUT: api/Banners/5
        [RequestSizeLimit(10 * 1024 * 1024)]
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBanner(int id, [FromForm] BannerDto bannerDto, IFormFile? file)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner == null) return NotFound();

            _mapper.Map(bannerDto, banner);

            if (file != null)
            {
                try
                {
                    banner.ImageUrl = await FileHelper.SaveImageAsync(file, _env, Request, banner.ImageUrl);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Lỗi khi lưu file: " + ex.Message);
                }
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Banners
        [RequestSizeLimit(10 * 1024 * 1024)]
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult<GetBannerDto>> PostBanner([FromForm] BannerDto bannerDto, IFormFile file)
        {
            var banner = _mapper.Map<Banner>(bannerDto);

            try
            {
                banner.ImageUrl = await FileHelper.SaveImageAsync(file, _env, Request, banner.ImageUrl);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi khi lưu file: " + ex.Message);
            }

            _context.Banners.Add(banner);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<GetBannerDto>(banner);

            return CreatedAtAction("GetBanner", new { id = banner.Id }, result);
        }

        // DELETE: api/Banners/5
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner == null)
            {
                return NotFound();
            }

            _context.Banners.Remove(banner);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteBanners([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var banners = await _context.Banners.Where(banner => ids.Contains(banner.Id)).ToListAsync();

            if (!banners.Any())
                return NotFound("Không tìm thấy hãng sản xuất nào.");

            _context.Banners.RemoveRange(banners);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("exist/{id}")]
        public async Task<bool> BannerExists(int id)
        {
            return await _context.Banners.AnyAsync(e => e.Id == id);
        }
    }
}
