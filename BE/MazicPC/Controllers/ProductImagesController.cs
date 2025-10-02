using AutoMapper;
using Humanizer;
using MazicPC.DTOs.BannerDTO;
using MazicPC.DTOs.ProductImageDTO;
using MazicPC.Extensions;
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
    public class ProductImagesController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public ProductImagesController(MazicPcContext context, IMapper mapper, IWebHostEnvironment env)
        {
            _context = context;
            _mapper = mapper;
            _env = env;
        }

        // GET: api/ProductImages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProductImages()
        {
            var productImages = await _context.ProductImages.ToListAsync();
            if(User.IsInRole(Roles.Admin)) return Ok(_mapper.Map<IEnumerable<AdminGetProductImageDto>>(productImages));
            return Ok(_mapper.Map<IEnumerable<UserGetProductImageDto>>(productImages));
        }

        // GET: api/ProductImages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductImage>> GetProductImage(int id)
        {
            var productImage = await _context.ProductImages.FindAsync(id);

            if (productImage == null)
            {
                return NotFound();
            }

            if (User.IsInRole(Roles.Admin)) return Ok(_mapper.Map<AdminGetProductImageDto>(productImage));
            return Ok(_mapper.Map<UserGetProductImageDto>(productImage));
        }

        // PUT: api/ProductImages/5
        [RequestSizeLimit(10 * 1024 * 1024)]
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductImage(int id, [FromForm] ProductImageDto productImageDto, IFormFile? file)
        {
            var productImage = await _context.ProductImages.FindAsync(id);
            if (productImage == null) return NotFound();

            _mapper.Map(productImageDto, productImage);

            if (file != null)
            {
                try
                {
                    productImage.ImageUrl = await FileHelper.SaveImageAsync(file, _env, Request, productImage.ImageUrl);
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

        // POST: api/ProductImages
        [RequestSizeLimit(10 * 1024 * 1024)]
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<IActionResult> PostProductImage([FromForm] ProductImageDto productImageDto, IFormFile file)
        {
            var productImage = _mapper.Map<ProductImage>(productImageDto);

            try
            {
                productImage.ImageUrl = await FileHelper.SaveImageAsync(file, _env, Request, productImage.ImageUrl);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi khi lưu file: " + ex.Message);
            }

            _context.ProductImages.Add(productImage);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<AdminGetProductImageDto>(productImage);

            return CreatedAtAction(nameof(GetProductImage), new { id = productImage.Id }, result);
        }

        // DELETE: api/ProductImages/5
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteProductImage(int id)
        {
            var productImage = await _context.ProductImages.FindAsync(id);
            if (productImage == null)
            {
                return NotFound();
            }

            _context.ProductImages.Remove(productImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteProductImages([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var productImages = await _context.ProductImages.Where(productImage => ids.Contains(productImage.Id)).ToListAsync();

            if (!productImages.Any())
                return NotFound("Không tìm thấy hình ảnh sản phẩm nào.");

            _context.ProductImages.RemoveRange(productImages);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("exist/{id}")]
        public async Task<bool> ProductImageExists(int id)
        {
            return await _context.ProductImages.AnyAsync(e => e.Id == id);
        }
    }
}
