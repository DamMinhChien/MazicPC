using AutoMapper;
using MazicPC.DTOs.ChatDTO;
using MazicPC.DTOs.Product;
using MazicPC.DTOs.ProductDTO;
using MazicPC.DTOs.ProductImageDTO;
using MazicPC.Models;
namespace MazicPC.Mapper
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, UserGetProductDto>()
                .ForMember(dest => dest.CategoryName,
                    opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.ManufacturerName,
                    opt => opt.MapFrom(src => src.Manufacturer != null ? src.Manufacturer.Name : string.Empty));

            CreateMap<Product, AdminGetProductDto>()
                .ForMember(dest => dest.CategoryName,
                           opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.ManufacturerName,
                           opt => opt.MapFrom(src => src.Manufacturer != null ? src.Manufacturer.Name : string.Empty));

            CreateMap<Product, ChatGetProductDto>()
                .ForMember(dest => dest.CategoryName,
                           opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.ManufacturerName,
                           opt => opt.MapFrom(src => src.Manufacturer != null ? src.Manufacturer.Name : string.Empty));

            CreateMap<Product, ProductDto>()
                .ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<ProductImage, UserGetProductImageDto>();

            CreateMap<Product, GetDetailProductDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.ManufacturerName, opt => opt.MapFrom(src => src.Manufacturer != null ? src.Manufacturer.Name : string.Empty))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.ProductImages ?? new List<ProductImage>()));
        }
    }
}
