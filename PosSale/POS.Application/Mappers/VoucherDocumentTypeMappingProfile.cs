using AutoMapper;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;
using POS.Utilities.Static;

namespace POS.Application.Mappers
{
    public class VoucherDocumentTypeMappingProfile : Profile
    {
        public VoucherDocumentTypeMappingProfile()
        {
            CreateMap<VoucherDocumentType, VoucherDocumentTypeResponseDto>()
                .ForMember(v => v.voucherDocumentTypeId, v => v.MapFrom(v => v.Id))
                .ForMember(v => v.StateVoucherDocumentType,
                        v => v.MapFrom(v => v.State.Equals((int)StateTypes.ACTIVE) ? "ACTIVE" : "INACTIVE"))
                .ReverseMap();

            CreateMap<VoucherDocumentType, SelectResponse>()
                .ForMember(v => v.Description, v => v.MapFrom(v => v.Description))
                .ReverseMap();

            CreateMap<VoucherDocumentTypeRequestDto, VoucherDocumentType>();
        }
    }
}
