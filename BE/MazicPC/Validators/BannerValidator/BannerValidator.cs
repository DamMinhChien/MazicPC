using FluentValidation;
using MazicPC.DTOs.BannerDTO;

namespace MazicPC.Validators.BannerValidator
{
    public class BannerValidator : AbstractValidator<BannerDto>
    {
        public BannerValidator()
        {
            // Title: bắt buộc có, tối đa 200 ký tự
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Tiêu đề không được để trống")
                .MaximumLength(200).WithMessage("Tiêu đề tối đa 200 ký tự");

            // IsActive: phải có giá trị (true hoặc false, không được null)
            RuleFor(x => x.IsActive)
                .NotNull().WithMessage("Trạng thái không được để trống");

            // ProductId: phải có giá trị và > 0
            RuleFor(x => x.ProductId)
                .NotNull().WithMessage("ProductId không được để trống")
                .GreaterThan(0).WithMessage("ProductId phải lớn hơn 0");
        }
    }
}
