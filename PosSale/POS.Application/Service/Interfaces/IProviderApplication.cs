using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;

namespace POS.Application.Service.Interfaces
{
    public interface IProviderApplication
    {
        Task<BaseResponse<IEnumerable<ProviderResponseDto>>> ListProviders(BaseFiltersRequest request);
        Task<BaseResponse<IEnumerable<SelectResponse>>> SelectProviders();
        Task<BaseResponse<ProviderResponseDto>> GetByProviderId(int providerId);
        Task<BaseResponse<bool>> RegisterProvider(ProviderRequestDto requestDto);
        Task<BaseResponse<bool>> EditByProviderId(int providerId,ProviderRequestDto requestDto);
        Task<BaseResponse<bool>> DeleteProvider(int providerId);
    }
}
