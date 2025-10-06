using AutoMapper;
using MazicPC.DTOs.BannerDTO;
using MazicPC.DTOs.UserDTO;
using MazicPC.Models;

namespace MazicPC.DTOs.Mapper
{
    public class BannerProfile : Profile
    {
        public BannerProfile()
        {
            // a--->b
            CreateMap<Banner, GetBannerDto>().ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product!.Name));
            //CreateMap<User, AdminGetUserDto>().ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Account.Username));
            CreateMap<BannerDto, Banner>().ReverseMap();
            CreateMap<Banner, GetBannerWithProductDto>().ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product!.Name));

        }
    }
}
