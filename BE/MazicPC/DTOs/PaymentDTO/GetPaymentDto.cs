namespace MazicPC.DTOs.PaymentDTO
{
    public class GetPaymentDto
    {
        public string PaymentMethod { get; set; } = null!;
        public string Status { get; set; } = null!;
        public DateTime? PaidAt { get; set; }
        public decimal? Amount { get; set; }
        public string? TransactionCode { get; set; }
    }
}
