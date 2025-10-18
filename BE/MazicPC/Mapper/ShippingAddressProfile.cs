using AutoMapper;
using MazicPC.DTOs.ShippingAddressDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class ShippingAddressProfile : Profile
    {
        public ShippingAddressProfile()
        {
            CreateMap<ShippingAddress, GetShippingAddressDto>();
            CreateMap<ShippingAddress, ShippingAddressDto>().ReverseMap();
        }
    }
}
