using AutoMapper;
using POS.Application.Common.Bases.Response;
using POS.Application.Dtos.Response;
using POS.Application.Service.Interfaces;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Message;

namespace POS.Application.Service.Implementations
{
    public class ProductStockApplication : IProductStockApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductStockApplication(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BaseResponse<IEnumerable<ProductStockByWarehouseResponseDto>>> GetProductStockByWarehouseAsync(int productId)
        {
            var response = new BaseResponse<IEnumerable<ProductStockByWarehouseResponseDto>>();
            try
            {
                var productStockByWarehouse = await _unitOfWork.ProductStock.GetProductStockByWarehouse(productId);
                if (productStockByWarehouse is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                response.IsSuccess = true;
                response.Data = _mapper.Map<IEnumerable<ProductStockByWarehouseResponseDto>>(productStockByWarehouse);   
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
    }
}
