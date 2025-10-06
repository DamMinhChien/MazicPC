using System.Text.Json.Serialization;

namespace MazicPC.DTOs.BannerDTO
{
    public class GetBannerWithProductDto
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string ImageUrl { get; set; } = null!;
        public bool? IsActive { get; set; }
        public int? ProductId { get; set; }
        [JsonPropertyName("productName")]
        public string Name { get; set; } = null!;

    }
}
