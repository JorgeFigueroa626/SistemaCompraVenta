using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using POS.Infrastructure.Persistences.FileStorage;

namespace POS.Infrastructure.Persistences.Repositories
{
    public class AzureStorage : IAzureStorage
    {
        private readonly string _connectionAzure;

        public AzureStorage(IConfiguration configuration)
        {
            _connectionAzure = configuration.GetConnectionString("AzureStorage");
        }

        public async Task<string> SaveFile(string container, IFormFile file)
        {
            //conexion de la api AZURE y creacion de la ubicacion del archivo
            var client = new BlobContainerClient(_connectionAzure, container);
            //verificacmos la existencia
            await client.CreateIfNotExistsAsync();
            //validamos de acceso publico
            await client.SetAccessPolicyAsync(PublicAccessType.Blob);
            //optenemos la extension del archivo
            var extension = Path.GetExtension(file.Name);
            //generamos codigo aleatorio para el nombre del archvo
            var fileName = $"{Guid.NewGuid()}{extension}";
            //integramos el archivo a la api AZURE
            var blob = client.GetBlobClient(fileName);
            //y lo subimos a AZURE
            await blob.UploadAsync(file.OpenReadStream());
            //pedimos que nos retorne la URL 
            return blob.Uri.ToString();


        }

        public async Task<string> EditFile(string container, IFormFile file, string route)
        {
            await RemoveFile(route, container);
            return await SaveFile(container, file);
        }

        public async Task RemoveFile(string route, string container)
        {
            //verificamos la ruta existente
            if (string.IsNullOrEmpty(route))
            {
                return;
            }
            //conexion y ubicacion del contenido
            var client = new BlobContainerClient(_connectionAzure, container);
            //verificacmos la existencia
            await client.CreateIfNotExistsAsync();
            //optenemos la ruta del archivo
            var file = Path.GetFileName(route);
            //integramos o obtenemos el archivo en el AZURE
            var blob = client.GetBlobClient(file);
            //se elimina
            await blob.DeleteIfExistsAsync();
        }

    }
}
