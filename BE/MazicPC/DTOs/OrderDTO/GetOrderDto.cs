using MazicPC.DTOs.PaymentDTO;
using MazicPC.DTOs.ShippingAddressDTO;
using MazicPC.Models;

namespace MazicPC.DTOs.OrderDTO
{
    public class GetOrderDto
    {
        public int Id { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public List<GetOrderItemDto> Items { get; set; } = new();
        public GetShippingAddressDto ShippingAddress { get; set; } = null!;
        public GetPaymentDto Payment { get; set; } = null!;
    }
}
