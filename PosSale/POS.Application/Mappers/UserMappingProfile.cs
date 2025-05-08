using AutoMapper;
using POS.Application.Dtos.Request;
using POS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Application.Mappers
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile() 
        {
            CreateMap<UserRequestDto, User>();
            CreateMap<TokeRequestDto, User>();
        }

    }
}
