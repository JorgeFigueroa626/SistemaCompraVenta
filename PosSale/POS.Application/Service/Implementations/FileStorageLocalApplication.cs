using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using POS.Application.Service.Interfaces;
using POS.Infrastructure.Persistences.FileStorage;

namespace POS.Application.Service.Implementations
{
    public class FileStorageLocalApplication : IFileStorageLocalApplication
    {
        private readonly IFileStorageLocal _fileStorageLocal;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FileStorageLocalApplication(IFileStorageLocal fileStorageLocal, IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            _fileStorageLocal = fileStorageLocal;
            _env = env;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> SaveFile(string container, IFormFile file)
        {
            var webRootPath = _env.WebRootPath;
            var sheme = _httpContextAccessor.HttpContext!.Request.Scheme;
            var host = _httpContextAccessor.HttpContext.Request.Host;
            return await _fileStorageLocal.SaveFile(container, file, webRootPath, sheme, host.Value);
        }

        public async Task<string> EditFile(string container, IFormFile file, string route)
        {
            var webRootPath = _env.WebRootPath;
            var sheme = _httpContextAccessor.HttpContext!.Request.Scheme;
            var host = _httpContextAccessor.HttpContext.Request.Host;
            return await _fileStorageLocal.EditFile(container, file, route, webRootPath, sheme, host.Value);    
        }

        public async Task RemoveFile(string route, string container)
        {
            var webRootPath = _env.WebRootPath;
            await _fileStorageLocal.RemoveFile(route, container, webRootPath);
        }

    }
}
