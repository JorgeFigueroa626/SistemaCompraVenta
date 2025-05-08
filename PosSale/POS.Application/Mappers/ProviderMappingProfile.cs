using AutoMapper;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;
using POS.Utilities.Static;

namespace POS.Application.Mappers
{
    public class ProviderMappingProfile : Profile
    {
        public ProviderMappingProfile()
        {
            CreateMap<Provider, ProviderResponseDto>()
                .ForMember(p => p.ProviderId, p => p.MapFrom(p => p.Id))
                .ForMember(p => p.DocumentType, p =>p.MapFrom(p => p.DocumentType.Abbreviation)) //MAPEAMOS PARA OPTENER EL TIPO DE DOC.
                .ForMember(p => p.StateProvider, p => p.MapFrom(p =>
                            p.State.Equals((int)StateTypes.ACTIVE) ? "ACTIVE" : "INACTIVE"))
                .ReverseMap();



            CreateMap<Provider, SelectResponse>()
                .ForMember(p => p.Description, p => p.MapFrom(p => p.Name))
                .ReverseMap();

            CreateMap<ProviderRequestDto, Provider>();
        }
    }
}
