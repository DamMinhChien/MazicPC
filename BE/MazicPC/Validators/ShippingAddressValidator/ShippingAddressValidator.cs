using FluentValidation;
using MazicPC.DTOs.ShippingAddressDTO;

namespace MazicPC.Validators.ShippingAddressValidator
{

    public class ShippingAddressValidator : AbstractValidator<ShippingAddressDto>
    {
        public ShippingAddressValidator()
        {

            // Validate họ tên người nhận
     
            RuleFor(x => x.FullName)
                // Không được để trống
                .NotEmpty().WithMessage("Họ và tên không được để trống.")
                // Độ dài tối đa 100 ký tự
                .MaximumLength(100).WithMessage("Họ và tên không được vượt quá 100 ký tự.");

            // Validate số điện thoại
            RuleFor(x => x.Phone)
                // Không được để trống
                .NotEmpty().WithMessage("Số điện thoại không được để trống.")
                // Regex số điện thoại Việt Nam
                .Matches(@"^(0|\+84)[0-9]{9,10}$")
                .WithMessage("Số điện thoại không hợp lệ.");

            // Validate Tỉnh / Thành phố
    
            RuleFor(x => x.Province)
                .NotEmpty().WithMessage("Tỉnh/Thành phố không được để trống.");

            // Validate Quận / Huyện
            RuleFor(x => x.District)
                .NotEmpty().WithMessage("Quận/Huyện không được để trống.");

            // Validate Phường / Xã
            RuleFor(x => x.Ward)
                .NotEmpty().WithMessage("Phường/Xã không được để trống.");

            // Validate Địa chỉ chi tiết
            // (Số nhà, tên đường, thôn xóm, v.v.)
            RuleFor(x => x.DetailAddress)
                .NotEmpty().WithMessage("Địa chỉ chi tiết không được để trống.");
            // Validate Ghi chú (không bắt buộc)

            RuleFor(x => x.Note)
                // Tối đa 255 ký tự
                .MaximumLength(255)
                .WithMessage("Ghi chú không được vượt quá 255 ký tự.")
                // Chỉ validate khi có nhập
                .When(x => !string.IsNullOrWhiteSpace(x.Note));
        }
    }
}
