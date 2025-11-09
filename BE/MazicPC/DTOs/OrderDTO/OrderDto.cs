using MazicPC.Models;

namespace MazicPC.DTOs.OrderDTO
{
    public class OrderDto
    {
        public int ShippingAddressId { get; set; }
        public int ShippingMethodId { get; set; } // phương thức giao hàng
        public string? CouponCode { get; set; }   // mã giảm giá (có thể null)
        public string PaymentMethod { get; set; } = null!; // "cod", "vnpay", "momo"
        public List<OrderItemDto> OrderItems { get; set; } = new();

    }
}
