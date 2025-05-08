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
    public class PurcharseController : ControllerBase
    {
        private readonly IPurcharseApplication _purcharseApplication;
        private readonly IGenerateExcelApplication _generateExcelApplication;

        public PurcharseController(IPurcharseApplication purcharseApplication, IGenerateExcelApplication generateExcelApplication)
        {
            _purcharseApplication = purcharseApplication;
            _generateExcelApplication = generateExcelApplication;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListPurcharses([FromQuery] BaseFiltersRequest request) 
        {
            var response = await _purcharseApplication.ListPurcharses(request);
            if ((bool)request.Download!)
            {
                var fileName = ExcelColumnNames.GetColumnsPurcharses();
                var fileBytes = _generateExcelApplication.GenerateToExcel(response.Data!, fileName);
                return File(fileBytes, ContentType.ContentTypeExcel);
            }
            return Ok(response);
        }

        [HttpGet("{purcharseId:int}")]
        public async Task<IActionResult> GetByPurcharseId(int purcharseId)
        {
            var response = await _purcharseApplication.GetByPurcharsesId(purcharseId);
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> RegisterPurcharse([FromBody] PurcharseRequestDto requestDto)
        {
            var response = await _purcharseApplication.RegisterPurcharse(requestDto);
            return Ok(response);
        }

        [HttpPut("cancel/{purcharseId:int}")]
        public async Task<IActionResult> CancelByPurcharseId(int purcharseId)
        {
            var response = await _purcharseApplication.AnularByPurcharseId(purcharseId);
            return Ok(response);
        }
    }
}
