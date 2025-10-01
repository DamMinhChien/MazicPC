using FluentValidation;
using MazicPC.DTOs.CategoryDTO;

namespace MazicPC.Validators.CategoryValidator
{
    public class CategoryValidator : AbstractValidator<CategoryDto>
    {
        public CategoryValidator()
        {
            // Name bắt buộc, độ dài giới hạn
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Tên danh mục không được để trống")
                .MaximumLength(100).WithMessage("Tên danh mục không được vượt quá 100 ký tự");

            // Slug bắt buộc, chỉ cho phép chữ thường, số và dấu gạch ngang
            RuleFor(x => x.Slug)
                .NotEmpty().WithMessage("Slug không được để trống")
                .MaximumLength(100).WithMessage("Slug không được vượt quá 100 ký tự")
                .Matches("^[a-z0-9-]+$").WithMessage("Slug chỉ được chứa chữ thường, số và dấu '-'");

            // ParentId nếu có thì phải >= 1
            RuleFor(x => x.ParentId)
                .GreaterThan(0).When(x => x.ParentId.HasValue)
                .WithMessage("ParentId phải lớn hơn 0 nếu có giá trị");
        }
    }
}
