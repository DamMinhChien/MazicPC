using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatsController : ControllerBase
    {
        private readonly MazicPcContext _context;

        public StatsController(MazicPcContext context)
        {
            _context = context;
        }
        //Revenue = _context.Orders.Sum(o => o.TotalPrice)

        [HttpGet("totals")]
        public async Task<IActionResult> GetTotals()
        {
            var result = new
            {
                ProductCount = await _context.Products.CountAsync(),
                OrderCount = await _context.Orders.CountAsync(),
                CategoryCount = await _context.Categories.Where(c => c.ParentId != null).CountAsync(),
                ManufacturerCount = await _context.Manufacturers.CountAsync(),
                ProductsQuantityTotal = await _context.Products.SumAsync(p => p.StockQty),
            };

            return Ok(result);
        }

        [HttpGet("totalsAdmin")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetTotalsAdmin()
        {
            var result = new
            {
                ProductCount = await _context.Products.CountAsync(),
                OrderCount = await _context.Orders.CountAsync(),
                CategoryCount = await _context.Categories.Where(c => c.ParentId != null).CountAsync(),
                ManufacturerCount = await _context.Manufacturers.CountAsync(),
                ProductsQuantityTotal = await _context.Products.SumAsync(p => p.StockQty),
            };

            return Ok(result);
        }

        [HttpGet("category-statistics")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetQuantityByCategory()
        {
            var data = await _context.Categories
                .Where(cat => cat.ParentId != null)
                .Select(cat => new
                {
                    label = cat.Name,
                    productCount = cat.Products.Count(),
                    stockCount = cat.Products.Sum(p => p.StockQty)
                }).ToListAsync();
            var res = new
            {
                title = "Thống kê sản phẩm theo danh mục",
                xKey = "label",
                yKeys = new[] { "productCount", "stockCount" },
                labels = new[] { "Số sản phẩm", "Tồn kho" },
                colors = new[] { "#007bff", "#20c997" },
                data
            };

            return Ok(res);
        }

        [HttpGet("manufacturer-statistics")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetQuantityByManufacturer()
        {
            var data = await _context.Manufacturers
                .Select(m => new
                {
                    label = m.Name,
                    productCount = m.Products.Count(),
                    stockCount = m.Products.Sum(p => p.StockQty)
                }).ToListAsync();
            var res = new
            {
                title = "Thống kê sản phẩm theo hãng sản xuất",
                xKey = "label",
                yKeys = new[] { "productCount", "stockCount" },
                labels = new[] { "Số sản phẩm", "Tồn kho" },
                colors = new[] { "#ff9800", "#e91e63" },
                data
            };

            return Ok(res);
        }
    }
}
