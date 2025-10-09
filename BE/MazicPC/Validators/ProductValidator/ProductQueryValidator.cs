using FluentValidation;
using MazicPC.DTOs.ProductDTO;

namespace MazicPC.Validators.ProductValidator
{
    public class ProductQueryValidator : AbstractValidator<ProductQueryDto>
    {
        public ProductQueryValidator()
        {
            RuleFor(x => x.Page)
                .GreaterThan(0)
                .WithMessage("Page phải lớn hơn 0");

            RuleFor(x => x.Limit)
                .InclusiveBetween(1, 100)
                .WithMessage("Limit phải nằm trong khoảng 1 - 100");

            RuleFor(x => x.PriceMin)
                .GreaterThanOrEqualTo(0).When(x => x.PriceMin.HasValue)
                .WithMessage("Giá tối thiểu không hợp lệ");

            RuleFor(x => x.PriceMax)
                .GreaterThan(0).When(x => x.PriceMax.HasValue)
                .WithMessage("Giá tối đa phải > 0");
        }
    }
}
