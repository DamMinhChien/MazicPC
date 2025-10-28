using FluentValidation;
using MazicPC.DTOs.AccountDTO;

namespace MazicPC.Validators.AuthValidator
{
    public class UserPutAccountValidator : AbstractValidator<UserPutAccountDto>
    {
        public UserPutAccountValidator()
        {
            // Password
            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Mật khẩu không được để trống.")
                    .MinimumLength(6).WithMessage("Mật khẩu phải có ít nhất 6 ký tự.")
                    .Matches("[^a-zA-Z0-9]").WithMessage("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");

            // Email
            RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email không được để trống.")
                    .EmailAddress().WithMessage("Email không hợp lệ.");

            // FullName
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Họ và tên không được để trống.")
                .MinimumLength(2).WithMessage("Họ và tên phải có ít nhất 2 ký tự.")
                .MaximumLength(50).WithMessage("Họ và tên không được quá 50 ký tự.")
                .Matches("^[a-zA-ZÀ-ỹ\\s]+$").WithMessage("Họ và tên chỉ được chứa chữ cái và khoảng trắng.");

        }
    }
}
