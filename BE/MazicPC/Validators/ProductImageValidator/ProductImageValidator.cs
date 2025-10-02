using FluentValidation;
using MazicPC.DTOs.ProductImageDTO;

namespace MazicPC.Validators.ProductImageValidator
{
    public class ProductImageValidator : AbstractValidator<ProductImageDto>
    {
        public ProductImageValidator()
        {
            RuleFor(x => x.ProductId)
            .GreaterThan(0).WithMessage("ProductId phải lớn hơn 0");

            RuleFor(x => x.IsPrimary)
                .NotNull().WithMessage("Cần xác định ảnh có phải chính hay không");
        }
    }
}
