using AutoMapper;
using MazicPC.DTOs.ShippingAddressDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
  
    public class ShippingAddressProfile : Profile
    {
        public ShippingAddressProfile()
        {
            // Map từ Entity -> GetShippingAddressDto
            // Dùng khi trả dữ liệu về client
  
            CreateMap<ShippingAddress, GetShippingAddressDto>();

            // Map 2 chiều giữa:
            // ShippingAddress <-> ShippingAddressDto
            //
            // - Entity      -> DTO : khi đọc dữ liệu
            // - DTO         -> Entity : khi tạo hoặc cập nhật

            CreateMap<ShippingAddress, ShippingAddressDto>()
                .ReverseMap();
        }
    }
}
