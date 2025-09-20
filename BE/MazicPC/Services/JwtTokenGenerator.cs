using MazicPC.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MazicPC.Services
{
    // Lớp tạo token khi Login thành công!
    public class JwtTokenGenerator
    {
        private readonly IConfiguration config;

        public JwtTokenGenerator(IConfiguration config)
        {
            this.config = config;
        }

        public string GenerateToken(Account account)
        {
            // Lấy khóa bí mật từ appsettings.json
            var secretKey = config["JwtSettings:SecretKey"]!;
            // Tạo đối tượng khóa bảo mật từ chuỗi SecretKey
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            // Ký số cho token
            var signingKey = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // Tạo các claims chứa thông tin người dùng để nhúng vào payload của JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, account.Id.ToString()),
                new Claim(ClaimTypes.Name, account.Username),
                new Claim(ClaimTypes.Role, account.Role)
            };
            // Tạo đối tượng token
            var token = new JwtSecurityToken(
                issuer: config["JwtSettings:Issuer"],
                audience: config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(config["JwtSettings:TokenExpirationInMinutes"]!)),
                signingCredentials: signingKey);

            // Chuyển token thành chuỗi
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
