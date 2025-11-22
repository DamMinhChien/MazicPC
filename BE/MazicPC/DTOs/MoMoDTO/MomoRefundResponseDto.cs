namespace MazicPC.DTOs.MoMoDTO
{
    public class MomoRefundResponseDto
    {
        public string PartnerCode { get; set; }
        public string OrderId { get; set; }
        public string RequestId { get; set; }
        public long Amount { get; set; }
        public long TransId { get; set; }
        public int ResultCode { get; set; }
        public string Message { get; set; }
        public long ResponseTime { get; set; }
    }
}
