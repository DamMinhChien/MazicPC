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
            CreateMap<Category, CategoryDto>();

            // Map từ DTO -> Entity
            CreateMap<CategoryDto, Category>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id do DB tự sinh
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // CreatedAt set bên controller/service
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore()) // UpdatedAt set bên controller/service
                .ForMember(dest => dest.Products, opt => opt.Ignore())  // không map navigation
                .ForMember(dest => dest.Parent, opt => opt.Ignore())
                .ForMember(dest => dest.InverseParent, opt => opt.Ignore());
        }
    }
}
