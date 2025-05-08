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
    public class VoucherDocumentTypeController : ControllerBase
    {
        private readonly IVoucherDocumentTypeApplication _voucherDocumentType;
        private readonly IGenerateExcelApplication _generateExcelApplication;

        public VoucherDocumentTypeController(IVoucherDocumentTypeApplication voucherDocumentType, IGenerateExcelApplication generateExcelApplication)
        {
            _voucherDocumentType = voucherDocumentType;
            _generateExcelApplication = generateExcelApplication;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListVoucherDocumentTypes([FromQuery] BaseFiltersRequest request) 
        {
            var response = await _voucherDocumentType.ListVoucherDocumentTypes(request);
            if ((bool)request.Download!)
            {
                var columnName = ExcelColumnNames.GetColumnsClients();  ///xxxx
                var fileBytes = _generateExcelApplication.GenerateToExcel(response.Data!, columnName);
                return File(fileBytes, ContentType.ContentTypeExcel);
            }
            return Ok(response);
        }

        [HttpGet("select")]
        public async Task<IActionResult> SelectVoucherDocumentTys()
        {
            var response = await _voucherDocumentType.SelectVoucherDocumentTypes();
            return Ok(response);
        }

        [HttpGet("{voucherDocId:int}")]
        public async Task<IActionResult> GetByVoucherDocumentTypeId(int voucherDocId)
        {
            var response = await _voucherDocumentType.GetByVoucherDocumentTypeId(voucherDocId); 
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Register([FromBody] VoucherDocumentTypeRequestDto requestDto)
        {
            var response = await _voucherDocumentType.RegisterVoucherDocumentType(requestDto);
            return Ok(response);
        }

        [HttpPut("{voucherDocId:int}")]
        public async Task<IActionResult> EditById(int voucherDocId, [FromBody] VoucherDocumentTypeRequestDto requestDto) 
        { 
            var response = await _voucherDocumentType.EditByVoucherDocumentTypeId(voucherDocId, requestDto);    
            return Ok(response);
        }

        [HttpDelete("{voucherDocId:int}")]
        public async Task<IActionResult> RemoverById(int voucherDocId)
        {
            var response = await _voucherDocumentType.RemoverByVoucherDocumentTypeId(voucherDocId);
            return Ok(response);
        }


    }
}
