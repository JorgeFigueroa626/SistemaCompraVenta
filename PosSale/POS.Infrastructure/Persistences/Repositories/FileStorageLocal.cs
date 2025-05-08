using Microsoft.AspNetCore.Http;
using POS.Infrastructure.Persistences.FileStorage;

namespace POS.Infrastructure.Persistences.Repositories
{
    public class FileStorageLocal : IFileStorageLocal
    {
        public async Task<string> SaveFile(string container, IFormFile file, string webRootPath, string scheme, string host)
        {
            //nombre del archivo - con extension
            var extension = Path.GetExtension(file.FileName);
            //unimos numeros aleatorio al nombre del archivo
            var fileName = $"{Guid.NewGuid()}{extension}";
            //directorio del archivo, con su nombre
            string folder = Path.Combine(webRootPath, container);

            //verifica si existe, para crearlo o no
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            //ruta para guardar el archivo
            string path = Path.Combine(folder, fileName);
            //lo guarda en memoria local
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream); ;
                var content = memoryStream.ToArray();
                await File.WriteAllBytesAsync(path, content);
            }
            //creamos la url local
            var currentUrl = $"{scheme}://{host}";
            //integramos el archivo a url, para su contenido del archivo
            var pathDb = Path.Combine(currentUrl, container, fileName).Replace('\\', '/');
            return pathDb;
        }

        public async Task<string> EditFile(string container, IFormFile file, string route, string webRootPath, string scheme, string host)
        {
            await RemoveFile(route, container ,webRootPath);
            return await SaveFile(container, file, webRootPath, scheme, host);
        }

        public Task RemoveFile(string route, string container, string webRootPath)
        {
            if(string.IsNullOrEmpty(route))
                return Task.CompletedTask;

            //optenemos el nombre del archivo, de la ruta
            var fileName = Path.GetFileName(route);
            //optenemos el directorio del archivo
            var directoryFile = Path.Combine(webRootPath, container, fileName);

            //eliminamos el archivo
            if(File.Exists(directoryFile))
                File.Delete(directoryFile);
            
            return Task.CompletedTask;
        }

    }
}
