using AutoMapper;
using MazicPC.DTOs.ShippingAddressDTO;
using MazicPC.DTOs.ShippingMethodDTO;
using MazicPC.Extensions;
using MazicPC.Models;
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
        public async Task<ActionResult<IEnumerable<ShippingMethod>>> GetShippingMethods()
        {
            return await _context.ShippingMethods.ToListAsync();
        }

        // GET: api/ShippingMethods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShippingMethod>> GetShippingMethod(int id)
        {
            var shippingMethod = await _context.ShippingMethods.FindAsync(id);

            if (shippingMethod == null)
            {
                return NotFound();
            }

            return shippingMethod;
        }

        // PUT: api/ShippingMethods/5
        [HttpPut("{id}")]
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
        public async Task<ActionResult<ShippingMethod>> PostShippingMethod(ShippingMethodDto shippingMethodDto)
        {
            var shippingMethod = _mapper.Map<ShippingMethod>(shippingMethodDto);

            _context.ShippingMethods.Add(shippingMethod);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<ShippingMethod>(shippingMethodDto);

            return CreatedAtAction(nameof(GetShippingMethod), new { id = result.Id }, result);
        }

        // DELETE: api/ShippingMethods/5
        [HttpDelete("{id}")]
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
    }
}
