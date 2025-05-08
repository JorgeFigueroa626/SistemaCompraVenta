using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;

namespace POS.Application.Service.Interfaces
{
    public interface IProductApplication
    {
        Task<BaseResponse<IEnumerable<ProductResponseDto>>> ListProducts(BaseFiltersRequest request);
        Task<BaseResponse<IEnumerable<SelectResponse>>> SelectProducts();
        Task<BaseResponse<ProductResponseDto>> GetByProductId(int productId);
        Task<BaseResponse<bool>> RegisterProduct(ProductRequestDto requestDto);
        Task<BaseResponse<bool>> EditByProductId(int productId, ProductRequestDto requestDto);
        Task<BaseResponse<bool>> DeleteByProductId(int productId);
    }
}
