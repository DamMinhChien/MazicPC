using AutoMapper;
using MazicPC.Models;
using MazicPC.DTOs.UserDTO;

namespace MazicPC.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // a--->b
            CreateMap<User, UserDto>();
            CreateMap<User, AdminGetUserDto>().ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Account.Username));
            CreateMap<PutUserDto, User>();
        }
    }
}
