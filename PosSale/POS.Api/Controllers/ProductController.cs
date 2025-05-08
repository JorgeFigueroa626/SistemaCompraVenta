using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using POS.Application.Commons.Base.Request;
using POS.Application.Dtos.Request;
using POS.Application.Service.Interfaces;
using POS.Utilities.Static;

namespace POS.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductApplication _productApplication;
        private readonly IGenerateExcelApplication _generateExcelApplication;
        private readonly IProductStockApplication _productStockApplication;

        public ProductController(IProductApplication productApplication, IGenerateExcelApplication generateExcelApplication, IProductStockApplication productStockApplication)
        {
            _productApplication = productApplication;
            _generateExcelApplication = generateExcelApplication;
            _productStockApplication = productStockApplication;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListProducts([FromQuery] BaseFiltersRequest request) 
        {
            var response = await _productApplication.ListProducts(request);
            if ((bool)request.Download!)
            {
                var columnName = ExcelColumnNames.GetColumnsProducts();
                var fileType = _generateExcelApplication.GenerateToExcel(response.Data!, columnName);
                return File(fileType, ContentType.ContentTypeExcel);
            }
            return Ok(response);
        }

        [HttpGet("select")]
        public async Task<IActionResult> SelectProducts()
        {
            var response = await _productApplication.SelectProducts();
            return Ok(response);
        }

        [HttpGet("{productId:int}")]
        public async Task<IActionResult> GetByProductId(int productId)
        {
            var response = await _productApplication.GetByProductId(productId);
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> RegisterProduct([FromForm] ProductRequestDto requestDto) 
        {
            var response = await _productApplication.RegisterProduct(requestDto);
            return Ok(response);
        }

        [HttpPut("{productId:int}")]
        public async Task<IActionResult> EditByProductId(int productId, [FromForm] ProductRequestDto requestDto)
        {
            var response = await _productApplication.EditByProductId(productId, requestDto);
            return Ok(response);
        }

        [HttpDelete("{productId:int}")]
        public async Task<IActionResult> RemoverByProductId(int productId)
        {
            var response = await _productApplication.DeleteByProductId(productId);
            return Ok(response);
        }

        [HttpGet("GetProductStockByProductId/{productId:int}")]
        public async Task<IActionResult> GetProductStockByWarehouseByProductId(int productId)
        {
            var response = await _productStockApplication.GetProductStockByWarehouseAsync(productId);
            return Ok(response);
        }
    }
}
