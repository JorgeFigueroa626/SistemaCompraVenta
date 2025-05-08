using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS.Application.Common.Bases.Response;
using POS.Application.Common.Odering;
using POS.Application.Commons.Base.Request;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Application.Service.Interfaces;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Message;

namespace POS.Application.Service.Implementations
{
    public class SaleApplication : ISaleApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderingQuery _orderingQuery;

        public SaleApplication(IUnitOfWork unitOfWork, IMapper mapper, IOrderingQuery orderingQuery)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderingQuery = orderingQuery;
        }

        public async Task<BaseResponse<IEnumerable<SaleResponseDto>>> ListSales(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<SaleResponseDto>>();
            try
            {
                var products = _unitOfWork.Sale.GetAllQueryable()
                    .AsNoTracking()
                    .Include(s =>s.VoucherDocumentType)
                    .Include(s =>s.Client)
                    .Include(s =>s.Warehouse)
                    .AsQueryable();

                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            products = products.Where(c => c.VoucherNumber!.Contains(request.TextFilter));
                            break;
                    }
                }

                if (request.StateFilter is not null)
                {
                    products = products.Where(c => c.State.Equals(request.StateFilter));
                }

                if (!string.IsNullOrEmpty(request.StartDate) && !string.IsNullOrEmpty(request.EndDate))
                {
                    products = products.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate) && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate).AddDays(1));
                }

                if (request.Sort is null) request.Sort = "Id";

                //listado de filtros
                var items = await _orderingQuery.Ordering(request, products, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await products.CountAsync();
                response.Data = _mapper.Map<IEnumerable<SaleResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;


            }
            catch (Exception ex)
            {
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<SaleByIdResponseDto>> GetBySaleId(int saleId)
        {
            var response =new BaseResponse<SaleByIdResponseDto>();
            try
            {
                var sale = await _unitOfWork.Sale.GetByIdAsync(saleId);
                if (sale is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY; 
                    return response;
                }

                var saleDetail = await _unitOfWork.SaleDetail.GetSaleDetailBySaleId(sale.Id);
                sale.SaleDetails = saleDetail.ToList();
                response.IsSuccess = true;
                response.Data = _mapper.Map<SaleByIdResponseDto>(sale);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }


        public async Task<BaseResponse<bool>> RegisterSale(SaleRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var sale = _mapper.Map<Sale>(requestDto);
                response.Data = await _unitOfWork.Sale.RegisterAsync(sale);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }
                foreach (var item in sale.SaleDetails)
                {
                    var productStock = await _unitOfWork.ProductStock
                                        .GetProductStockByProductId(item.ProductId, requestDto.WarehouseId);
                    productStock.CurrentStock -= item.Quantity;
                    await _unitOfWork.ProductStock.UpdateCurrentStockByProducts(productStock);
                }
                transaction.Commit();
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_SAVE;

            }
            catch (Exception ex)
            {
                transaction.Rollback();
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public async Task<BaseResponse<bool>> AnularSaleById(int saleId)
        {
            var response = new BaseResponse<bool>();
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var sale = await GetBySaleId(saleId);
                response.Data = await _unitOfWork.Sale.RemoveAsync(saleId);

                foreach (var item in sale.Data!.SaleDetails)
                {
                    var productStock = await _unitOfWork.ProductStock
                                    .GetProductStockByProductId(item.ProductId, sale.Data.WarehouseId);
                    productStock.CurrentStock -= item.Quantity;
                    await _unitOfWork.ProductStock.UpdateCurrentStockByProducts(productStock);
                }
                transaction.Commit();
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_CANCEL;

            }
            catch (Exception ex)
            {
                transaction.Rollback();
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<IEnumerable<ProductStockByWarehouseIdResponseDto>>> GetProductStockByWarehouseId(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<ProductStockByWarehouseIdResponseDto>>();
            try
            {
                var products = _unitOfWork.SaleDetail.GetProductStockByWarehouseId(request.Id);

                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            products = products.Where(c => c.Code!.Contains(request.TextFilter));
                            break;
                        case 2:
                            products = products.Where(c => c.Name!.Contains(request.TextFilter));
                            break;
                    }
                }

                if (request.StateFilter is not null)
                {
                    products = products.Where(c => c.State.Equals(request.StateFilter));
                }

                if (!string.IsNullOrEmpty(request.StartDate) && !string.IsNullOrEmpty(request.EndDate))
                {
                    products = products.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate) && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate).AddDays(1));
                }

                if (request.Sort is null) request.Sort = "Id";

                //listado de filtros
                var items = await _orderingQuery.Ordering(request, products, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await products.CountAsync();
                response.Data = _mapper.Map<IEnumerable<ProductStockByWarehouseIdResponseDto>>(items);
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
