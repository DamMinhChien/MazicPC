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

        [HttpGet("revenue-by-week")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetRevenueByWeek()
        {
            var now = DateTime.Now;
            var currentMonth = now.Month;
            var currentYear = now.Year;

            // Lấy các đơn đã thanh toán trong tháng hiện tại
            var orders = await _context.Orders
                .Where(o => o.Payments != null &&
                o.Payments.Any(p => p.PaidAt != null &&
                                    p.PaidAt.Value.Month == currentMonth &&
                                    p.PaidAt.Value.Year == currentYear))
                .ToListAsync();

            // Tạo mảng doanh thu theo tuần (tối đa 5 tuần)
            decimal[] revenueByWeek = new decimal[5];

            foreach (var order in orders)
            {
                var paidAt = order.Payments.First().PaidAt!.Value;
                int week = GetWeekOfMonth(paidAt) - 1; // index từ 0
                revenueByWeek[week] += order.TotalAmount; // cộng tiền đơn vào tuần tương ứng
            }

            // Tạo labels
            var labels = Enumerable.Range(1, 5)
                .Select(x => $"Tuần {x}")
                .ToList();

            return Ok(new
            {
                labels,
                data = revenueByWeek
            });
        }

        int GetWeekOfMonth(DateTime date)
        {
            var firstDay = new DateTime(date.Year, date.Month, 1);
            return (date.Day + (int)firstDay.DayOfWeek - 1) / 7 + 1;
        }
    

        [HttpGet("revenue-by-category")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetRevenueByCategory()
        {
            // Lấy các đơn đã thanh toán theo danh mục
            var query = await _context.Orders
                .Where(o => o.Payments != null && o.Payments.Any(p => p.PaidAt != null))
                .SelectMany(o => o.OrderItems.Where(oi => oi.Product != null && oi.Product.Category != null).Select(oi => new
                {
                    Category = oi.Product!.Category!.Name,
                    Amount = o.Payments.First(p => p.PaidAt != null).Amount,
                }))
                .GroupBy(o => o.Category)
                .Select(g => new
                {
                    Category = g.Key,
                    Revenue = g.Sum(cat => cat.Amount)
                })
                .ToListAsync();

            var labels = query.Select(q => q.Category).ToList();
            var data = query.Select(q => q.Revenue).ToList();

            return Ok(new
            {
                labels,
                data
            });
        }
    }
}
