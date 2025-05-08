using POS.Application.Common.Bases.Response;
using POS.Application.Commons.Base.Request;
using POS.Application.Commons.Base.Response;
using POS.Application.Dtos.Request;
using POS.Application.Dtos.Response;


namespace POS.Application.Service.Interfaces
{
    public interface ICategoryApplication
    {
        Task<BaseResponse<IEnumerable<CategoryResponseDto>>> ListCategories(BaseFiltersRequest request);
        Task<BaseResponse<IEnumerable<SelectResponse>>> ListSelectCategories();
        Task<BaseResponse<CategoryResponseDto>> GetByCategoryId(int categoryId);
        Task<BaseResponse<bool>> RegisterCategory(CategoryRequestDto requestDto);
        Task<BaseResponse<bool>> EditByCategoryId(int categoryId, CategoryRequestDto requestDto);
        Task<BaseResponse<bool>> RemoveByCategoryId(int categoryId);
    }
}
