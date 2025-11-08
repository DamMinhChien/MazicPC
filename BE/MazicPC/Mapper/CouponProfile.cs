using AutoMapper;
using MazicPC.DTOs.CouponDTO;
using MazicPC.DTOs.ShippingMethodDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class CouponProfile : Profile
    {
        public CouponProfile()
        {
            CreateMap<CouponDto, Coupon>().ReverseMap();
            CreateMap<Coupon, GetCouponDto>();
        }
    }
}
