namespace MazicPC.DTOs.ProductDTO
{
    public class AdminGetProductDto : UserGetProductDto
    {
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
