﻿namespace MazicPC.DTOs.CategoryDTO
{
    public class CategoryUserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public List<CategoryUserDto> Children { get; set; } = new();
    }
}
