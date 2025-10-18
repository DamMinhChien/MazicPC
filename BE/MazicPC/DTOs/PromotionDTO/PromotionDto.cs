namespace MazicPC.DTOs.PromotionDTO
{
    public class PromotionDto
    {
        public string Name { get; set; } = null!;

        public string DiscountType { get; set; } = null!;

        public decimal DiscountValue { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<PromotionTargetDto>? Targets { get; set; }
    }
}
