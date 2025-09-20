using FluentValidation;
using MazicPC.DTOs.AccountDTO;
using MazicPC.Models;
using Microsoft.EntityFrameworkCore;

namespace MazicPC.Validators
{
    public class AdminPostAccountValidator : AbstractValidator<AdminPostAccountDto>
    {
        private readonly MazicPcContext db;
        public AdminPostAccountValidator(MazicPcContext db)
        {
            this.db = db;
            // Username
            RuleFor(x => x.Username)
                    .NotEmpty().WithMessage("Tên đăng nhập không được để trống.")
                    .MinimumLength(3).WithMessage("Tên đăng nhập phải có ít nhất 3 ký tự.")
                    .MustAsync(async (username, context, _) => !await db.Accounts.AnyAsync(a=>a.Username == username.Username)).WithMessage("Tên đăng nhập đã tồn tại."); ;

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
                    .Must(role => role == null || role == "Customer" || role == "Admin")
                    .WithMessage("Vai trò không hợp lệ. Chỉ chấp nhận: Customer, Admin.");

            RuleFor(x => x.IsActive)
                .Must(active => active == true || active == false || active == null)
                .WithMessage("Trạng thái hoạt động không hợp lệ.");
        }
    }
}
