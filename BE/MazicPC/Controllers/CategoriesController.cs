using AutoMapper;
using AutoMapper.QueryableExtensions;
using MazicPC.DTOs.CategoryDTO;
using MazicPC.DTOs.ManufacturerDTO;
using MazicPC.Extensions;
using MazicPC.Models;
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

        public CategoriesController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
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
            var categories = await _context.Categories
                .ProjectTo<CategoryWithProductsDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(categories);
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
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromBody] CategoryDto categoryDto)
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
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/Categories
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult<CategoryAdminDto>> PostCategory([FromBody] CategoryDto categoryDto)
        {
            if (categoryDto == null)
                return BadRequest("Dữ liệu gửi lên không hợp lệ");

            var category = mapper.Map<Category>(categoryDto);

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
