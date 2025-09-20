using BCrypt.Net;
using MazicPC.DTOs.AuthenticationDTO;
using MazicPC.Models;
using MazicPC.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var account = await db.Accounts.FirstOrDefaultAsync(acc=>acc.Username == request.Username);
            if (account == null) 
                return Unauthorized("Tài khoản không tồn tại!");
            if (!account.IsActive)
                return Unauthorized("Tài khoản đã bị khóa!");
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, account.Password);
            if (!isPasswordValid)
                return Unauthorized("Sai mật khẩu!");

            var token = jwtTokenGenerator.GenerateToken(account);

            return Ok(new LoginResponseDto
            {
                Token = token,
                Username = account.Username,
                Role = account.Role
            }); 
        }
    }
}
