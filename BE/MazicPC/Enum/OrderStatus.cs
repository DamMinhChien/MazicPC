namespace MazicPC.Enum
{
    public enum OrderStatus
    {
        Pending,       // Mới tạo, chờ xử lý
        Processing,    // Đang xử lý
        Shipped,       // Đã giao cho đơn vị vận chuyển
        Delivered,     // Đã giao thành công
        Cancelled      // Đã hủy
    }
}
