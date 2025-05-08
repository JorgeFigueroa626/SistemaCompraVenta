using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using POS.Infrastructure.FileExcel;
using POS.Infrastructure.Persistences.Contexts;
using POS.Infrastructure.Persistences.FileStorage;
using POS.Infrastructure.Persistences.Interfaces;
using POS.Infrastructure.Persistences.Repositories;

namespace POS.Infrastructure.Extensions
{
    public static class InjectionExtensions
    {
        public static IServiceCollection AddInjectionInfraestructure(this IServiceCollection services, IConfiguration configuration)
        {
            var assembly = typeof(SaleWebContext).Assembly.FullName;

            //CONECCION A LA BASE DE DATOS
            services.AddDbContext<SaleWebContext>(
                options => options.UseSqlServer(
                    configuration.GetConnectionString("POSConnection"), 
                    b => b.MigrationsAssembly(assembly)), ServiceLifetime.Transient);

            //INJECTAMOS EL FLUJO DE TRABAJO
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            //PASO 3
            //INJECTAMOS LOS METODOS GENERICOS PARA LAS ENTIDADES
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IAzureStorage, AzureStorage>();
            services.AddTransient<IGenerateExcel, GenerateExcel>();
            services.AddTransient<IFileStorageLocal, FileStorageLocal>();

            return services;
        }

    }
}
