using MazicPC.DTOs.ProductDTO;

namespace MazicPC.DTOs.CategoryDTO
{
    public class CategoryWithProductsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;

        public List<CategoryWithProductsDto> Children { get; set; } = new();
        public List<UserGetProductDto> Products { get; set; } = new();
    }
}
