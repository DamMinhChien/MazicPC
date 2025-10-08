using FluentValidation;
using MazicPC.DTOs.Product;

namespace MazicPC.Validators.ProductValidator
{
    public class ProductValidator : AbstractValidator<ProductDto>
    {
        public ProductValidator()
        {
            // Product

            RuleFor(x => x.VideoUrl)
            .MaximumLength(255)
            .WithMessage("VideoUrl không được vượt quá 255 ký tự.")
            .Matches(@"^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-]*)*\/?$")
            .When(x => !string.IsNullOrWhiteSpace(x.VideoUrl))
            .WithMessage("VideoUrl không đúng định dạng đường dẫn.");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Tên sản phẩm là bắt buộc")
                .MaximumLength(200).WithMessage("Tên sản phẩm tối đa 200 ký tự");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("Danh mục không hợp lệ");

            RuleFor(x => x.ManufacturerId)
                .GreaterThan(0).WithMessage("Nhà sản xuất không hợp lệ");

            RuleFor(x => x.ShortDescription)
                .MaximumLength(500).WithMessage("Mô tả ngắn tối đa 500 ký tự");

            RuleFor(x => x.Description)
                .MaximumLength(2000).WithMessage("Mô tả chi tiết tối đa 2000 ký tự");

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Giá sản phẩm không được âm");

            RuleFor(x => x.StockQty)
                .GreaterThanOrEqualTo(0).WithMessage("Số lượng tồn kho không được âm");

            RuleFor(x => x.WarrantyMonths)
                .GreaterThanOrEqualTo(0).When(x => x.WarrantyMonths.HasValue)
                .WithMessage("Số tháng bảo hành không được âm");

            RuleFor(x => x.Cpu)
                .MaximumLength(200).WithMessage("CPU tối đa 200 ký tự");

            RuleFor(x => x.Ram)
                .MaximumLength(200).WithMessage("RAM tối đa 200 ký tự");

            RuleFor(x => x.Storage)
                .MaximumLength(200).WithMessage("Ổ cứng tối đa 200 ký tự");

            RuleFor(x => x.Display)
                .MaximumLength(300).WithMessage("Màn hình tối đa 200 ký tự");

            RuleFor(x => x.Gpu)
                .MaximumLength(200).WithMessage("GPU tối đa 200 ký tự");

            RuleFor(x => x.Os)
                .MaximumLength(100).WithMessage("Hệ điều hành tối đa 100 ký tự");

            RuleFor(x => x.Keyboard)
                .MaximumLength(100).WithMessage("Bàn phím tối đa 100 ký tự");

            RuleFor(x => x.Battery)
                .MaximumLength(200).WithMessage("Pin tối đa 200 ký tự");

            RuleFor(x => x.Camera)
                .MaximumLength(200).WithMessage("Camera tối đa 200 ký tự");

            RuleFor(x => x.Ports)
                .MaximumLength(300).WithMessage("Cổng kết nối tối đa 300 ký tự");

            RuleFor(x => x.Wireless)
                .MaximumLength(300).WithMessage("Kết nối không dây tối đa 300 ký tự");

            RuleFor(x => x.Dimensions)
                .MaximumLength(100).WithMessage("Kích thước tối đa 100 ký tự");

            RuleFor(x => x.Weight)
                .MaximumLength(50).WithMessage("Trọng lượng tối đa 50 ký tự");

            RuleFor(x => x.Color)
                .MaximumLength(50).WithMessage("Màu sắc tối đa 50 ký tự");

            RuleFor(x => x.Material)
                .MaximumLength(100).WithMessage("Chất liệu tối đa 100 ký tự");

            RuleFor(x => x.Condition)
                .MaximumLength(50).WithMessage("Tình trạng tối đa 50 ký tự");

            RuleFor(x => x.ManufactureYear)
                .InclusiveBetween(2000, DateTime.Now.Year + 1)
                .When(x => x.ManufactureYear.HasValue)
                .WithMessage("Năm sản xuất không hợp lệ");

            RuleFor(x => x.WarrantyInfo)
                .MaximumLength(500).WithMessage("Thông tin bảo hành tối đa 500 ký tự");

            RuleFor(x => x.Brand)
                .MaximumLength(100).WithMessage("Thương hiệu tối đa 100 ký tự");

            RuleFor(x => x.ProductType)
                .MaximumLength(100).WithMessage("Loại sản phẩm tối đa 100 ký tự");

            RuleFor(x => x.Origin)
                .MaximumLength(100).WithMessage("Xuất xứ tối đa 100 ký tự");
        }
    }

}
