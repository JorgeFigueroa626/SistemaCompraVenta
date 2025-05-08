using AutoMapper;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;
using POS.Utilities.Static;

namespace POS.Application.Mappers
{
    public class ProductMappingProfile : Profile
    {
        public ProductMappingProfile() 
        {
            CreateMap<Product, ProductResponseDto>()
                .ForMember(p => p.ProductId, p =>p.MapFrom(p =>p.Id))
                .ForMember(p => p.Category, p => p.MapFrom(p => p.Category.Name))//MAPEAMOS PARA TRAER SU NOMBRE DE CATEGORIA.
                .ForMember(p => p.StateProduct, p => 
                        p.MapFrom(p =>p.State.Equals((int)StateTypes.ACTIVE) ? "ACTIVE": "INACTIVE" ))
                .ReverseMap();

            CreateMap<Product, SelectResponse>()
                .ForMember(p => p.Description, p => p.MapFrom(p => p.Name))
                .ReverseMap();

            CreateMap<ProductRequestDto, Product>()
                .ReverseMap();
        }
    }
}
