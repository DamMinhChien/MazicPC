using AutoMapper;
using MazicPC.DTOs.ShippingAddressDTO;
using MazicPC.DTOs.ShippingMethodDTO;
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
    public class ShippingMethodsController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper _mapper;

        public ShippingMethodsController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/ShippingMethods
        [HttpGet]
        [Authorize(Roles = Roles.User)]
        public async Task<ActionResult<IEnumerable<GetShippingMethodDto>>> GetShippingMethods()
        {
            var shippingMethods = await _context.ShippingMethods.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<GetShippingMethodDto>>(shippingMethods));
        }

        // GET: api/ShippingMethods/5
        [HttpGet("{id}")]
        [Authorize(Roles = Roles.User)]
        public async Task<ActionResult<GetShippingMethodDto>> GetShippingMethod(int id)
        {
            var shippingMethod = await _context.ShippingMethods.FindAsync(id);

            if (shippingMethod == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GetShippingMethodDto>(shippingMethod));
        }

        // PUT: api/ShippingMethods/5
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> PutShippingMethod(int id, ShippingMethodDto shippingMethodDto)
        {
            var shippingMethod = await _context.ShippingMethods.FindAsync(id);
            if (shippingMethod == null) return NotFound();

            _mapper.Map(shippingMethodDto, shippingMethod);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/ShippingMethods
        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<GetShippingMethodDto>> PostShippingMethod(ShippingMethodDto shippingMethodDto)
        {
            var shippingMethod = _mapper.Map<ShippingMethod>(shippingMethodDto);

            _context.ShippingMethods.Add(shippingMethod);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<GetShippingMethodDto>(shippingMethod);

            return CreatedAtAction(nameof(GetShippingMethod), new { id = result.Id }, result);
        }

        // DELETE: api/ShippingMethods/5
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteShippingMethod(int id)
        {
            var shippingMethod = await _context.ShippingMethods.FindAsync(id);
            if (shippingMethod == null)
            {
                return NotFound();
            }

            _context.ShippingMethods.Remove(shippingMethod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("bulk")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteShippingMethods([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var shippingMethods = await _context.ShippingMethods.Where(shippingMethod => ids.Contains(shippingMethod.Id)).ToListAsync();

            if (!shippingMethods.Any())
                return NotFound("Không tìm thấy phương thức vận chuyển nào.");

            _context.ShippingMethods.RemoveRange(shippingMethods);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
