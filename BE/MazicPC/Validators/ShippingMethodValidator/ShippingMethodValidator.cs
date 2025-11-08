using FluentValidation;
using MazicPC.DTOs.ShippingMethodDTO;

namespace MazicPC.Validators.ShippingMethodValidator
{
    public class ShippingMethodValidator : AbstractValidator<ShippingMethodDto>
    {
        public ShippingMethodValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Tên phương thức giao hàng không được để trống.")
                .MaximumLength(100).WithMessage("Tên phương thức giao hàng không được vượt quá 100 ký tự.");

            RuleFor(x => x.Fee)
                .GreaterThanOrEqualTo(0).WithMessage("Phí giao hàng phải lớn hơn hoặc bằng 0.");
        }
    }
}
