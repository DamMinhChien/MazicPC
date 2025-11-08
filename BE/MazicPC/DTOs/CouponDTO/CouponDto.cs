namespace MazicPC.DTOs.CouponDTO
{
    public class CouponDto
    {
        public string Code { get; set; } = null!;

        public decimal Discount { get; set; }

        public bool IsPercent { get; set; }

        public int UsedCount { get; set; }

        public int Quantity { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
