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
using POS.Utilities.Static;
using System.Data;

namespace POS.Application.Service.Implementations
{
    public class PurcharseApplication : IPurcharseApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderingQuery _orderingQuery;
        //private readonly IDbTransaction _transaction;

        public PurcharseApplication(IUnitOfWork unitOfWork, IMapper mapper, IOrderingQuery orderingQuery)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderingQuery = orderingQuery;
        }

        public async Task<BaseResponse<IEnumerable<PurcharseResponseDto>>> ListPurcharses(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<PurcharseResponseDto>>();
            try
            {
                var purcharses = _unitOfWork.Purchases.GetAllQueryable()
                    .Include(p =>p.Provider).Include(p =>p.Warehouse).AsQueryable();

                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            purcharses = purcharses.Where(c => c.Provider!.Name!.Contains(request.TextFilter));
                            break;
                    }
                }

                /*if (request.StateFilter is not null)
                {
                    purcharses = purcharses.Where(c => c.State.Equals(request.StateFilter));
                }*/

                if (!string.IsNullOrEmpty(request.StartDate) && !string.IsNullOrEmpty(request.EndDate))
                {
                    purcharses = purcharses.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate) && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate).AddDays(1));
                }

                if (request.Sort is null) request.Sort = "Id";

                //listado de filtros
                var items = await _orderingQuery.Ordering(request, purcharses, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await purcharses.CountAsync();
                response.Data = _mapper.Map<IEnumerable<PurcharseResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<PurcharseByIdResponseDto>> GetByPurcharsesId(int purchargeId)
        {
            var response = new BaseResponse<PurcharseByIdResponseDto>();
            try
            {
                var purcharse = await _unitOfWork.Purchases.GetByIdAsync(purchargeId);
                if (purcharse is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                //INTEGRAMOS EL METODO PARA DEVOLVER DETALLE DE COMPRA
                var purcharseDetail = await _unitOfWork.PurchasesDetail.GetPurcharseDetailByPurcharseId(purcharse.Id);
                purcharse.PurcharseDetails = purcharseDetail.ToList();

                response.IsSuccess = true;
                response.Data = _mapper.Map<PurcharseByIdResponseDto>(purcharse);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> RegisterPurcharse(PurcharseRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var purcharse = _mapper.Map<Purcharse>(requestDto);
                purcharse.State = (int)StateTypes.ACTIVE;
                await _unitOfWork.Purchases.RegisterAsync(purcharse); //registra la compra
                //registramos el detalle de la compras
                foreach (var item in purcharse.PurcharseDetails)
                {
                    var productStock = await _unitOfWork.ProductStock       //obtenemos el stock
                        .GetProductStockByProductId(item.ProductId, requestDto.WarehouseId);
                    productStock.CurrentStock += item.Quantity;             //cantidad de producto
                    productStock.PurchasePrice = item.UnitPurcharsePrice;   //precio de producto
                    await _unitOfWork.ProductStock.UpdateCurrentStockByProducts(productStock);  //autualizamos el stock
                }

                transaction.Commit();
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_SAVE;

            }
            catch (Exception e)
            {
                transaction.Rollback();
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        
        public async Task<BaseResponse<bool>> AnularByPurcharseId(int purcharseId)
        {
            var response = new BaseResponse<bool>();
            using var transaction =  _unitOfWork.BeginTransaction();
            try
            {
                var purcharse = await GetByPurcharsesId(purcharseId);
                response.Data = await _unitOfWork.Purchases.RemoveAsync(purcharseId);

                foreach (var item in purcharse.Data!.PurcharseDetails)
                {
                    var productStock = await _unitOfWork.ProductStock
                        .GetProductStockByProductId(item.ProductId, purcharse.Data.WarehouseId);
                    productStock.CurrentStock -= item.Quantity;
                    await _unitOfWork.ProductStock.UpdateCurrentStockByProducts(productStock);
                }

                transaction.Commit();
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_CANCEL;

            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

    }
}
