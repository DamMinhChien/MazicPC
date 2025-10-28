using FluentValidation;
using MazicPC.DTOs.AccountDTO;
using MazicPC.Models;
using Microsoft.EntityFrameworkCore;

namespace MazicPC.Validators.AuthValidator
{
    public class AdminPutAccountValidator : AbstractValidator<AdminPutAccountDto>
    {
        private readonly MazicPcContext db;
        public AdminPutAccountValidator(MazicPcContext db)
        {
            this.db = db;
            // Username
            RuleFor(x => x.Username)
                    .NotEmpty().WithMessage("Tên đăng nhập không được để trống.")
                    .MinimumLength(3).WithMessage("Tên đăng nhập phải có ít nhất 3 ký tự.");

            // Email
            RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email không được để trống.")
                    .EmailAddress().WithMessage("Email không hợp lệ.");

            // Password
            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Mật khẩu không được để trống.")
                    .MinimumLength(6).WithMessage("Mật khẩu phải có ít nhất 6 ký tự.")
                    .Matches("[^a-zA-Z0-9]").WithMessage("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");

            // FullName
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Họ và tên không được để trống.")
                .MinimumLength(2).WithMessage("Họ và tên phải có ít nhất 2 ký tự.")
                .MaximumLength(50).WithMessage("Họ và tên không được quá 50 ký tự.")
                .Matches("^[a-zA-ZÀ-ỹ\\s]+$").WithMessage("Họ và tên chỉ được chứa chữ cái và khoảng trắng.");

            RuleFor(x => x.Role)
                    .Must(role => role == null || role == "User" || role == "Admin")
                    .WithMessage("Vai trò không hợp lệ. Chỉ chấp nhận: User, Admin.");

            RuleFor(x => x.IsActive)
                .Must(active => active == true || active == false || active == null)
                .WithMessage("Trạng thái hoạt động không hợp lệ.");
        }
    }
}
