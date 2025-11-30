namespace MazicPC.DTOs.CouponDTO
{
    public class GetCouponDto
    {
        //GetcoupounDTo
        public int Id { get; set; }

        public string Code { get; set; } = null!;

        public decimal Discount { get; set; }

        public bool IsPercent { get; set; }

        public int UsedCount { get; set; }

        public int Quantity { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
