using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS.Application.Commons.Base.Request;
using POS.Application.Dtos.Request;
using POS.Application.Service.Interfaces;
using POS.Utilities.Static;

namespace POS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleApplication _saleApplication;
        private readonly IGenerateExcelApplication _generateExcelApplication;

        public SaleController(ISaleApplication saleApplication, IGenerateExcelApplication generateExcelApplication)
        {
            _saleApplication = saleApplication;
            _generateExcelApplication = generateExcelApplication;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListSales([FromQuery] BaseFiltersRequest request) 
        {
            var response = await _saleApplication.ListSales(request);
            if ((bool)request.Download!)
            {
                var columnName = ExcelColumnNames.GetColumnsSales();
                var fileBytes = _generateExcelApplication.GenerateToExcel(response.Data!, columnName);
                return File(fileBytes, ContentType.ContentTypeExcel);
            }
            return Ok(response);
        }

        [HttpGet("{saleId:int}")]
        public async Task<IActionResult> GetBySaleId(int saleId)
        {
            var response = await _saleApplication.GetBySaleId(saleId);
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> RegisterSale([FromBody] SaleRequestDto requestDto)
        {
            var response = await _saleApplication.RegisterSale(requestDto);
            return Ok(response);
        }

        [HttpPut("cancel/{saleId:int}")]
        public async Task<IActionResult> AnularBySaleId(int saleId)
        {
            var response = await _saleApplication.AnularSaleById(saleId);
            return Ok(response);
        }

        [HttpGet("ProductStockByWarehouseId")]
        public async Task<IActionResult> GetListProductStocksByWarehouseId([FromQuery] BaseFiltersRequest request)
        {
            var response = await _saleApplication.GetProductStockByWarehouseId(request);
            return Ok(response);
        }
    }
}
