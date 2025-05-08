using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Application.Service.Interfaces
{
    public interface IClientApplication
    {
        Task<BaseResponse<IEnumerable<ClientResponseDto>>> ListClients(BaseFiltersRequest request);
        Task<BaseResponse<IEnumerable<SelectResponse>>> SelectClients();
        Task<BaseResponse<ClientByIdResponseDto>> GetByClientId(int clientId);
        Task<BaseResponse<bool>> RegisterClient(ClientRequestDto requestDto);
        Task<BaseResponse<bool>> EditClient(int clientId, ClientRequestDto requestDto);
        Task<BaseResponse<bool>> DeleteClient(int clientId);
    }
}
