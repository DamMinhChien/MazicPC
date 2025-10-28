using AutoMapper;
using MazicPC.DTOs.OrderDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class OrderItemProfile : Profile
    {
        public OrderItemProfile()
        {
            // Map khi tạo đơn hàng (client gửi lên)
            CreateMap<OrderItemDto, OrderItem>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // ID tự sinh
                .ForMember(dest => dest.Price, opt => opt.Ignore()) // Giá lấy từ Product
                .ForMember(dest => dest.Order, opt => opt.Ignore()) // Không map navigation
                .ForMember(dest => dest.Product, opt => opt.Ignore());

            // Map khi trả về đơn hàng (client xem chi tiết)
            CreateMap<OrderItem, GetOrderItemDto>()
                .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId.HasValue ? src.ProductId.Value : 0))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : "Unknown"))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));
        }
    }
}
