using AutoMapper;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;

namespace POS.Application.Mappers
{
    public class PurcharseMappingProfile : Profile
    {
        public PurcharseMappingProfile()
        {
            CreateMap<Purcharse, PurcharseResponseDto>()
                .ForMember(p =>p.PurcharseId, p =>p.MapFrom(p =>p.Id))
                .ForMember(p =>p.Provider, p =>p.MapFrom(p =>p.Provider!.Name))
                .ForMember(p =>p.Warehouse, p =>p.MapFrom(p =>p.Warehouse.Name))
                .ForMember(p =>p.DateOfPurcharse, p =>p.MapFrom(p =>p.AuditCreateDate))
                .ReverseMap();

            CreateMap<Purcharse, PurcharseByIdResponseDto>()
                 .ForMember(x => x.PurcharseId, x => x.MapFrom(y => y.Id))
                 .ReverseMap();
            CreateMap<PurcharseDetail, PurcharseDetailByIdResponseDto>()
                .ForMember(x => x.ProductId, x => x.MapFrom(y => y.ProductId))
                .ForMember(x => x.Image, x => x.MapFrom(y => y.Product.Image))
                .ForMember(x => x.Code, x => x.MapFrom(y => y.Product.Code))
                .ForMember(x => x.Name, x => x.MapFrom(y => y.Product.Name))
                .ForMember(x => x.TotalAmount, x => x.MapFrom(y => y.Total))
                .ReverseMap();

            CreateMap<PurcharseRequestDto, Purcharse>();
            CreateMap<PurcharseDetailRequestDto, PurcharseDetail>();
        }
    }
}
