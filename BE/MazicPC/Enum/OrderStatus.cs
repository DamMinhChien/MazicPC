namespace MazicPC.Enum
{
    public enum OrderStatus
    {
        Pending,       // Mới tạo, chờ xử lý
        Confirmed,    // Đã xác nhận
        Delivering,   // Đang giao
        Completed,     // Đã giao thành công
        Cancelled,      // Đã hủy
        Returning, // Đang hoàn
        Returned // Đã hoàn
    }
}
