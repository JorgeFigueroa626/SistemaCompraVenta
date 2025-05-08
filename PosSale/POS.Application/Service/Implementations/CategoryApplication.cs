using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS.Application.Common.Bases.Response;
using POS.Application.Common.Odering;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;
using POS.Application.Service.Interfaces;
using POS.Application.Validators.Category;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Message;

namespace POS.Application.Service.Implementations
{
    public class CategoryApplication : ICategoryApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly CategoryValidator _validations;
        private readonly IOrderingQuery _orderingQuery;

        public CategoryApplication(IUnitOfWork unitOfWork, IMapper mapper, CategoryValidator validations, IOrderingQuery orderingQuery)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _validations = validations;
            _orderingQuery = orderingQuery;
        }

        public async Task<BaseResponse<IEnumerable<CategoryResponseDto>>> ListCategories(BaseFiltersRequest request)
        {
            var response = new BaseResponse<IEnumerable<CategoryResponseDto>>();
            try
            {
                var categories = _unitOfWork.Category.GetAllQueryable();
                /*var categories = GetEnityQuery(c => c.AuditDeleteUser == null && c.AuditDeleteDate == null);*/

                if (request.NumFilter is not null && !string.IsNullOrEmpty(request.TextFilter))
                {
                    switch (request.NumFilter)
                    {
                        case 1:
                            categories = categories.Where(c => c.Name!.Contains(request.TextFilter));
                            break;
                        case 2:
                            categories = categories.Where(c => c.Description!.Contains(request.TextFilter));
                            break;
                    }
                }

                if (request.StateFilter is not null)
                {
                    categories = categories.Where(c => c.State.Equals(request.StateFilter));
                }

                if (!string.IsNullOrEmpty(request.StartDate) && !string.IsNullOrEmpty(request.EndDate))
                {
                    categories = categories.Where(x => x.AuditCreateDate >= Convert.ToDateTime(request.StartDate) && x.AuditCreateDate <= Convert.ToDateTime(request.EndDate).AddDays(1));
                }

                if (request.Sort is null) request.Sort = "Id";

                //listado de filtros
                var items = await _orderingQuery.Ordering(request, categories, !(bool)request.Download!).ToListAsync();

                response.IsSuccess = true;
                response.TotalRecords = await categories.CountAsync();
                response.Data = _mapper.Map<IEnumerable<CategoryResponseDto>>(items);
                response.Message = ReplyMessage.MESSAGE_QUERY;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<IEnumerable<SelectResponse>>> ListSelectCategories()
        {
            var response = new BaseResponse<IEnumerable<SelectResponse>>();
            try
            {
                var categories = await _unitOfWork.Category.GetSelectAsync();
                if (categories is not null)
                { 
                    response.IsSuccess = true;
                    response.Data = _mapper.Map<IEnumerable<SelectResponse>>(categories);
                    response.Message = ReplyMessage.MESSAGE_QUERY;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                }

            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public async Task<BaseResponse<CategoryResponseDto>> GetByCategoryId(int categoryId)
        {
            var response = new BaseResponse<CategoryResponseDto>();
            try
            {
                var category = await _unitOfWork.Category.GetByIdAsync(categoryId);
                if (category is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                }
                    response.IsSuccess = true;
                    response.Data = _mapper.Map<CategoryResponseDto>(category);
                    response.Message = ReplyMessage.MESSAGE_QUERY;
               

            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        public async Task<BaseResponse<bool>> RegisterCategory(CategoryRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var validator = await _validations.ValidateAsync(requestDto);
                if (!validator.IsValid)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_VALIDATE;
                    response.Errors = validator.Errors;
                    return response;
                }

                var category = _mapper.Map<Category>(requestDto);
                response.Data = await _unitOfWork.Category.RegisterAsync(category);
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

            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
        public async Task<BaseResponse<bool>> EditByCategoryId(int categoryId, CategoryRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var categoryEdit = await GetByCategoryId(categoryId);
                if (categoryEdit.Data is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_QUERY_EMPTY;
                    return response;
                }

                var category = _mapper.Map<Category>(requestDto);
                category.Id = categoryId;
                response.Data = await _unitOfWork.Category.EditAsync(category);
                if (response.Data)
                {
                    response.IsSuccess = true;
                    response.Message = ReplyMessage.MESSAGE_UPDATE;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }

            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;

        }

        public async Task<BaseResponse<bool>> RemoveByCategoryId(int categoryId)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var category = await GetByCategoryId(categoryId);

                response.Data = await _unitOfWork.Category.RemoveAsync(categoryId);
                if (!response.Data)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                    return response;
                }
                    response.IsSuccess = true;
                    response.Message = ReplyMessage.MESSAGE_DELETE;
                

            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }
    }
}
