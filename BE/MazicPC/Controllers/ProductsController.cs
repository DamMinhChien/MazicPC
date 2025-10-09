using AutoMapper;
using MazicPC.DTOs.Product;
using MazicPC.DTOs.ProductDTO;
using MazicPC.DTOs.UserDTO;
using MazicPC.Extensions;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MazicPcContext db;
        private readonly IMapper mapper;
        private readonly IWebHostEnvironment _env;

        public ProductsController(MazicPcContext context, IMapper mapper, IWebHostEnvironment env)
        {
            db = context;
            this.mapper = mapper;
            _env = env;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts()
        {
            var products = await db.Products.ToListAsync();

            if (User.IsInRole(Roles.Admin))
            {
                return Ok(mapper.Map<IEnumerable<AdminGetProductDto>>(products));
            }

            return Ok(mapper.Map<IEnumerable<UserGetProductDto>>(products));
        }

        // Search Query
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] ProductQueryDto query)
        {
            var products = db.Products.AsQueryable();

            if (query.PriceMin > query.PriceMax) (query.PriceMin, query.PriceMax) = (query.PriceMax, query.PriceMin);

            // --- Tìm kiếm ---
            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                products = products.Where(p => p.Name.Contains(query.Search) ||
                p.ShortDescription != null && p.ShortDescription.Contains(query.Search) ||
                p.Description != null && p.Description.Contains(query.Search));
            }
            // --- Lọc ---
            if (!string.IsNullOrWhiteSpace(query.Category))
            {
                products = products.Where(p => p.Category != null && p.Category.Name == query.Category);
            }

            if (!string.IsNullOrWhiteSpace(query.Manufacturer))
            {
                products = products.Where(p => p.Manufacturer != null && p.Manufacturer.Name == query.Manufacturer);
            }

            if (query.PriceMax.HasValue)
            {
                products = products.Where(p => p.Price >= query.PriceMax);
            }

            if (query.PriceMin.HasValue)
            {
                products = products.Where(p => p.Price <= query.PriceMin);
            }
            // --- Sắp xếp ---
            products = query.Sort switch
            {
                "price_asc" => products.OrderBy(p => p.Price),
                "price_desc" => products.OrderByDescending(p => p.Price),
                "newest" => products.OrderBy(p => p.CreatedAt),
                "oldest" => products.OrderByDescending(p => p.CreatedAt),
                "name" => products.OrderByDescending(p => p.Name),
                _ => products.OrderBy(p => p.Name)
            };
            // --- Phân trang ---
            var totalItems = await products.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)query.Limit);
            var res = await products
                .Skip((query.Page - 1) * query.Limit)
                .Take(query.Limit)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.ImageUrl,
                    p.Price
                })
                .ToListAsync();

            return Ok(new
            {
                success = true,
                message = "Lấy sản phẩm thành công",
                data = res,
                pagination = new
                {
                    query.Page,
                    query.Limit,
                    totalItems,
                    totalPages
                }
            });
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetProduct(int id)
        {
            var product = await db.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            if (User.IsInRole(Roles.Admin))
                return Ok(mapper.Map<AdminGetProductDto>(product));

            return mapper.Map<UserGetProductDto>(product);
        }

        [HttpGet("{id}/details")]
        public async Task<ActionResult<GetDetailProductDto>> GetDetailProduct(int id)
        {
            var product = await db.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return mapper.Map<GetDetailProductDto>(product);
        }

        // PUT: api/Products/5
        [RequestSizeLimit(10 * 1024 * 1024)]
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] ProductDto productDto, IFormFile? file)
        {
            var product = await db.Products.FindAsync(id);
            if (product == null) return NotFound();

            mapper.Map(productDto, product);

            if (file != null)
            {
                try
                {
                    product.ImageUrl = await FileHelper.SaveImageAsync(file, _env, Request, product.ImageUrl);
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

            await db.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Products
        [RequestSizeLimit(10 * 1024 * 1024)]
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult<AdminGetProductDto>> PostProduct([FromForm] ProductDto productDto, IFormFile? file)
        {
            var product = mapper.Map<Product>(productDto);

            if (file != null)
            {
                try
                {
                    product.ImageUrl = await FileHelper.SaveImageAsync(file, _env, Request, product.ImageUrl);
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

            db.Products.Add(product);
            await db.SaveChangesAsync();

            var result = mapper.Map<AdminGetProductDto>(product);

            return CreatedAtAction("GetProduct", new { id = product.Id }, result);
        }

        [HttpPost("abc")]
        public async Task<ActionResult<AdminGetProductDto>> PostProductagfwafg([FromBody] ProductDto productDto)
        {
            var product = mapper.Map<Product>(productDto);

            db.Products.Add(product);
            await db.SaveChangesAsync();

            var result = mapper.Map<AdminGetProductDto>(product);

            return CreatedAtAction("GetProduct", new { id = product.Id }, result);
        }

        // DELETE: api/Products/5
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            await db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteProducts([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var products = await db.Products.Where(product => ids.Contains(product.Id)).ToListAsync();

            if (!products.Any())
                return NotFound("Không tìm thấy danh mục nào.");

            db.Products.RemoveRange(products);
            await db.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("exist/{id}")]
        public async Task<bool> ProductExists(int id)
        {
            return await db.Products.AnyAsync(e => e.Id == id);
        }
    }
}
