namespace MazicPC.DTOs.PromotionDTO
{
    public class GetPromotionDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string DiscountType { get; set; } = null!;

        public decimal DiscountValue { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<string>? TargetNames { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

    }
}
