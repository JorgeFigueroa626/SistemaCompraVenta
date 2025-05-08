using POS.Application.Common.Bases.Response;
using POS.Application.Dtos.Request;

namespace POS.Application.Service.Interfaces
{
    public interface IAuthApplication
    {
        Task<BaseResponse<string>> Login(TokeRequestDto requestDto, string authType);
        Task<BaseResponse<string>> LoginWithGoogle(string credential, string authType);


    }
}
