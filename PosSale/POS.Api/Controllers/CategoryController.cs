using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using POS.Application.Commons.Base.Request;
using POS.Application.Dtos.Request;
using POS.Application.Service.Interfaces;
using POS.Utilities.Static;

namespace POS.Api.Controllers
{
    [Authorize] /// VALIDAD LA AUTENTICACION DEL TOKEN
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryApplication _categoryApplication;
        private readonly IGenerateExcelApplication _generateExcelApplication;

        public CategoryController(ICategoryApplication categoryApplication, IGenerateExcelApplication generateExcelApplication)
        {
            _categoryApplication = categoryApplication;
            _generateExcelApplication = generateExcelApplication;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAllCategoeries([FromQuery] BaseFiltersRequest request) 
        {
            var response = await _categoryApplication.ListCategories(request);
            if ((bool)request.Download!)
            {
                var columnNames = ExcelColumnNames.GetColumnsCategories();
                var fileBytes = _generateExcelApplication.GenerateToExcel(response.Data!, columnNames);
                return File(fileBytes, ContentType.ContentTypeExcel);
            }
            return Ok(response);
        }

        [HttpGet("select")]
        public async Task<IActionResult> GetSelectCategory()
        {
            var response = await _categoryApplication.ListSelectCategories();
            return Ok(response);
        }

        [HttpGet("{categoryId:int}")]
        public async Task<IActionResult> GetByCategoryId(int categoryId) 
        {
            var response = await _categoryApplication.GetByCategoryId(categoryId);
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> RegisterCategory([FromBody] CategoryRequestDto requestDto)
        {
            var response = await _categoryApplication.RegisterCategory(requestDto);
            return Ok(response);
        }

        [HttpPut("{categoryId:int}")]
        public async Task<IActionResult> EditByCategoryId(int categoryId, [FromBody] CategoryRequestDto requestDto)
        {
            var response = await _categoryApplication.EditByCategoryId(categoryId, requestDto);
            return Ok(response);
        }

        [HttpDelete("{categoryId:int}")]
        public async Task<IActionResult> DeleteByCategoryId(int categoryId)
        {
            var response = await _categoryApplication.RemoveByCategoryId(categoryId);
            return Ok(response);
        }

    }
}
