using FluentValidation;
using MazicPC.DTOs.CartDTO;

namespace MazicPC.Validators.CartValidator
{
    public class UpdateCartItemValidator : AbstractValidator<UpdateCartItemDto>
    {
        public UpdateCartItemValidator()
        {
            RuleFor(x => x.Quantity)
                .GreaterThan(0)
                .WithMessage("Số lượng phải lớn hơn 0.")
                .LessThanOrEqualTo(100)
                .WithMessage("Số lượng không được vượt quá 100.");
        }
    }
}
