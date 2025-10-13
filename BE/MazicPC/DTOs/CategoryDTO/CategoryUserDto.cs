namespace MazicPC.DTOs.CategoryDTO
{
    public class CategoryUserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public int? ParentId { get; set; }
        public string? ImageUrl { get; set; }
        public List<CategoryUserDto> Children { get; set; } = new List<CategoryUserDto>();
    }
}
