namespace MazicPC.DTOs.PromotionDTO
{
    public class GetPromotionTargetDto
    {
        public int Id { get; set; }
        public string TargetType { get; set; } = null!;
        public int? TargetId { get; set; }
    }
}
