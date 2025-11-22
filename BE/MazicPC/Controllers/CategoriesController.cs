using AutoMapper;
using AutoMapper.QueryableExtensions;
using MazicPC.DTOs.CategoryDTO;
using MazicPC.DTOs.ManufacturerDTO;
using MazicPC.Extensions;
using MazicPC.Models;
using MazicPC.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper mapper;
        private readonly IWebHostEnvironment _env;
        private readonly PromotionHelper _promotionHelper;

        public CategoriesController(MazicPcContext context, IMapper mapper, IWebHostEnvironment env, PromotionHelper promotionHelper)
        {
            _context = context;
            this.mapper = mapper;
            _env = env;
            _promotionHelper = promotionHelper;
        }

        // API cho user -> trả về dạng cây
        [HttpGet("tree")]
        public async Task<IActionResult> GetCategoryTree()
        {
            var categories = await _context.Categories
                .ProjectTo<CategoryUserDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            var nestedCategories = CategoryHelper.BuildCategoryTree(categories);
            return Ok(nestedCategories);
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryAdminDto>>> GetCategories()
        {
            var categories = await _context.Categories
                .ProjectTo<CategoryAdminDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(categories);
        }

        // GET: api/Categories/with-products
        [HttpGet("with-products")]
        public async Task<IActionResult> GetCategoriesWithProducts()
        {
            // 1. Lấy các danh mục con
            var categories = await _context.Categories
                .Where(c => c.ParentId != null)
                .ToListAsync();

            // 2. Map sang DTO trước
            var categoryDtos = mapper.Map<List<CategoryWithProductsDto>>(categories);

            // 3. Tính giảm giá và gán vào DTO
            foreach (var catDto in categoryDtos)
            {
                foreach (var productDto in catDto.Products)
                {
                    // Tìm lại entity Product tương ứng
                    var productEntity = categories
                        .SelectMany(c => c.Products)
                        .First(p => p.Id == productDto.Id);

                    // Gọi helper để lấy giá giảm
                    var (finalPrice, discountValue, promotionName, _, _) = await _promotionHelper.CalculateDiscountAsync(productEntity);

                    // Gán vào DTO
                    productDto.FinalPrice = finalPrice;
                    productDto.DiscountValue = discountValue;
                    productDto.PromotionName = promotionName;
                }
            }

            // 4. Trả kết quả
            return Ok(categoryDtos);
        }



        // GET: api/Categories/root
        [HttpGet("roots")]
        public async Task<ActionResult<IEnumerable<CategoryAdminDto>>> GetRoot()
        {
            var categories = await _context.Categories
                .Where(cat => cat.ParentId == null)
                .ProjectTo<CategoryAdminDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("not-roots")]
        public async Task<ActionResult<IEnumerable<CategoryAdminDto>>> GetNotRoot()
        {
            var categories = await _context.Categories
                .Where(cat => cat.ParentId != null)
                .ProjectTo<CategoryAdminDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(categories);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryAdminDto>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<CategoryAdminDto>(category));
        }

        // PUT: api/Categories/5
        [RequestSizeLimit(10 * 1024 * 1024)]
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromForm] CategoryDto categoryDto, IFormFile? file)
        {
            if (categoryDto == null)
                return BadRequest("Dữ liệu gửi lên không hợp lệ");

            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            if (categoryDto.ParentId == id)
                return BadRequest("Danh mục không thể là cha của chính nó.");

            mapper.Map(categoryDto, category);

            if (file != null)
            {
                try
                {
                    category.ImageUrl = await FileHelper.SaveImageAsync(file, _env, Request, category.ImageUrl);
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

        // POST: api/Categories
        [RequestSizeLimit(10 * 1024 * 1024)]
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult<CategoryAdminDto>> PostCategory([FromForm] CategoryDto categoryDto, IFormFile? file)
        {
            if (categoryDto == null)
                return BadRequest("Dữ liệu gửi lên không hợp lệ");

            var category = mapper.Map<Category>(categoryDto);

            if (file != null)
            {
                try
                {
                    category.ImageUrl = await FileHelper.SaveImageAsync(file, _env, Request, category.ImageUrl);
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

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            var result = mapper.Map<CategoryAdminDto>(category);

            return CreatedAtAction("GetCategory", new { id = category.Id }, result);
        }

        // DELETE: api/Categories/5
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            // ⚡ Update con về null trước khi xoá
            var children = await _context.Categories
                .Where(c => c.ParentId == id)
                .ToListAsync();

            foreach (var child in children)
            {
                child.ParentId = null;
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Categories/bulk
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteCategories([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var categories = await _context.Categories
                .Where(category => ids.Contains(category.Id))
                .ToListAsync();

            if (!categories.Any())
                return NotFound("Không tìm thấy danh mục nào.");

            // ⚡ Update con về null trước khi xoá cha
            var children = await _context.Categories
                .Where(c => c.ParentId.HasValue && ids.Contains(c.ParentId.Value))
                .ToListAsync();

            foreach (var child in children)
            {
                child.ParentId = null;
            }

            _context.Categories.RemoveRange(categories);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("exist/{id}")]
        public async Task<bool> CategoryExists(int id)
        {
            return await _context.Categories.AnyAsync(e => e.Id == id);
        }
    }
}
