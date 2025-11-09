namespace MazicPC.DTOs.OrderDTO
{
    public class GetAdminOrderDto
    {
        public int Id { get; set; }
        public string Status { get; set; } = null!;
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
