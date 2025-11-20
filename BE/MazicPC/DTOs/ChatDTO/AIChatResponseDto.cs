using System.Text.Json.Serialization;

namespace MazicPC.DTOs.ChatDTO
{
    public class AIChatResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        [JsonPropertyName("product_ids")]
        public List<int> ProductIds { get; set; } = new List<int>();
    }
}
