using AutoMapper;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Domain.Entities;
using POS.Utilities.Static;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Application.Mappers
{
    public class ClientMappingProfile : Profile
    {
        public ClientMappingProfile() 
        {
            CreateMap<Client, ClientResponseDto>()
                .ForMember(c =>c.ClientId, c =>c.MapFrom(c =>c.Id))
                .ForMember(c => c.DocumentType, c => c.MapFrom(c =>c.DocumentType.Abbreviation))
                .ForMember(c =>c.StateClient, c =>
                    c.MapFrom(c =>c.State.Equals((int)StateTypes.ACTIVE) ? "ACTIVE" : "INACTIVE"))
                .ReverseMap();

            CreateMap<Client, SelectResponse>()
                .ForMember(c => c.Description, c => c.MapFrom(c => c.Name))
                .ReverseMap();

            CreateMap<Client, ClientByIdResponseDto>()
                .ForMember(c =>c.ClientId, c => c.MapFrom(c =>c.Id))
                .ReverseMap();

            CreateMap<ClientRequestDto, Client>();
        }
    }
}
