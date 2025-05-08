using AutoMapper;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;

namespace POS.Application.Mappers
{
    public class DocumentTypeMappingProfile : Profile
    {
        public DocumentTypeMappingProfile() 
        {
            CreateMap<DocumentType, DocumentTypeResponseDto>()
                .ForMember(d => d.DocumentTypeId, d =>d.MapFrom(d =>d.Id))
                .ReverseMap();
        }
    }
}
