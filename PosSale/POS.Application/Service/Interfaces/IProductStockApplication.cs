using POS.Application.Common.Bases.Response;
using POS.Application.Dtos.Response;

namespace POS.Application.Service.Interfaces
{
    public interface IProductStockApplication
    {
        Task<BaseResponse<IEnumerable<ProductStockByWarehouseResponseDto>>> GetProductStockByWarehouseAsync(int productId);
    }
}
