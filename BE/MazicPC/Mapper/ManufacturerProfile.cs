using AutoMapper;
using MazicPC.DTOs.ManufacturerDTO;
using MazicPC.DTOs.UserDTO;
using MazicPC.Models;

namespace MazicPC.Mapper
{
    public class ManufacturerProfile : Profile
    {
        public ManufacturerProfile()
        {
            // a--->b
            CreateMap<Manufacturer, GetManufacturerDto>();
            CreateMap<Manufacturer, ManufacturerDto>().ReverseMap();
        }
    }
}
