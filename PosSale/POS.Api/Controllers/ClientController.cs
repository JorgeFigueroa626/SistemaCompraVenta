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
    public class ClientController : ControllerBase
    {
        private readonly IClientApplication _clientApplication;
        private readonly IGenerateExcelApplication _generateExcelApplication;

        public ClientController(IClientApplication clientApplication, IGenerateExcelApplication generateExcelApplication)
        {
            _clientApplication = clientApplication;
            _generateExcelApplication = generateExcelApplication;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListClients([FromQuery] BaseFiltersRequest request) 
        { 
            var response = await _clientApplication.ListClients(request);
            if ((bool)request.Download!)
            {
                var columnName = ExcelColumnNames.GetColumnsClients();
                var fileBytes = _generateExcelApplication.GenerateToExcel(response.Data!, columnName);
                return File(fileBytes, ContentType.ContentTypeExcel);
            }
            return Ok(response);
        }

        [HttpGet("select")]
        public async Task<IActionResult> SelectClients()
        {
            var response = await _clientApplication.SelectClients();
            return Ok(response);
        }

        [HttpGet("{clientId:int}")]
        public async Task<IActionResult> GetByClientId(int clientId)
        {
            var response = await _clientApplication.GetByClientId(clientId);
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> RegisterClient([FromBody] ClientRequestDto requestDto)
        {
            var response = await _clientApplication.RegisterClient(requestDto);
            return Ok(response);
        }

        [HttpPut("{clientId:int}")]
        public async Task<IActionResult> EdictByClientId(int clientId, [FromBody] ClientRequestDto requestDto)
        {
            var response = await _clientApplication.EditClient(clientId, requestDto);
            return Ok(response);
        }

        [HttpDelete("{clientId:int}")]
        public async Task<IActionResult> RemoverByClientId(int clientId)
        {
            var response = await _clientApplication.DeleteClient(clientId);
            return Ok(response);
        }

    }
}
