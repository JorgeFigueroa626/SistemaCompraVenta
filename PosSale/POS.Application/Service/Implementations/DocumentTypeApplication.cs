using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS.Application.Common.Bases.Response;
using POS.Application.Common.Odering;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Application.Service.Interfaces;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Message;

namespace POS.Application.Service.Implementations
{
    public class DocumentTypeApplication : IDocumentTypeApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOrderingQuery _orderingQuery;

        public DocumentTypeApplication(IUnitOfWork unitOfWork, IMapper mapper, IOrderingQuery orderingQuery)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _orderingQuery = orderingQuery;
        }

        public async Task<BaseResponse<IEnumerable<DocumentTypeResponseDto>>> ListDocumentTypes(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<DocumentTypeResponseDto>>();
            try
            {
                var documentTypes = _unitOfWork.DocumentType.GetAllQueryable();
                //var documentTypes = GetEnityQuery(p => p.AuditDeleteUser == null && p.AuditDeleteDate == null);

                if (request is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 0:
                            documentTypes = documentTypes.Where(p => p.Code!.Contains(request.TextFilter));
                            break;
                        case 1:
                            documentTypes = documentTypes.Where(p => p.Name!.Contains(request.TextFilter));
                            break;
                        case 2:
                            documentTypes = documentTypes.Where(p => p.Abbreviation!.Contains(request.TextFilter));
                            break;
                    }
                }

                if (request!.StateFilter is not null)
                {
                    documentTypes = documentTypes.Where(p => p.State.Equals(request.StateFilter));
                }
                if (!string.IsNullOrEmpty(request.StartDate) && !string.IsNullOrEmpty(request.EndDate))
                {
                    documentTypes = documentTypes.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate) && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate).AddDays(1));
                }

                if (request.Sort is not null) request.Sort = "Id";

                var items = _orderingQuery.Ordering(request, documentTypes, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await documentTypes.CountAsync();
                response.Data = _mapper.Map<IEnumerable<DocumentTypeResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public Task<BaseResponse<IEnumerable<SelectResponse>>> SelectDocumentTypes()
        {
            throw new NotImplementedException();
        }
        public Task<BaseResponse<DocumentTypeResponseDto>> GetByDocumentTypeId(int documentTypeId)
        {
            throw new NotImplementedException();
        }

        public Task<BaseResponse<bool>> RegisterDocumentType(DocumentTypeRequestDto requestDto)
        {
            throw new NotImplementedException();
        }
        public Task<BaseResponse<bool>> EditByDocumentTypeId(DocumentTypeRequestDto requestDto)
        {
            throw new NotImplementedException();
        }


        public Task<BaseResponse<bool>> RemoveByDocumentTypeId(int documentTypeId)
        {
            throw new NotImplementedException();
        }

    }
}
