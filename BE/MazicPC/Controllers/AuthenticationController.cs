using BCrypt.Net;
using MazicPC.DTOs.AuthenticationDTO;
using MazicPC.Models;
using MazicPC.Extensions;
using MazicPC.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;

namespace MazicPC.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly MazicPcContext db;
        private readonly JwtTokenGenerator jwtTokenGenerator;

        public AuthenticationController(MazicPcContext db, JwtTokenGenerator jwtTokenGenerator)
        {
            this.db = db;
            this.jwtTokenGenerator = jwtTokenGenerator;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto request)
        {
            // 1. Xác thực user
            var account = await db.Accounts.FirstOrDefaultAsync(acc=>acc.Username == request.Username);
            if (account == null) 
                return Unauthorized("Tài khoản không tồn tại!");
            if (!account.IsActive)
                return Unauthorized("Tài khoản đã bị khóa!");
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, account.Password);
            if (!isPasswordValid)
                return Unauthorized("Sai mật khẩu!");

            // 2. Tạo JWT
            var token = jwtTokenGenerator.GenerateToken(account);

            // 3. Set cookie HttpOnly
            var cookieOptions = new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(2)
            };
            Response.Cookies.Append("accessToken", token, cookieOptions);

            return Ok(new LoginResponseDto
            {
                Username = account.Username,
                Role = account.Role
            });
        }
        
        [HttpGet]
        [Authorize]
        [Route("api/me")]
        public async Task<ActionResult<object>> Me()
        {
            var accId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (accId == null) return Unauthorized("Bạn chưa đăng nhập");

            var account = await db.Accounts.FirstOrDefaultAsync(acc => acc.Id.ToString() == accId.ToString());
            if (account == null) return NotFound();

            return Ok(new
            {
                Id = accId,
                Username = account.Username,
                Role = account.Role,
                Email = account.Email,
                User = new
                {
                    FullName = account.User?.FullName,
                    Phone = account.User?.Phone,
                    Address = account.User?.Address,
                    AvatarUrl = account.User?.AvatarUrl
                }
            });
        }

        [HttpPost]
        [Authorize]
        [Route("api/logout")]
        public IActionResult Logout()
        {
            // Xóa cookie JWT
            Response.Cookies.Delete("jwt");

            return Ok("Đăng xuất thành công!");
        }

        [HttpGet]
        [Route("api/status")]
        public IActionResult IsLogin()
        {
            bool isAuthenticated = User.Identity?.IsAuthenticated ?? false;
            return Ok(isAuthenticated);
        }
    }
}
