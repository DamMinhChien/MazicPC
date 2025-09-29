using FluentValidation;
using MazicPC.DTOs.UserDTO;

namespace MazicPC.Validators.UserValidator
{
    public class PutUserValidator : AbstractValidator<UserDto>
    {
        public PutUserValidator()
        {
            // Phone: cho phép null nhưng nếu có thì phải là số, 10-11 ký tự
            RuleFor(x => x.Phone)
                .Matches(@"^\d{10,11}$")
                .When(x => !string.IsNullOrWhiteSpace(x.Phone))
                .WithMessage("Số điện thoại phải gồm 10-11 chữ số.");

            // Address: cho phép null nhưng nếu có thì min 5 ký tự
            RuleFor(x => x.Address)
                .MinimumLength(5)
                .When(x => !string.IsNullOrWhiteSpace(x.Address))
                .WithMessage("Địa chỉ phải có ít nhất 5 ký tự.");

            // AvatarUrl: cho phép null nhưng nếu có thì phải là URL hợp lệ
            RuleFor(x => x.AvatarUrl)
                .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
                .When(x => !string.IsNullOrWhiteSpace(x.AvatarUrl))
                .WithMessage("AvatarUrl phải là đường dẫn URL hợp lệ.");

            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Họ và tên không được để trống.")
                .MinimumLength(2).WithMessage("Họ và tên phải có ít nhất 2 ký tự.")
                .MaximumLength(50).WithMessage("Họ và tên không được quá 50 ký tự.")
                .Matches("^[a-zA-ZÀ-ỹ\\s]+$").WithMessage("Họ và tên chỉ được chứa chữ cái và khoảng trắng.");
        }
    }
}
