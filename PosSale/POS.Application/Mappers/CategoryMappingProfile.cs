using AutoMapper;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;
using POS.Utilities.Static;

namespace POS.Application.Mappers
{
    public class CategoryMappingProfile : Profile
    {
        public CategoryMappingProfile()
        {
            CreateMap<Category, CategoryResponseDto>()
                .ForMember(c =>c.CategoryId, c => c.MapFrom(c => c.Id))
                .ForMember(c => c.StateCategory, c => 
                            c.MapFrom(c => c.State.Equals((int)StateTypes.ACTIVE) ? "ACTIVE" : "INACTIVE"))
                .ReverseMap();

            

            CreateMap<Category, SelectResponse>()
            .ForMember(c => c.Description, c => c.MapFrom(c => c.Name));

            CreateMap<CategoryRequestDto, Category>();
        }

    }
}
