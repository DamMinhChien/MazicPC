using AutoMapper;
using MazicPC.DTOs.PaymentDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class PaymentProfile : Profile
    {
        public PaymentProfile()
        {
            CreateMap<Payment, GetPaymentDto>();
        }
    }
}
