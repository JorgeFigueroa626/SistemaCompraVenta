using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;

namespace POS.Application.Service.Interfaces
{
    public interface ISaleApplication
    {
        Task<BaseResponse<IEnumerable<SaleResponseDto>>> ListSales(BaseFiltersRequest request);
        Task<BaseResponse<SaleByIdResponseDto>> GetBySaleId(int saleId);
        Task<BaseResponse<bool>> RegisterSale(SaleRequestDto requestDto);
        Task<BaseResponse<bool>> AnularSaleById(int saleId);
        Task<BaseResponse<IEnumerable<ProductStockByWarehouseIdResponseDto>>> GetProductStockByWarehouseId(BaseFiltersRequest request);
    }
}
