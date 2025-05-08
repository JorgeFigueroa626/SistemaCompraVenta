using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;

namespace POS.Application.Service.Interfaces
{
    public interface IWarehouseApplication
    {
        Task<BaseResponse<IEnumerable<WarehouseResponseDto>>> ListWarehouses(BaseFiltersRequest request);
        Task<BaseResponse<IEnumerable<SelectResponse>>> SelectWarehouses();
        Task<BaseResponse<WarehouseResponseDto>> GetByWarehouseId(int warehouseId);
        Task<BaseResponse<bool>> RegisterWarehouse(WarehouseRequestDto requestDto);
        Task<BaseResponse<bool>> EditWarehouse(int warehouseId, WarehouseRequestDto requestDto);
        Task<BaseResponse<bool>> RemoverWarehouse(int warehouseId);
    }
}
