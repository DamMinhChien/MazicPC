using FluentValidation;
using MazicPC.DTOs.AccountDTO;

namespace MazicPC.Validators.AuthValidator
{
    public class UserPutAccountValidator : AbstractValidator<UserPutAccountDto>
    {
        public UserPutAccountValidator()
        {
            // Password (chỉ kiểm tra nếu có nhập)
            RuleFor(x => x.Password)
                .Cascade(CascadeMode.Stop)
                .MinimumLength(6).WithMessage("Mật khẩu phải có ít nhất 6 ký tự.")
                .Matches("[^a-zA-Z0-9]").WithMessage("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.")
                .When(x => !string.IsNullOrWhiteSpace(x.Password));

            // Email (chỉ kiểm tra nếu có nhập)
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.Stop)
                .EmailAddress().WithMessage("Email không hợp lệ.")
                .When(x => !string.IsNullOrWhiteSpace(x.Email));

            // FullName (chỉ kiểm tra nếu có nhập)
            RuleFor(x => x.FullName)
                .Cascade(CascadeMode.Stop)
                .MinimumLength(2).WithMessage("Họ và tên phải có ít nhất 2 ký tự.")
                .MaximumLength(50).WithMessage("Họ và tên không được quá 50 ký tự.")
                .Matches("^[a-zA-ZÀ-ỹ\\s]+$").WithMessage("Họ và tên chỉ được chứa chữ cái và khoảng trắng.")
                .When(x => !string.IsNullOrWhiteSpace(x.FullName));
        }
    }
}
