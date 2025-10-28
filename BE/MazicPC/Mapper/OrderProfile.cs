using AutoMapper;
using MazicPC.DTOs.OrderDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, GetOrderDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.OrderItems))
                .ForMember(dest => dest.Payment, opt => opt.MapFrom(src => src.Payments.FirstOrDefault()))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt ?? DateTime.MinValue))
                .ForMember(dest => dest.ShippingAddress, opt => opt.MapFrom(src => src.ShippingAddress));

            CreateMap<OrderDto, Order>()
                .ForMember(dest => dest.ShippingAddressId, opt => opt.MapFrom(src => src.ShippingAddressId))
                .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems))
                .ForMember(dest => dest.Payments, opt => opt.Ignore()); // bỏ qua, vì tạo thủ công
        }
    }
}
