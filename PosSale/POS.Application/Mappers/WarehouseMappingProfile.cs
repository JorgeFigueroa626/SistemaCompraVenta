using AutoMapper;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;
using POS.Utilities.Static;

namespace POS.Application.Mappers
{
    public class WarehouseMappingProfile : Profile
    {
        public WarehouseMappingProfile()
        {
            CreateMap<Warehouse, WarehouseResponseDto>()
                .ForMember(c => c.WarehouseId, c => c.MapFrom(c => c.Id))
                .ForMember(c => c.StateWarehouse, c =>
                            c.MapFrom(c => c.State.Equals((int)StateTypes.ACTIVE) ? "ACTIVE" : "INACTIVE"))
                .ReverseMap();

            CreateMap<Warehouse, SelectResponse>()
                .ForMember(w => w.Description, w =>w.MapFrom(w =>w.Name))
                .ReverseMap();

            CreateMap<WarehouseRequestDto, Warehouse>()
                .ReverseMap();
        }
    }
}
