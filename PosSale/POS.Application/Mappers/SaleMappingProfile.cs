using AutoMapper;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;

namespace POS.Application.Mappers
{
    public class SaleMappingProfile : Profile
    {
        public SaleMappingProfile()
        {
            CreateMap<Sale, SaleResponseDto>()
                .ForMember(s =>s.SaleId, s=>s.MapFrom(s =>s.Id))
                .ForMember(s =>s.VoucherDescription, s =>s.MapFrom(s =>s.VoucherDocumentType.Description))
                .ForMember(s =>s.Client, s =>s.MapFrom(s =>s.Client.Name))
                .ForMember(s =>s.Warehouse, s =>s.MapFrom(s =>s.Warehouse.Name))
                .ForMember(s =>s.DateOfSale, s =>s.MapFrom(s =>s.AuditCreateDate))
                .ReverseMap();

            CreateMap<Sale, SaleByIdResponseDto>()
                .ForMember(s => s.SaleId, s => s.MapFrom(s => s.Id))
                .ForMember(s => s.DateOfSale, s => s.MapFrom(s => s.AuditCreateDate))
                .ReverseMap();

            CreateMap<SaleDetail, SaleDetailByIdResponseDto>()
                .ForMember(sd => sd.ProductId, sd => sd.MapFrom(sd => sd.ProductId))
                .ForMember(sd => sd.Image, sd => sd.MapFrom(sd => sd.Product.Image))
                .ForMember(sd => sd.Code, sd => sd.MapFrom(sd => sd.Product.Code))
                .ForMember(sd => sd.Name, sd => sd.MapFrom(sd => sd.Product.Name))
                .ForMember(sd => sd.TotalAmount, sd => sd.MapFrom(sd => sd.Total))
                .ReverseMap();

            CreateMap<Product, ProductStockByWarehouseIdResponseDto>()
                .ForMember(sd => sd.ProductId, sd => sd.MapFrom(sd => sd.Id))
                .ForMember(sd => sd.Image, sd => sd.MapFrom(sd => sd.Image))
                .ForMember(sd => sd.Code, sd => sd.MapFrom(sd => sd.Code))
                .ForMember(sd => sd.Name, sd => sd.MapFrom(sd => sd.Name))
                .ForMember(sd => sd.Category, sd => sd.MapFrom(sd => sd.Category.Name))
                .ForMember(sd => sd.UnitSalePrice, sd => sd.MapFrom(sd => sd.UnitSalePrice))
                .ForMember(sd => sd.CurrentStock, sd => sd.MapFrom(sd => sd.ProductStocks.Sum(ps =>ps.CurrentStock)))
                .ReverseMap();

            CreateMap<SaleRequestDto, Sale>();
            CreateMap<SaleDetailRequestDto, SaleDetail>();

        }
    }
}
