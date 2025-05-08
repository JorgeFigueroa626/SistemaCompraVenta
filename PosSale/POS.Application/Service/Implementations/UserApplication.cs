using AutoMapper;
using Microsoft.Extensions.Configuration;
using POS.Application.Common.Bases.Response;
using POS.Application.Dtos.Request;
using POS.Application.Service.Interfaces;
using POS.Domain.Entities;
using POS.Infrastructure.Persistences.FileStorage;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Utilities.Message;
using POS.Utilities.Static;
using BC = BCrypt.Net.BCrypt;

namespace POS.Application.Service.Implementations
{
    public class UserApplication : IUserApplication
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IAzureStorage _azureStorage;

        public UserApplication(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration config, IAzureStorage azureStorage)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;
            _azureStorage = azureStorage;
        }

        ///REGISTER
        public async Task<BaseResponse<bool>> RegisterUser(UserRequestDto requestDto)
        {
            var response = new BaseResponse<bool>();
            try
            {
                var account = _mapper.Map<User>(requestDto);
                account.Password = BC.HashPassword(account.Password);

                if (requestDto.Image is not null)
                {
                    account.Image = await _azureStorage.SaveFile(AzureContainer.USERS, requestDto.Image!);
                }

                response.Data = await _unitOfWork.User.RegisterAsync(account);

                if (response.Data)
                {
                    response.IsSuccess = true;
                    response.Message = ReplyMessage.MESSAGE_SAVE;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessage.MESSAGE_FAILED;
                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessage.MESSAGE_EXCEPTION;
            }
            return response;
        }

        

    }
}
