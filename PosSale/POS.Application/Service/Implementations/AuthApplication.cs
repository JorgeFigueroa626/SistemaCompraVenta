using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using POS.Application.Common.Bases.Response;
using POS.Application.Dtos.Request;
using POS.Application.Service.Interfaces;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Message;
using POS.Utilities.Static;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BC = BCrypt.Net.BCrypt;

namespace POS.Application.Service.Implementations
{
    public class AuthApplication : IAuthApplication
    {
        private readonly IUnitOfWork _unitOfWorK;
        private readonly IConfiguration _config;
        private readonly AppSettings _appSettings;

        public AuthApplication(IUnitOfWork unitOfWorK, IConfiguration config, IOptions<AppSettings> appSettings)
        {
            _unitOfWorK = unitOfWorK;
            _config = config;
            _appSettings = appSettings.Value;
        }

        public async Task<BaseResponse<string>> Login(TokeRequestDto requestDto, string authType)
        {
            var response = new BaseResponse<string>();
            try
            {
                var email= await _unitOfWorK.User.UserByEmail(requestDto.Email!);

                if (email is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_TOKEN_ERROR;
                    return response;
                }

                if (email.AuthType != authType)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_AUTH_TYPE_GOOGLE;
                    return response;
                }

                if (BC.Verify(requestDto.Password, email.Password))
                {
                    response.IsSuccess = true;
                    response.Data = GenerateToken(email);
                    response.Message = ReplyMessage.MESSAGE_TOKEN;
                    return response;
                }
            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }

            return response;
        }

        public async Task<BaseResponse<string>> LoginWithGoogle(string credential, string authType)
        {
            var response = new BaseResponse<string>();
            try 
            {
                //paremetrizamos u integramos la api de Google
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>
                    {
                        _appSettings.ClientId!
                    }
                };

                //integramos la api y las credeneciales de usuario en Google
                var playload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);
                //buscamos por las credenciales del email
                var user = await _unitOfWorK.User.UserByEmail(playload.Email);
                if (user is null)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_GOOGLE_ERROR; 
                    return response;
                }

                if (user.AuthType != authType)
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_AUTH_TYPE;
                    return response;
                }

                response.IsSuccess = true;
                response.Data = GenerateToken(user);
                response.Message = ReplyMessage.MESSAGE_TOKEN;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }

            return response;
        }



        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Email!),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.UserName!),
                new Claim(JwtRegisteredClaimNames.GivenName, user.Email!),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, Guid.NewGuid().ToString(), ClaimValueTypes.Integer64)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(int.Parse(_config["Jwt:Expires"])),
                notBefore: DateTime.UtcNow,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
