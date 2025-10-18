using MazicPC.Models;
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
                ManufacturerCount = await _context.Manufacturers.CountAsync()
            };

            return Ok(result);
        }
    }
}
