using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;

namespace POS.Application.Service.Interfaces
{
    public interface IPurcharseApplication
    {
        Task<BaseResponse<IEnumerable<PurcharseResponseDto>>> ListPurcharses(BaseFiltersRequest request);
        Task<BaseResponse<PurcharseByIdResponseDto>> GetByPurcharsesId(int purchargeId);
        Task<BaseResponse<bool>> RegisterPurcharse(PurcharseRequestDto requestDto);
        Task<BaseResponse<bool>> AnularByPurcharseId(int purcharseId);
    }
}
