using AutoMapper;
using MazicPC.Models;
using static MazicPC.DTOs.Product.GetProductDto;
namespace MazicPC.DTOs.Mapper
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Models.Product, ProductUserDto>();
            CreateMap<Models.Product, ProductAdminDto>();
        }
    }
}
