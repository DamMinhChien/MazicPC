using AutoMapper;
using MazicPC.DTOs.ProductImageDTO;
using MazicPC.Models;

namespace MazicPC.DTOs.Mapper
{
    public class ProductImageProfile : Profile
    {
        public ProductImageProfile()
        {
            CreateMap<ProductImage, UserGetProductImageDto>();
            CreateMap<ProductImage, AdminGetProductImageDto>().ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name)); ;
            CreateMap<ProductImage, ProductImageDto>()
                .ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.ImageUrl, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
        }
    }
}
