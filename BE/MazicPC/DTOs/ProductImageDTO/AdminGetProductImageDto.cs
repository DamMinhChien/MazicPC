namespace MazicPC.DTOs.ProductImageDTO
{
    public class AdminGetProductImageDto
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public string ImageUrl { get; set; } = null!;

        public bool? IsPrimary { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
