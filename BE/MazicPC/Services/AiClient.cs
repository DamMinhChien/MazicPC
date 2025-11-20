using MazicPC.DTOs.ChatDTO;
using System.Text.Json;

namespace MazicPC.Services
{
    public class AiClient
    {
        private const string CHAT_ENDPOINT = "http://localhost:8000/chat";
        private readonly HttpClient _http;
        public AiClient(HttpClient http) => _http = http;

        public async Task<AIChatResponseDto> AskAI(string msg)
        {
            var payload = new { message = msg };

            try
            {
                var res = await _http.PostAsJsonAsync(CHAT_ENDPOINT, payload);

                if (!res.IsSuccessStatusCode)
                {
                    var errorMessage = await res.Content.ReadAsStringAsync();
                    throw new Exception($"Dịch vụ AI trả về lỗi: {errorMessage}");
                }

                var jsonData = await res.Content.ReadAsStringAsync();
                var aiResponse = JsonSerializer.Deserialize<AIChatResponseDto>(jsonData,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                return aiResponse ?? throw new Exception("Dữ liệu phản hồi từ AI không hợp lệ.");
            }
            catch (TaskCanceledException)
            {
                throw new Exception("Dịch vụ AI không phản hồi (timeout).");
            }
            catch (HttpRequestException)
            {
                throw new Exception("Không thể kết nối tới dịch vụ AI.");
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi không xác định: {ex.Message}");
            }
        }

    }
}
