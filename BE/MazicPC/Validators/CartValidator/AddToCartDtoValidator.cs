using FluentValidation;
using MazicPC.DTOs.CartDTO;

namespace MazicPC.Validators.CartValidator
{
    public class AddToCartDtoValidator : AbstractValidator<AddToCartDto>
    {
        public AddToCartDtoValidator()
        {
            RuleFor(x => x.ProductId)
                .GreaterThan(0)
                .WithMessage("ProductId phải lớn hơn 0.");

            RuleFor(x => x.Quantity)
                .GreaterThan(0)
                .WithMessage("Số lượng phải lớn hơn 0.")
                .LessThanOrEqualTo(100)
                .WithMessage("Số lượng không được vượt quá 100.");

            //RuleFor(x => x.Price)
            //    .GreaterThan(0)
            //    .WithMessage("Giá sản phẩm phải lớn hơn 0.")
            //    .LessThanOrEqualTo(100000000)
            //    .WithMessage("Giá sản phẩm không được vượt quá 100 triệu.");
        }
    }
}
