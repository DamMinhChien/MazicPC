using FluentValidation;
using MazicPC.DTOs.ReviewDTO;

namespace MazicPC.Validators.ReviewValidator
{
    public class ReviewValidator : AbstractValidator<ReviewDto>
    {
        public ReviewValidator()
        {
            // Validate ProductId
            RuleFor(x => x.ProductId)
                // Id sản phẩm phải > 0
                .GreaterThan(0)
                .WithMessage("Sản phẩm không hợp lệ.");

            // Validate Rating
            RuleFor(x => x.Rating)
                // Điểm đánh giá chỉ được trong khoảng từ 1 đến 5 sao
                .InclusiveBetween(1, 5)
                .WithMessage("Điểm đánh giá phải từ 1 đến 5.");

            // Validate Commen
            RuleFor(x => x.Comment)
                // Nếu có nhập bình luận thì tối đa 500 ký tự
                .MaximumLength(500)

                // Chỉ áp dụng validate khi Comment không rỗng / không toàn khoảng trắng
                .When(x => !string.IsNullOrWhiteSpace(x.Comment))

                .WithMessage("Bình luận không được vượt quá 500 ký tự.");
        }
    }
}
