using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;

namespace POS.Application.Service.Interfaces
{
    public interface IVoucherDocumentTypeApplication
    {
        Task<BaseResponse<IEnumerable<VoucherDocumentTypeResponseDto>>> ListVoucherDocumentTypes(BaseFiltersRequest request);
        Task<BaseResponse<IEnumerable<SelectResponse>>> SelectVoucherDocumentTypes();
        Task<BaseResponse<VoucherDocumentTypeResponseDto>> GetByVoucherDocumentTypeId(int voucherDocumentTypeId);
        Task<BaseResponse<bool>> RegisterVoucherDocumentType(VoucherDocumentTypeRequestDto requestDto);
        Task<BaseResponse<bool>> EditByVoucherDocumentTypeId(int voucherDocumentTypeId, VoucherDocumentTypeRequestDto requestDto);
        Task<BaseResponse<bool>> RemoverByVoucherDocumentTypeId(int voucherDocumentTypeId);
    }
}
