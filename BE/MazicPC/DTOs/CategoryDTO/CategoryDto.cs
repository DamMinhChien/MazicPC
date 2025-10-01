namespace MazicPC.DTOs.CategoryDTO
{
    public class CategoryDto
    {
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public int? ParentId { get; set; }
    }
}
