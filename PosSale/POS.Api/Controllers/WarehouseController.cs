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
    public class WarehouseController : ControllerBase
    {
        private readonly IWarehouseApplication _warehouseApplication;
        private readonly IGenerateExcelApplication _generateExcelApplication;

        public WarehouseController(IWarehouseApplication warehouseApplication, IGenerateExcelApplication generateExcelApplication)
        {
            _warehouseApplication = warehouseApplication;
            _generateExcelApplication = generateExcelApplication;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListWarehouses([FromQuery] BaseFiltersRequest request) 
        {
            var response = await _warehouseApplication.ListWarehouses(request);
            if ((bool)request.Download!)
            {
                var columName = ExcelColumnNames.GetColumnsWarehouses();
                var fileType = _generateExcelApplication.GenerateToExcel(response.Data!, columName);
                return File(fileType, ContentType.ContentTypeExcel);
            }
            return Ok(response);
        }

        [HttpGet("select")]
        public async Task<IActionResult> SelectWarehouses()
        {
            var response = await _warehouseApplication.SelectWarehouses();
            return Ok(response);
        }

        [HttpGet("{warehouseId:int}")]
        public async Task<IActionResult> GetByWarehouseId(int warehouseId) 
        {
            var response = await _warehouseApplication.GetByWarehouseId(warehouseId);
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> RegisterWarehouse([FromBody] WarehouseRequestDto requestDto)
        {
            var response = await _warehouseApplication.RegisterWarehouse(requestDto);
            return Ok(response);
        }

        [HttpPut("{warehouseId:int}")]
        public async Task<IActionResult> EditByWarehouseId(int warehouseId, [FromBody] WarehouseRequestDto requestDto) 
        {
            var response = await _warehouseApplication.EditWarehouse(warehouseId, requestDto);
            return Ok(response);
        }

        [HttpDelete("{warehouseId:int}")]
        public async Task<IActionResult> DeleteByWarehouseId(int warehouseId)
        {
            var response  = await _warehouseApplication.RemoverWarehouse(warehouseId);
            return Ok(response);
        }
    }
}
