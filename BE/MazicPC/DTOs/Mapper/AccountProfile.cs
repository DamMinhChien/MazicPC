using AutoMapper;
using MazicPC.DTOs.AccountDTO;
using MazicPC.Models;

namespace MazicPC.DTOs.Mapper
{
    public class AccountProfile : Profile
    {
        public AccountProfile()
        {   // a--->b
            CreateMap<Account, GetAccountDto>();
            CreateMap<Account, UserPutAccountDto>();
            CreateMap<UserPutAccountDto, Account>()
           .ForAllMembers(opts =>
               opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
