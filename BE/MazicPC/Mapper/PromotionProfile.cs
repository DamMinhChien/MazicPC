using AutoMapper;
using MazicPC.DTOs.PromotionDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class PromotionProfile : Profile
    {
        public PromotionProfile()
        {
            CreateMap<PromotionDto, Promotion>();
            CreateMap<PromotionTargetDto, PromotionTarget>();

            CreateMap<Promotion, GetPromotionDto>();
            CreateMap<PromotionTarget, GetPromotionTargetDto>();

        }
    }
}
