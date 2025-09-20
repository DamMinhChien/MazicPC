using AutoMapper;
using MazicPC.DTOs.CategoryDTO;
using MazicPC.Models;

namespace MazicPC.DTOs.Mapper
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<Category, CategoryAdminDto>();
            CreateMap<Category, CategoryUserDto>();
            CreateMap<Category, CategoryWithProductsDto>();
        }
    }
}
