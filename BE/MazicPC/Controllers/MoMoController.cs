using MazicPC.DTOs.MoMoDTO;
using MazicPC.Enum;
using MazicPC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Security.Cryptography;
using System.Text;

namespace MazicPC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoMoController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly MazicPcContext _context;

        public MoMoController(IConfiguration config, IHttpClientFactory httpClientFactory, MazicPcContext context)
        {
            _context = context;
            _config = config;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("create-payment")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> CreatePayment([FromBody] MoMoPaymentRequestDto dto)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == dto.OrderId);
            if (order == null) return BadRequest("Đơn hàng không tồn tại");

            var endpoint = _config["MoMo:Endpoint"];
            var partnerCode = _config["MoMo:PartnerCode"];
            var accessKey = _config["MoMo:AccessKey"];
            var secretKey = _config["MoMo:SecretKey"];
            var returnUrl = _config["MoMo:ReturnUrl"];
            var ipnUrl = _config["MoMo:IpnUrl"];
            var requestType = _config["MoMo:RequestType"];
            var amount = (long)order.TotalAmount;

            string orderId = Guid.NewGuid().ToString();
            string requestId = Guid.NewGuid().ToString();
            string orderInfo = $"Thanh toán đơn hàng {order.Id}";
            string extraData = order.Id.ToString();

            string rawHash = $"accessKey={accessKey}&amount={amount}&extraData={extraData}&ipnUrl={ipnUrl}&orderId={orderId}&orderInfo={orderInfo}&partnerCode={partnerCode}&redirectUrl={returnUrl}&requestId={requestId}&requestType={requestType}";

            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey!));
            var signatureBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawHash));
            string signature = BitConverter.ToString(signatureBytes).Replace("-", "").ToLower();

            var payload = new
            {
                partnerCode,
                accessKey,
                requestId,
                amount,
                orderId,
                orderInfo,
                redirectUrl = returnUrl,
                lang = "vi",
                ipnUrl,
                extraData,
                requestType,
                signature
            };

            //post đến server momo
            var client = _httpClientFactory.CreateClient();
            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(endpoint, content);
            var responseBody = await response.Content.ReadAsStringAsync();

            var payment = order.Payments.FirstOrDefault();
            if (payment != null)
            {
                payment.TransactionCode = orderId;
                await _context.SaveChangesAsync();
            }

            return Content(responseBody, "application/json");
        }

        [HttpPost("notify")]
        public async Task<IActionResult> MoMoNotify([FromBody] MoMoNotifyDto data)
        {
            Console.WriteLine("MoMo callback: " + JsonConvert.SerializeObject(data));

            int orderId = int.Parse(data.ExtraData);
            var order = await _context.Orders.Include(o => o.Payments)
                                             .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) return BadRequest();

            var payment = order.Payments.FirstOrDefault();
            if (payment != null)
            {
                if (data.ResultCode == 0)
                {
                    payment.Status = PaymentStatus.Completed.ToString();
                    payment.PaidAt = DateTime.Now;
                    order.Status = OrderStatus.Confirmed.ToString();
                }
                else
                {
                    payment.Status = PaymentStatus.Failed.ToString();
                }

                await _context.SaveChangesAsync();
            }

            return Ok();
        }

    }
}
