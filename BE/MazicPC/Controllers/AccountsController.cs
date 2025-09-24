using AutoMapper;
using MazicPC.DTOs.AccountDTO;
using MazicPC.Extensions;
using MazicPC.Models;
using MazicPC.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
public static class Roles
{
    public const string Admin = "Admin";
    public const string User = "User";
}

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        IMapper mapper;
        private readonly MazicPcContext db;

        public AccountsController(IMapper mapper, MazicPcContext db)
        {
            this.mapper = mapper;
            this.db = db;
        }

        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<IEnumerable<GetAccountDto>>> GetAccounts()
        {
            var accounts = await db.Accounts.ToListAsync();
            return Ok(mapper.Map<IEnumerable<GetAccountDto>>(accounts));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<GetAccountDto>> GetAccountById(int id)
        {
            var account = await db.Accounts.FindAsync(id);
            if (account == null)
                return NotFound();
            return Ok(mapper.Map<GetAccountDto>(account));
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> UserPostAccount([FromBody] UserPostAccountDto account)
        {
            var newAccount = new Account
            {
                Username = account.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(account.Password),
                Email = account.Email,
                IsActive = true,
                Role = Roles.User
            };

            var newUser = new User
            {
                Account = newAccount,
                FullName = account.FullName
            };

            db.Accounts.Add(newAccount);
            db.Users.Add(newUser);
            await db.SaveChangesAsync();

            var result = mapper.Map<GetAccountDto>(newAccount);
            return CreatedAtAction(nameof(GetAccountById), new {id = newAccount.Id}, result);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> AdminPostAccount([FromBody] AdminPostAccountDto account)
        {
            var newAccount = new Account
            {
                Username = account.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(account.Password),
                Email = account.Email,
                IsActive = account.IsActive ?? true,
                Role = account.Role ?? Roles.User
            };

            var newUser = new User
            {
                Account = newAccount,
                FullName = account.FullName
            };

            db.Accounts.Add(newAccount);
            db.Users.Add(newUser);
            await db.SaveChangesAsync();

            var result = mapper.Map<GetAccountDto>(newAccount);
            return CreatedAtAction(nameof(GetAccountById), new { id = newAccount.Id }, result);
        }

        [Authorize]
        [HttpPut("me")]
        public async Task<IActionResult> UserPutAccount([FromBody] UserPutAccountDto account)
        {
            var userId = this.GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var acc = await db.Accounts.FindAsync(userId);
            if (acc == null) return NotFound();

            mapper.Map(account, acc);
            acc.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);

            await db.SaveChangesAsync();

            return NoContent();
        }


        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> AdminPutAccount(int id, [FromBody] AdminPutAccountDto account)
        {
            var acc = await db.Accounts.FindAsync(id);
            if (acc == null)
                return NotFound();

            // Không cho phép admin thay đổi role hoặc is_active của chính họ
            if(id == this.GetCurrentUserId())
                if (account.Role != acc.Role || account.IsActive != acc.IsActive)
                    return Forbid("Không thể thay đổi Role hoặc trạng thái tài khoản của chính mình.");

            mapper.Map(account, acc);
            acc.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);

            await db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpDelete("me")]
        public async Task<IActionResult> UserDeleteAccount()
        {
            var userId = this.GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var acc = await db.Accounts.FindAsync(userId);
            if (acc == null) return NotFound();

            acc.IsActive = false;

            await db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> AdminDeleteAccount(int id)
        {
            var acc = await db.Accounts.FindAsync(id);
            if (acc == null)
                return NotFound();

            if (acc.Id == this.GetCurrentUserId())
                return Forbid("Bạn không thể tự xóa chính mình qua quyền admin.");

            db.Accounts.Remove(acc);

            await db.SaveChangesAsync();

            return NoContent();
        }
    }
}
