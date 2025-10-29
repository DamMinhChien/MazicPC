using AutoMapper;
using MazicPC.DTOs.ReviewDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class ReviewProfile : Profile
    {
        public ReviewProfile()
        {
            CreateMap<Review, GetReviewDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Account.User!.FullName));
            CreateMap<ReviewDto, Review>();
        }
    }
}
