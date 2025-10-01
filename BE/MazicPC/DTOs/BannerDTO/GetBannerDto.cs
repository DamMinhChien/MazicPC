using System.Text.Json.Serialization;

namespace MazicPC.DTOs.BannerDTO
{
    public class GetBannerDto
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        [JsonPropertyName("productName")]
        public string Name { get; set; } = null!;

        public bool? IsActive { get; set; }

        public string ImageUrl { get; set; } = null!;

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
