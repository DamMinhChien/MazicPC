namespace MazicPC.DTOs.ReviewDTO
{
    public class GetReviewDto
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public string FullName { get; set; } = null!;

        public int Rating { get; set; }

        public string? Comment { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
