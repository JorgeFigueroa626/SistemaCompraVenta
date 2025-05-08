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
    public class ProviderController : ControllerBase
    {
        private readonly IProviderApplication _providerApplication;
        private readonly IGenerateExcelApplication _generateExcelApplication;

        public ProviderController(IProviderApplication providerApplication, IGenerateExcelApplication generateExcelApplication)
        {
            _providerApplication = providerApplication;
            _generateExcelApplication = generateExcelApplication;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListProviders([FromQuery] BaseFiltersRequest request) 
        {
            var response = await _providerApplication.ListProviders(request);
            if ((bool)request.Download!)
            {
                var columnNames = ExcelColumnNames.GetColumnsProviders();
                var fileBytes = _generateExcelApplication.GenerateToExcel(response.Data!, columnNames);
                return File(fileBytes, ContentType.ContentTypeExcel);
            }
            return Ok(response);
        }

        [HttpGet("select")]
        public async Task<IActionResult> GetSelectProviders()
        {
            var response = await _providerApplication.SelectProviders();
            return Ok(response);
        }

        [HttpGet("{providerId:int}")]
        public async Task<IActionResult> GetByProviderBy(int providerId)
        {
            var response = await _providerApplication.GetByProviderId(providerId);
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> RegisterProvider([FromBody] ProviderRequestDto requestDto)
        {
            var response = await _providerApplication.RegisterProvider(requestDto);
            return Ok(response);
        }

        [HttpPut("{providerId:int}")]
        public async Task<IActionResult> EditByProviderId(int providerId, [FromBody] ProviderRequestDto requestDto)
        {
            var response = await _providerApplication.EditByProviderId(providerId, requestDto);
            return Ok(response);
        }

        [HttpDelete("{providerId:int}")]
        public async Task<IActionResult> DeleteByProviderId(int providerId)
        {
            var response = await _providerApplication.DeleteProvider(providerId);
            return Ok(response);
        }
    }
}
