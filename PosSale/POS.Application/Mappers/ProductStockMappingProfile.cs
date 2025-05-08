using AutoMapper;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;

namespace POS.Application.Mappers
{
    public class ProductStockMappingProfile : Profile
    {
        public ProductStockMappingProfile() 
        {
            CreateMap<ProductStock, ProductStockByWarehouseResponseDto>()
                .ForMember(w =>w.Warehouse, w => w.MapFrom(w => w.Warehouse.Name))
                .ForMember(c => c.CurrentStock, c => c.MapFrom(c => c.CurrentStock))
                .ForMember(p => p.PurchasePrice, p => p.MapFrom(p => p.PurchasePrice))
                .ReverseMap();
        }
    }
}
