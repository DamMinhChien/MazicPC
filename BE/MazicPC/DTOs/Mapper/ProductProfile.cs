using AutoMapper;
using MazicPC.DTOs.Product;
using MazicPC.DTOs.ProductDTO;
using MazicPC.DTOs.ProductImageDTO;
using MazicPC.Models;
namespace MazicPC.DTOs.Mapper
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Models.Product, UserGetProductDto>()
                .ForMember(dest => dest.CategoryName,
                    opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.ManufacturerName,
                    opt => opt.MapFrom(src => src.Manufacturer != null ? src.Manufacturer.Name : string.Empty));

            CreateMap<Models.Product, AdminGetProductDto>()
                .ForMember(dest => dest.CategoryName,
                           opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.ManufacturerName,
                           opt => opt.MapFrom(src => src.Manufacturer != null ? src.Manufacturer.Name : string.Empty));


            CreateMap<Models.Product, ProductDto>()
                .ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<ProductImage, UserGetProductImageDto>();

            CreateMap<Models.Product, GetDetailProductDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.ManufacturerName, opt => opt.MapFrom(src => src.Manufacturer != null ? src.Manufacturer.Name : string.Empty))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.ProductImages ?? new List<Models.ProductImage>()));
        }
    }
}
