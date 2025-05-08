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
using POS.Infrastructure.Persistences.FileStorage;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Message;
using POS.Utilities.Static;

namespace POS.Application.Service.Implementations
{
    public class ProductApplication : IProductApplication
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderingQuery _orderingQuery;
        private readonly IFileStorageLocalApplication _fileStorageLocal;
        private readonly IAzureStorage _azureStorage;

        public ProductApplication(IUnitOfWork unitOfWork, IMapper mapper, IOrderingQuery orderingQuery, IFileStorageLocalApplication fileStorageLocal, IAzureStorage azureStorage)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderingQuery = orderingQuery;
            _fileStorageLocal = fileStorageLocal;
            _azureStorage = azureStorage;
        }

        public async Task<BaseResponse<IEnumerable<ProductResponseDto>>> ListProducts(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<ProductResponseDto>>();
            try
            {
                var products = _unitOfWork.Product.GetAllQueryable()
                    .Include(p =>p.Category).AsQueryable();

                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            products = products.Where(c => c.Name!.Contains(request.TextFilter));
                            break;
                        case 2:
                            products = products.Where(c => c.Code!.Contains(request.TextFilter));
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
                response.Data = _mapper.Map<IEnumerable<ProductResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public async Task<BaseResponse<IEnumerable<SelectResponse>>> SelectProducts()
        {
            var response = new BaseResponse<IEnumerable<SelectResponse>>();
            try
            {
                var products = await _unitOfWork.Product.GetSelectAsync();
                if (products is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                response.IsSuccess = true;
                response.Data = _mapper.Map<IEnumerable<SelectResponse>>(products);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<ProductResponseDto>> GetByProductId(int productId)
        {
            var response = new BaseResponse<ProductResponseDto>();
            try
            {
                var product = await _unitOfWork.Product.GetByIdAsync(productId);
                if (product is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                response.IsSuccess = true;
                response.Data = _mapper.Map<ProductResponseDto>(product);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> RegisterProduct(ProductRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            using var transaction = _unitOfWork.BeginTransaction();
            try
            {
                var product = _mapper.Map<Product>(requestDto);
                if (requestDto.Image is not null)
                    product.Image = await _fileStorageLocal.SaveFile(AzureContainer.PRODUCTS, requestDto.Image);
                    //product.Image = await _azureStorage.SaveFile(AzureContainer.PRODUCTS, requestDto.Image!);

                await _unitOfWork.Product.RegisterAsync(product);
                var productId = product.Id;
                var warehouses = await _unitOfWork.Warehouse.GetAllAsync();

                await RegisterProductStockAsync(warehouses, productId);
                
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

        private async Task RegisterProductStockAsync(IEnumerable<Warehouse> warehouses, int productId)
        {
            foreach (var warehouse in warehouses)
            {
                var newProductStock = new ProductStock
                {
                    ProductId = productId,      //optiene el ID del producto que registra
                    WarehouseId = warehouse.Id, //optiene el ID del Almacen 
                    CurrentStock = 0,
                    PurchasePrice = 0
                };

                //registramos con un metodo generico
                await _unitOfWork.ProductStock.RegisterProductStock(newProductStock);
            }
        }

        public async Task<BaseResponse<bool>> EditByProductId(int productId, ProductRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var pathImageProduct = await GetByProductId(productId);
                var product = _mapper.Map<Product>(requestDto);

                //actualiza la imagen
                if (requestDto.Image is not null)
                    product.Image = await _fileStorageLocal.EditFile(AzureContainer.PRODUCTS, requestDto.Image, pathImageProduct.Data!.Image!);
                    //product.Image = await _azureStorage.EditFile(AzureContainer.PRODUCTS, requestDto.Image!, pathProduct.Data!.Image!);

                //si no quiere actualizar
                if (requestDto.Image is null) 
                    product.Image = pathImageProduct.Data!.Image;

                product.Id = productId;
                response.Data = await _unitOfWork.Product.EditAsync(product);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }

                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_UPDATE;

            }catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }


        public async Task<BaseResponse<bool>> DeleteByProductId(int productId)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var pathImageProduct = await GetByProductId(productId);
                response.Data = await _unitOfWork.Product.RemoveAsync(productId);

                await _fileStorageLocal.RemoveFile(pathImageProduct.Data!.Image!, AzureContainer.PRODUCTS);
                //await _azureStorage.RemoveFile(product.Data.Image!, AzureContainer.PRODUCTS);

                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_DELETE;

            }catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }



    }
}
