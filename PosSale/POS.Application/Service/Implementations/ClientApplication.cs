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
    public class ClientApplication : IClientApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderingQuery _orderingQuery;

        public ClientApplication(IUnitOfWork unitOfWork, IMapper mapper, IOrderingQuery orderingQuery)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderingQuery = orderingQuery;
        }



        public async Task<BaseResponse<IEnumerable<ClientResponseDto>>> ListClients(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<ClientResponseDto>>();
            try
            {
                var clients = _unitOfWork.Client.GetAllQueryable()
                    .Include(c => c.DocumentType)
                    .AsQueryable();

                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            clients = clients.Where(c => c.Name!.Contains(request.TextFilter));
                            break;
                        case 2:
                            clients = clients.Where(c => c.Email!.Contains(request.TextFilter));
                            break;
                        case 3:
                            clients = clients.Where(c => c.DocumentNumber!.Contains(request.TextFilter));
                            break;
                    }
                }

                if (request.StateFilter is not null)
                {
                    clients = clients.Where(c => c.State.Equals(request.StateFilter));
                }

                if (!string.IsNullOrEmpty(request.StartDate) && !string.IsNullOrEmpty(request.EndDate))
                {
                    clients = clients.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate) && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate).AddDays(1));
                }

                if (request.Sort is null) request.Sort = "Id";

                //listado de filtros
                var items = await _orderingQuery.Ordering(request, clients, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await clients.CountAsync();
                response.Data = _mapper.Map<IEnumerable<ClientResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        
        public async Task<BaseResponse<IEnumerable<SelectResponse>>> SelectClients()
        {
            var response = new BaseResponse<IEnumerable<SelectResponse>>();
            try
            {
                var clients = await _unitOfWork.Client.GetSelectAsync();
                if (clients is null)
                {
                    response.IsSuccess = true;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }
                response.IsSuccess = true;
                response.Data = _mapper.Map<IEnumerable<SelectResponse>>(clients);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<ClientByIdResponseDto>> GetByClientId(int clientId)
        {
            var response = new BaseResponse<ClientByIdResponseDto>();
            try
            {
                var client = await _unitOfWork.Client.GetByIdAsync(clientId);
                if (client is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                response.IsSuccess = true;
                response.Data = _mapper.Map<ClientByIdResponseDto>(client);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception e)
            {
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> RegisterClient(ClientRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var client = _mapper.Map<Client>(requestDto);
                response.Data = await _unitOfWork.Client.RegisterAsync(client);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_SAVE;

            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> EditClient(int clientId, ClientRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var clientIds = await GetByClientId(clientId);
                var client = _mapper.Map<Client>(requestDto);
                client.Id = clientId;
                response.Data = await _unitOfWork.Client.EditAsync(client);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_UPDATE;

            }
            catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public async Task<BaseResponse<bool>> DeleteClient(int clientId)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var clientIds = await _unitOfWork.Client.GetByIdAsync(clientId);
                response.Data = await _unitOfWork.Client.RemoveAsync(clientId);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_DELETE;
            }
            catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }


    }
}
