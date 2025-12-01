using AutoMapper;
using MazicPC.DTOs.AccountDTO;
using MazicPC.Extensions;
using MazicPC.Models;
using MazicPC.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
        private readonly IMapper mapper;
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
            var accounts = await db.Accounts.Include(acc=>acc.User).ToListAsync();
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
            var userId = this.GetCurrentAccountId();
            if (userId == null) return Unauthorized();

            var acc = await db.Accounts.FindAsync(userId);
            if (acc == null) return NotFound();

            // Cập nhật các field khác
            mapper.Map(account, acc);

            // Chỉ cập nhật password nếu người dùng có nhập
            if (!string.IsNullOrWhiteSpace(account.Password))
            {
                acc.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);
            }

            await db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> AdminPutAccount(int id, [FromBody] AdminPutAccountDto account)
        {
            var acc = await db.Accounts.Include(a => a.User).FirstOrDefaultAsync(a => a.Id == id);
            if (acc == null)
                return NotFound();

            var currentUserId = this.GetCurrentAccountId();

            // Ngăn admin đổi Role hoặc IsActive của chính mình
            if (id == currentUserId)
            {
                if (account.Role != acc.Role || account.IsActive != acc.IsActive)
                    return Forbid("Không thể thay đổi Role hoặc trạng thái tài khoản của chính mình.");
            }

            // Ngăn admin đổi Role hoặc IsActive của admin khác
            if (acc.Role == Roles.Admin && id != currentUserId)
            {
                if (account.Role != acc.Role || account.IsActive != acc.IsActive)
                    return Forbid("Không thể thay đổi Role hoặc trạng thái của admin khác.");
            }

            // Ngăn đổi mật khẩu admin khác
            if (acc.Role == Roles.Admin && id != currentUserId && !string.IsNullOrEmpty(account.Password))
            {
                return Forbid("Không thể thay đổi mật khẩu của admin khác.");
            }

            // Cập nhật các field khác
            acc.Username = account.Username!;
            acc.Email = account.Email!;

            if (!string.IsNullOrEmpty(account.Password))
            {
                acc.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);
            }

            acc.User!.FullName = account.FullName!;

            // Chỉ cập nhật Role và IsActive nếu không bị cấm
            if (!(acc.Role == Roles.Admin))
            {
                acc.Role = account.Role!;
                acc.IsActive = account.IsActive ?? acc.IsActive;
            }

            await db.SaveChangesAsync();

            return NoContent();
        }


        [Authorize]
        [HttpDelete("me")]
        public async Task<IActionResult> UserDeleteAccount()
        {
            var userId = this.GetCurrentAccountId();
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

            if (acc.Id == this.GetCurrentAccountId())
                return Forbid("Bạn không thể tự xóa chính mình qua quyền admin.");

            db.Accounts.Remove(acc);

            await db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("bulk")]
        public async Task<IActionResult> AdminDeleteManyAccounts([FromBody] List<int> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("Danh sách id không được rỗng.");

            var currentUserId = this.GetCurrentAccountId();

            // Nếu currentUserId null thì bỏ qua bước check tự xoá
            if (currentUserId.HasValue && ids.Contains(currentUserId.Value))
                return Forbid("Bạn không thể tự xóa chính mình qua quyền admin.");

            var accounts = await db.Accounts
                                  .Where(a => ids.Contains(a.Id))
                                  .ToListAsync();

            if (!accounts.Any())
                return NotFound("Không tìm thấy tài khoản nào.");

            db.Accounts.RemoveRange(accounts);
            await db.SaveChangesAsync();

            return NoContent();
        }


        [Authorize(Roles = Roles.Admin)]
        [HttpGet("exist/{username}")]
        public async Task<IActionResult> ExistAccount(string? username)
        {
            if (string.IsNullOrEmpty(username)) username = string.Empty;
            bool isExist =  await db.Accounts.AnyAsync(acc=>acc.Username == username);
            return Ok(!isExist);
        }
    }
}
