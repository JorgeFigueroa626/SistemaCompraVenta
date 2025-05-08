using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;

namespace POS.Application.Service.Interfaces
{
    public interface IDocumentTypeApplication
    {
        Task<BaseResponse<IEnumerable<DocumentTypeResponseDto>>> ListDocumentTypes(BaseFiltersRequest request);
        Task<BaseResponse<IEnumerable<SelectResponse>>> SelectDocumentTypes();
        Task<BaseResponse<DocumentTypeResponseDto>> GetByDocumentTypeId(int documentTypeId);
        Task<BaseResponse<bool>> RegisterDocumentType(DocumentTypeRequestDto requestDto);
        Task<BaseResponse<bool>> EditByDocumentTypeId(DocumentTypeRequestDto requestDto);
        Task<BaseResponse<bool>> RemoveByDocumentTypeId(int documentTypeId);
    }
}
