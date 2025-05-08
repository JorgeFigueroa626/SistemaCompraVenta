using POS.Application.Common.Bases.Response;
using POS.Application.Dtos.Request;

namespace POS.Application.Service.Interfaces
{
    public interface IUserApplication
    {
        Task<BaseResponse<bool>> RegisterUser(UserRequestDto requestDto);
    }
}
