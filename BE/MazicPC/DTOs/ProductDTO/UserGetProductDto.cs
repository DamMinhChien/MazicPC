namespace MazicPC.DTOs.ProductDTO
{
    public class UserGetProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public string CategoryName { get; set; } = null!;
        public string ManufacturerName { get; set; } = null!;

        public string Type { get; set; } = null!;
        public string? Model { get; set; }
        public string? ShortDescription { get; set; }
        public string? Description { get; set; }

        public decimal Price { get; set; }
        public int StockQty { get; set; }

        public int? WarrantyMonths { get; set; }
        public string? ImageUrl { get; set; }   // ảnh đại diện

        // Thông số kỹ thuật
        public string? Cpu { get; set; }
        public string? Ram { get; set; }
        public string? Storage { get; set; }
        public string? Display { get; set; }
        public string? Gpu { get; set; }
        public string? Os { get; set; }
        public string? Keyboard { get; set; }
        public bool? FingerprintReader { get; set; }
        public string? Battery { get; set; }
        public string? Camera { get; set; }
        public string? Ports { get; set; }
        public string? Wireless { get; set; }
        public string? Dimensions { get; set; }
        public string? Weight { get; set; }
        public string? Color { get; set; }
        public string? Material { get; set; }
        public string? Condition { get; set; }
        public int? ManufactureYear { get; set; }
        public string? WarrantyInfo { get; set; }
        public string? Brand { get; set; }
        public string? ProductType { get; set; }
        public string? Origin { get; set; }

        // Danh sách ảnh chi tiết (nếu có)
        public List<string> ImageUrls { get; set; } = new();
    }
}
