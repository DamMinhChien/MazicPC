using AutoMapper;
using MazicPC.DTOs.ShippingMethodDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class ShippingMethodProfile : Profile
    {
        public ShippingMethodProfile()
        {
            CreateMap<ShippingMethodDto, ShippingMethod>().ReverseMap();
            CreateMap<ShippingMethod, GetShippingMethodDto>();
        }
    }
}
