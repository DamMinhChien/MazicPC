using FluentValidation;
using MazicPC.DTOs.PromotionDTO;

namespace MazicPC.Validators.PromotionValidator
{
    public class PromotionTargetDtoValidator : AbstractValidator<PromotionTargetDto>
    {
        public PromotionTargetDtoValidator()
        {
            RuleFor(x => x.TargetType)
                .Must(t => new[] { "product", "category", "manufacturer", "account", "order", "global" }
                .Contains(t))
                .WithMessage("TargetType không hợp lệ");

            When(x => x.TargetType != "global", () =>
            {
                RuleFor(x => x.TargetId)
                    .NotNull().WithMessage("TargetId bắt buộc khi targetType khác 'global'");
            });
        }
    }
}
