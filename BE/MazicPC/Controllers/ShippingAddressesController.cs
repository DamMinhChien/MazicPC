using AutoMapper;
using MazicPC.DTOs.Product;
using MazicPC.DTOs.ShippingAddressDTO;
using MazicPC.Extensions;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.User)]
    public class ShippingAddressesController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper mapper;

        public ShippingAddressesController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET: api/ShippingAddresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetShippingAddressDto>>> GetShippingAddresses()
        {
            var shippingAddresses = await _context.ShippingAddresses.ToListAsync();
            return Ok(mapper.Map<IEnumerable<GetShippingAddressDto>>(shippingAddresses));
        }

        // GET: api/ShippingAddresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetShippingAddressDto>> GetShippingAddress(int id)
        {
            var shippingAddress = await _context.ShippingAddresses.FindAsync(id);

            if (shippingAddress == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<GetShippingAddressDto>(shippingAddress));
        }

        // PUT: api/ShippingAddresses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShippingAddress(int id, [FromBody] ShippingAddressDto shippingAddressDto)
        {
            var shippingAddress = await _context.ShippingAddresses.FindAsync(id);
            if (shippingAddress == null) return NotFound();

            mapper.Map(shippingAddressDto, shippingAddress);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/ShippingAddresses
        [HttpPost]
        public async Task<ActionResult<GetShippingAddressDto>> PostShippingAddress([FromBody] ShippingAddressDto shippingAddressDto)
        {
            var shippingAddress = mapper.Map<ShippingAddress>(shippingAddressDto);

            _context.ShippingAddresses.Add(shippingAddress);
            await _context.SaveChangesAsync();

            var result = mapper.Map<GetShippingAddressDto>(shippingAddress);

            return CreatedAtAction(nameof(GetShippingAddress), new { id = shippingAddress.Id }, result);
        }


        // DELETE: api/ShippingAddresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShippingAddress(int id)
        {
            var shippingAddress = await _context.ShippingAddresses.FindAsync(id);
            if (shippingAddress == null)
            {
                return NotFound();
            }

            _context.ShippingAddresses.Remove(shippingAddress);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShippingAddressExists(int id)
        {
            return _context.ShippingAddresses.Any(e => e.Id == id);
        }
    }
}
