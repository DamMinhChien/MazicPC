using FluentValidation;
using MazicPC.DTOs.ManufacturerDTO;

namespace MazicPC.Validators.ManufacturerValidator
{
    public class ManufacturerValidator : AbstractValidator<ManufacturerDto>
    {
        public ManufacturerValidator()
        {
            // Name: required, max length
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Tên nhà sản xuất không được để trống.")
                .MaximumLength(100).WithMessage("Tên nhà sản xuất không được vượt quá 100 ký tự.");

            // Slug: required, format & length
            RuleFor(x => x.Slug)
                .NotEmpty().WithMessage("Slug không được để trống.")
                .Matches("^[a-z0-9-]+$").WithMessage("Slug chỉ được chứa chữ thường, số và dấu gạch ngang.")
                .MaximumLength(100).WithMessage("Slug không được vượt quá 100 ký tự.");

            // LogoUrl: optional nhưng phải là URL hợp lệ nếu có
            RuleFor(x => x.LogoUrl)
                .Must(uri => string.IsNullOrWhiteSpace(uri) || Uri.TryCreate(uri, UriKind.Absolute, out _))
                .WithMessage("LogoUrl phải là một đường dẫn URL hợp lệ.");

            // Description: optional, max length
            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("Mô tả không được vượt quá 500 ký tự.");

            // Website: optional nhưng phải là URL hợp lệ nếu có
            RuleFor(x => x.Website)
                .Must(uri => string.IsNullOrWhiteSpace(uri) || Uri.TryCreate(uri, UriKind.Absolute, out _))
                .WithMessage("Website phải là một đường dẫn URL hợp lệ.");
        }
    }
}
