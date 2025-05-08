using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS.Application.Common.Bases.Response;
using POS.Application.Common.Odering;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Application.Service.Interfaces;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Message;

namespace POS.Application.Service.Implementations
{
    public class WarehouseApplication : IWarehouseApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderingQuery _orderingQuery;

        public WarehouseApplication(IUnitOfWork unitOfWork, IMapper mapper, IOrderingQuery orderingQuery)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderingQuery = orderingQuery;
        }

        public async Task<BaseResponse<IEnumerable<WarehouseResponseDto>>> ListWarehouses(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<WarehouseResponseDto>>();
            try
            {
                var warehouses = _unitOfWork.Warehouse.GetAllQueryable();
                /*var warehouses = GetEnityQuery(c => c.AuditDeleteUser == null && c.AuditDeleteDate == null);*/

                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            warehouses = warehouses.Where(c => c.Name!.Contains(request.TextFilter));
                            break;
                    }
                }

                if (request.StateFilter is not null)
                {
                    warehouses = warehouses.Where(c => c.State.Equals(request.StateFilter));
                }

                if (!string.IsNullOrEmpty(request.StartDate) && !string.IsNullOrEmpty(request.EndDate))
                {
                    warehouses = warehouses.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate) && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate).AddDays(1));
                }

                if (request.Sort is null) request.Sort = "Id";

                //listado de filtros
                var items = await _orderingQuery.Ordering(request, warehouses, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await warehouses.CountAsync();
                response.Data = _mapper.Map<IEnumerable<WarehouseResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;


            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public async Task<BaseResponse<IEnumerable<SelectResponse>>> SelectWarehouses()
        {
            var response = new BaseResponse<IEnumerable<SelectResponse>>();
            try
            {
                var warehouse = await _unitOfWork.Warehouse.GetSelectAsync();
                if (warehouse is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;

                }
                
                 response.IsSuccess = true;
                 response.Data = _mapper.Map<IEnumerable<SelectResponse>>(warehouse);
                 response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<WarehouseResponseDto>> GetByWarehouseId(int warehouseId)
        {
            var response = new BaseResponse<WarehouseResponseDto>();
            try
            {
                var warehouse = await _unitOfWork.Warehouse.GetByIdAsync(warehouseId);
                if (warehouse is null) 
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                response.IsSuccess = true;
                response.Data = _mapper.Map<WarehouseResponseDto>(warehouse);
                response.Message = ReplyMessage.MESSAGE_QUERY;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }


        public async Task<BaseResponse<bool>> RegisterWarehouse(WarehouseRequestDto requestDto)
        {
            var reponse = new BaseResponse<bool>();
            using var transaction = _unitOfWork.BeginTransaction(); 
            try
            {
                var warehouse = _mapper.Map<Warehouse>(requestDto);
                reponse.Data = await _unitOfWork.Warehouse.RegisterAsync(warehouse);

                var warehouseId = warehouse.Id; ////obtemos el ID del almacen del registro

                var products = await _unitOfWork.Product.GetAllAsync(); //optenemos las lista de productos

                //REGISTRAMOS LOS PRODUCTOS EN UN ALMACEN
                await RegisterProductsStockByWarehouseId(products, warehouseId);
                
                transaction.Commit();      //verificamos el registro de transaccion
                reponse.IsSuccess = true;
                reponse.Message = ReplyMessage.MESSAGE_SAVE;
                
            }catch (Exception e)
            {
                transaction.Rollback();
                reponse.IsSuccess = false;
                reponse.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return reponse;
        }

        /// METODO PARA RTEGISTRAR LA LISTA DE PRODUCTOS EN UN ALMACEN
        private async Task RegisterProductsStockByWarehouseId(IEnumerable<Product> products, int warehouseId)
        {
            foreach (var product in products)
            {
                var newProductStock = new ProductStock
                {
                    ProductId = product.Id,     //obtemos el ID del producto
                    WarehouseId = warehouseId,  //obtemos el ID del almacen
                    CurrentStock = 0,           //inicialisamos en 0 el productStock
                    PurchasePrice = 0           //inicialisamos en 0 el Precio de compra
                };

                //registramos la cantidad de productos
                await _unitOfWork.ProductStock.RegisterProductStock(newProductStock);
            }
        }
        
        public async Task<BaseResponse<bool>> EditWarehouse(int warehouseId, WarehouseRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var warehouseEdit = await GetByWarehouseId(warehouseId);

                var warehouse = _mapper.Map<Warehouse>(requestDto);
                warehouse.Id = warehouseId;
                response.Data = await _unitOfWork.Warehouse.EditAsync(warehouse);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }
                
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_UPDATE;

            }catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> RemoverWarehouse(int warehouseId)
        {
            var reponse = new BaseResponse<bool>();
            try
            {
                var warehouse = await GetByWarehouseId(warehouseId);

                reponse.Data = await _unitOfWork.Warehouse.RemoveAsync(warehouseId);
                reponse.IsSuccess = true;
                reponse.Message = ReplyMessage.MESSAGE_DELETE;


            }catch(Exception e)
            {
                reponse.IsSuccess = false;
                reponse.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return reponse;
        }

    }
}
