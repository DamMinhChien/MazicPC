using AutoMapper;
using Humanizer;
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
    public class UsersController : ControllerBase
    {
        private readonly MazicPcContext _context;
        private readonly IMapper mapper;

        public UsersController(MazicPcContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        // GET: api/Users
        [Authorize(Roles = Roles.Admin)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminGetUserDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(mapper.Map<IEnumerable<AdminGetUserDto>>(users));
        }

        // GET: api/Users/5
        [Authorize(Roles = Roles.Admin)]
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminGetUserDto>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<AdminGetUserDto>(user));
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("me")]
        public async Task<IActionResult> PutUser([FromBody] PutUserDto userDto)
        {

            var user = await _context.Users.FindAsync(this.GetCurrentUserId());
            if (user == null) return NotFound();

            mapper.Map(userDto, user);

            await _context.SaveChangesAsync();

            return NoContent();

        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromBody] PutUserDto userDto)
        {

            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            mapper.Map(userDto, user);

            await _context.SaveChangesAsync();

            return NoContent();

        }

        // DELETE: api/Users/5
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteUsers([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var currentUserId = this.GetCurrentUserId();

            // Nếu currentUserId null thì bỏ qua bước check tự xoá
            if (currentUserId.HasValue && ids.Contains(currentUserId.Value))
                return Forbid("Bạn không thể tự xóa chính mình qua quyền admin.");

            var users = await _context.Users.Where(user => ids.Contains(user.Id)).ToListAsync();

            if (!users.Any())
                return NotFound("Không tìm thấy người dùng nào.");

            _context.Users.RemoveRange(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet("exist/{id}")]
        public Task<bool> UserExists(int id)
        {
            return _context.Users.AnyAsync(e => e.Id == id);
        }
    }
}
