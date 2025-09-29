using AutoMapper;
using MazicPC.DTOs.AccountDTO;
using MazicPC.Models;

namespace MazicPC.DTOs.Mapper
{
    public class AccountProfile : Profile
    {
        public AccountProfile()
        {   // a--->b
            CreateMap<Account, GetAccountDto>().ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User!.FullName)); ;
            CreateMap<Account, UserPutAccountDto>();
            CreateMap<AdminPutAccountDto, Account>().ForPath(dest => dest.User!.FullName, opt => opt.MapFrom(src => src.FullName))
           .ForAllMembers(opts =>
               opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
