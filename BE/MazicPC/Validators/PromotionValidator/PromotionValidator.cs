using FluentValidation;
using MazicPC.DTOs.PromotionDTO;

namespace MazicPC.Validators.PromotionValidator
{
    public class PromotionValidator : AbstractValidator<PromotionDto>
    {
        public PromotionValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Tên khuyến mãi không được để trống");

            RuleFor(x => x.DiscountType)
                .Must(t => t == "percent" || t == "amount")
                .WithMessage("DiscountType phải là 'percent' hoặc 'amount'");

            RuleFor(x => x.DiscountValue)
                .GreaterThan(0).WithMessage("Giá trị giảm phải lớn hơn 0");

            RuleFor(x => x.EndDate)
                .GreaterThan(x => x.StartDate)
                .WithMessage("Ngày kết thúc phải sau ngày bắt đầu");

            RuleForEach(x => x.Targets)
                .SetValidator(new PromotionTargetDtoValidator()!)
                .When(x => x.Targets != null && x.Targets.Any());
        }
    }
}
