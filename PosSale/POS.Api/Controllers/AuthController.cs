using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using POS.Application.Dtos.Request;
using POS.Application.Service.Interfaces;

namespace POS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthApplication _authApplication;

        public AuthController(IAuthApplication authApplication)
        {
            _authApplication = authApplication;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] TokeRequestDto requestDto, [FromQuery] string authType)
        {
            var response = await _authApplication.Login(requestDto, authType);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("login-google")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] string credentiales, [FromQuery] string authType)
        {
            var response = await _authApplication.LoginWithGoogle(credentiales, authType);
            return Ok(response);
        }
    }
}
