using FluentValidation;
using MazicPC.DTOs.ReviewDTO;

namespace MazicPC.Validators.ReviewValidator
{
    public class ReviewValidator : AbstractValidator<ReviewDto>
    {
        public ReviewValidator()
        {
            RuleFor(x => x.ProductId)
                .GreaterThan(0)
                .WithMessage("Sản phẩm không hợp lệ.");

            RuleFor(x => x.Rating)
                .InclusiveBetween(1, 5)
                .WithMessage("Điểm đánh giá phải từ 1 đến 5.");

            RuleFor(x => x.Comment)
                .MaximumLength(500)
                .When(x => !string.IsNullOrWhiteSpace(x.Comment))
                .WithMessage("Bình luận không được vượt quá 500 ký tự.");

        }
    }
}
