namespace MazicPC.DTOs.MoMoDTO
{
    public class MomoCreateResponseDto
    {
        public string PartnerCode { get; set; } = "";
        public string AccessKey { get; set; } = "";
        public string RequestId { get; set; } = "";
        public string OrderId { get; set; } = "";
        public long Amount { get; set; }
        public string OrderInfo { get; set; } = "";
        public string PayUrl { get; set; } = "";
        public int ResultCode { get; set; }
        public string Message { get; set; } = "";
        public long TransId { get; set; } // ⚡ Đây là transId chuẩn để Refund
        public string ExtraData { get; set; } = "";
    }

}
