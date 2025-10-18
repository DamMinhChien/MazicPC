using FluentValidation;
using MazicPC.DTOs.ShippingAddressDTO;

namespace MazicPC.Validators.ShippingAddressValidator
{
    public class ShippingAddressValidator : AbstractValidator<ShippingAddressDto>
    {
        public ShippingAddressValidator()
        {
            RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("Họ và tên không được để trống.")
            .MaximumLength(100).WithMessage("Họ và tên không được vượt quá 100 ký tự.");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Số điện thoại không được để trống.")
                .Matches(@"^(0|\+84)[0-9]{9,10}$").WithMessage("Số điện thoại không hợp lệ.");

            RuleFor(x => x.Province)
                .NotEmpty().WithMessage("Tỉnh/Thành phố không được để trống.");

            RuleFor(x => x.District)
                .NotEmpty().WithMessage("Quận/Huyện không được để trống.");

            RuleFor(x => x.Ward)
                .NotEmpty().WithMessage("Phường/Xã không được để trống.");

            RuleFor(x => x.DetailAddress)
                .NotEmpty().WithMessage("Địa chỉ chi tiết không được để trống.");

            RuleFor(x => x.Note)
                .MaximumLength(255).WithMessage("Ghi chú không được vượt quá 255 ký tự.")
                .When(x => !string.IsNullOrWhiteSpace(x.Note));
        }
    }
}
