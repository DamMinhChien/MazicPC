namespace MazicPC.DTOs.CategoryDTO
{
    public class CategoryAdminDto : CategoryUserDto
    {
        public int? ParentId { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
