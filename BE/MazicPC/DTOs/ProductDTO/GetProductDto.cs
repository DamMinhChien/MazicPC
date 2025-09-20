namespace MazicPC.DTOs.Product
{
    //dotnet add package AutoMapper
    //dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
    public class GetProductDto
    {
        // DTO cho User (chỉ những field cơ bản để hiển thị sản phẩm)
        public class ProductUserDto
        {
            public int Id { get; set; }
            public string Name { get; set; } = null!;
            public decimal Price { get; set; }
            public string? ImageUrl { get; set; }
            public string? ShortDescription { get; set; }
        }

        // DTO cho Admin (thêm field quản trị)
        public class ProductAdminDto : ProductUserDto
        {
            public int StockQty { get; set; }
            public string? Cpu { get; set; }
            public string? Ram { get; set; }
            public string? Storage { get; set; }
            public DateTime? CreatedAt { get; set; }
            public DateTime? UpdatedAt { get; set; }
        }

    }
}
