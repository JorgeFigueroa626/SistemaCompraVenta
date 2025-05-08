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
    public class VoucherDocumentTypeApplication : IVoucherDocumentTypeApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderingQuery _orderingQuery;

        public VoucherDocumentTypeApplication(IUnitOfWork unitOfWork, IMapper mapper, IOrderingQuery orderingQuery)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderingQuery = orderingQuery;
        }


        public async Task<BaseResponse<IEnumerable<VoucherDocumentTypeResponseDto>>> ListVoucherDocumentTypes(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<VoucherDocumentTypeResponseDto>>();
            try
            {
                var voucherDoc = _unitOfWork.VoucherDocumentType.GetAllQueryable();
                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            voucherDoc = voucherDoc.Where(c => c.Description!.Contains(request.TextFilter));
                            break;
                    }
                }

                if (request.StateFilter is not null)
                {
                    voucherDoc = voucherDoc.Where(c => c.State.Equals(request.StateFilter));
                }

                if (!string.IsNullOrEmpty(request.StartDate) && !string.IsNullOrEmpty(request.EndDate))
                {
                    voucherDoc = voucherDoc.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate) && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate).AddDays(1));
                }

                if (request.Sort is null) request.Sort = "Id";

                //listado de filtros
                var items = await _orderingQuery.Ordering(request, voucherDoc, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await voucherDoc.CountAsync();
                response.Data = _mapper.Map<IEnumerable<VoucherDocumentTypeResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public async Task<BaseResponse<IEnumerable<SelectResponse>>> SelectVoucherDocumentTypes()
        {
            var response = new BaseResponse<IEnumerable<SelectResponse>>();
            try
            {
                var vouchers = await _unitOfWork.VoucherDocumentType.GetSelectAsync();
                if (vouchers is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                response.IsSuccess = true;
                response.Data = _mapper.Map<IEnumerable<SelectResponse>>(vouchers);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public async Task<BaseResponse<VoucherDocumentTypeResponseDto>> GetByVoucherDocumentTypeId(int voucherDocumentTypeId)
        {
            var response = new BaseResponse<VoucherDocumentTypeResponseDto>();
            try
            {
                var voucher = await _unitOfWork.VoucherDocumentType.GetByIdAsync(voucherDocumentTypeId);
                if (voucher is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }
                response.IsSuccess = true;
                response.Data = _mapper.Map<VoucherDocumentTypeResponseDto>(voucher);   
                response.Message = ReplyMessage.MESSAGE_QUERY;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> RegisterVoucherDocumentType(VoucherDocumentTypeRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var voucher = _mapper.Map<VoucherDocumentType>(requestDto);
                response.Data = await _unitOfWork.VoucherDocumentType.RegisterAsync(voucher);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }

                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_SAVE;

            }
            catch(Exception e)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> EditByVoucherDocumentTypeId(int voucherDocumentTypeId, VoucherDocumentTypeRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var vouchers = await GetByVoucherDocumentTypeId(voucherDocumentTypeId);
                var voucher = _mapper.Map<VoucherDocumentType>(requestDto); 
                voucher.Id = voucherDocumentTypeId;
                response.Data = await _unitOfWork.VoucherDocumentType.EditAsync(voucher);
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

        public async Task<BaseResponse<bool>> RemoverByVoucherDocumentTypeId(int voucherDocumentTypeId)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var vouchers = await GetByVoucherDocumentTypeId(voucherDocumentTypeId);
                response.Data = await _unitOfWork.VoucherDocumentType.RemoveAsync(voucherDocumentTypeId);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }
                response.IsSuccess = true;
                response.Message = ReplyMessage.MESSAGE_DELETE;
            }catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

    }
}
