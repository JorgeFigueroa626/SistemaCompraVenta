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
    public class ProviderApplication : IProviderApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderingQuery _orderingQuery;

        public ProviderApplication(IUnitOfWork unitOfWork, IMapper mapper, IOrderingQuery orderingQuery)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderingQuery = orderingQuery;
        }
        public async Task<BaseResponse<IEnumerable<ProviderResponseDto>>> ListProviders(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<ProviderResponseDto>>();
            try
            {
                var providers = _unitOfWork.Provider.GetAllQueryable()
                    .Include(p =>p.DocumentType) //INCLUIMOS EL DOCUMENT TYPE EN EL LLAMADO
                    .AsQueryable();

                /*var providers = GetEnityQuery(p => p.AuditDeleteUser == null && p.AuditDeleteDate == null)
                            .Include(p => p.DocumentType) //INCLUIMOS EL DOCUMENT TYPE EN EL LLAMADO
                            .AsNoTracking();*/

                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            providers = providers.Where(p => p.Name.Contains(request.TextFilter));
                            break;
                        case 2:
                            providers = providers.Where(p => p.Email.Contains(request.TextFilter));
                            break;
                        case 3:
                            providers = providers.Where(p => p.DocumentNumber.Contains(request.TextFilter));
                            break;
                    }
                }

                if (request.StateFilter is not null)
                {
                    providers = providers.Where(p => p.State.Equals(request.StateFilter));
                }

                if (request.StartDate is not null && request.EndDate is not null)
                {
                    providers = providers.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate)
                                                && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate)
                                                .AddDays(1));
                }

                //if (request.Sort is null) request.Sort = "Id";
                request.Sort ??= "Id";

                //listado de filtros
                var items = _orderingQuery.Ordering(request, providers, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await providers.CountAsync();
                response.Data = _mapper.Map<IEnumerable<ProviderResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch(Exception ex)
            {
                response.IsSuccess =false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<ProviderResponseDto>> GetByProviderId(int providerId)
        {
            var response = new BaseResponse<ProviderResponseDto>();
            try
            {
                var provider = await _unitOfWork.Provider.GetByIdAsync(providerId);
                if (provider is not null)
                {
                    response.IsSuccess = true;
                    response.Data = _mapper.Map<ProviderResponseDto>(provider);
                    response.Message = ReplyMessage.MESSAGE_QUERY;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                }

            }catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        
        public async Task<BaseResponse<IEnumerable<SelectResponse>>> SelectProviders()
        {
            var response = new BaseResponse<IEnumerable<SelectResponse>>();
            try
            {
                var providers = await _unitOfWork.Provider.GetSelectAsync();
                if (providers is not null)
                {
                    response.IsSuccess = true;
                    response.Data = _mapper.Map<IEnumerable<SelectResponse>>(providers);
                    response.Message = ReplyMessage.MESSAGE_QUERY;
                }

            }catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }


        public async Task<BaseResponse<bool>> RegisterProvider(ProviderRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var provider = _mapper.Map<Provider>(requestDto);
                response.Data = await _unitOfWork.Provider.RegisterAsync(provider);

                if (response.Data)
                {
                    response.IsSuccess = true;
                    response.Message = ReplyMessage.MESSAGE_SAVE;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                }

            }catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }



        public async Task<BaseResponse<bool>> EditByProviderId(int providerId,ProviderRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var providerEdit = await GetByProviderId(providerId);
                if (providerEdit.Data is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                var provider = _mapper.Map<Provider>(requestDto);
                provider.Id = providerId;
                response.Data = await _unitOfWork.Provider.EditAsync(provider);
                if (response.Data)
                {
                    response.IsSuccess = true;
                    response.Message = ReplyMessage.MESSAGE_UPDATE;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                }

            }catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> DeleteProvider(int providerId)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var provider = await GetByProviderId(providerId);
                if (provider.Data == null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                response.Data = await _unitOfWork.Provider.RemoveAsync(providerId);
                if (response.Data)
                {
                    response.IsSuccess = true;
                    response.Message = ReplyMessage.MESSAGE_DELETE;
                }

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
