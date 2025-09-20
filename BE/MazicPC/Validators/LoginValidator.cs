using FluentValidation;
using MazicPC.DTOs.AuthenticationDTO;
using Microsoft.AspNetCore.Identity.Data;

namespace MazicPC.Validators
{
    public class LoginValidator : AbstractValidator<LoginRequestDto>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Username).NotEmpty().WithMessage("Tên đăng nhập không được để trống!");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Mật khẩu không được để trống!");
        }
    }
}
