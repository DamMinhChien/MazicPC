using MazicPC.Models;

namespace MazicPC.DTOs.OrderDTO
{
    public class OrderDto
    {
        public int ShippingAddressId { get; set; }
        public string PaymentMethod { get; set; } = null!; // ví dụ: "cod", "vnpay", "momo"
        public List<OrderItemDto> OrderItems { get; set; } = new();
        
    }
}
