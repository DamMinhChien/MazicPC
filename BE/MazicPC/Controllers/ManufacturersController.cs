using AutoMapper;
using MazicPC.DTOs.ManufacturerDTO;
using MazicPC.DTOs.UserDTO;
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
    public class ManufacturersController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper mapper;

        public ManufacturersController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET: api/Manufacturers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetManufacturerDto>>> GetManufacturers()
        {
            var manufacturer = await _context.Manufacturers.ToListAsync();
            return Ok(mapper.Map<IEnumerable<GetManufacturerDto>>(manufacturer));
        }

        // GET: api/Manufacturers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetManufacturerDto>> GetManufacturer(int id)
        {
            var manufacturer = await _context.Manufacturers.FindAsync(id);

            if (manufacturer == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<GetManufacturerDto>(manufacturer));
        }

        // PUT: api/Manufacturers/5
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutManufacturer(int id, [FromBody] ManufacturerDto manufacturerDto)
        {
            if (await _context.Manufacturers.FindAsync(id) is not Manufacturer manufacturer) return NotFound();

            mapper.Map(manufacturerDto, manufacturer);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Manufacturers
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult<GetManufacturerDto>> PostManufacturer([FromBody] ManufacturerDto manufacturerDto)
        {
            var manufacturer = mapper.Map<Manufacturer>(manufacturerDto);

            _context.Manufacturers.Add(manufacturer);
            await _context.SaveChangesAsync();

            // map lại sang DTO để có cả Id
            var result = mapper.Map<GetManufacturerDto>(manufacturer);

            return CreatedAtAction(nameof(GetManufacturer), new { id = manufacturer.Id }, result);
        }

        // DELETE: api/Manufacturers/5
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManufacturer(int id)
        {
            if (await _context.Manufacturers.FindAsync(id) is not Manufacturer manufacturer) return NotFound();

            _context.Manufacturers.Remove(manufacturer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteManufacturers([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var manufacturers = await _context.Manufacturers.Where(manufacturer => ids.Contains(manufacturer.Id)).ToListAsync();

            if (!manufacturers.Any())
                return NotFound("Không tìm thấy hãng sản xuất nào.");

            _context.Manufacturers.RemoveRange(manufacturers);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("exist/{id}")]
        public async Task<bool> ManufacturerExists(int id)
        {
            return await _context.Manufacturers.AnyAsync(e => e.Id == id);
        }
    }
}
