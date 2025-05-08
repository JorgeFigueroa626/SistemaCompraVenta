using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using POS.Application.Common.Odering;
using POS.Application.Service.Implementations;
using POS.Application.Service.Interfaces;
using System.Reflection;

namespace POS.Application.Extensions
{
    public static class InjectionExtensions
    {

        /// INJECCION O INGRACION DE LOS METODOS Y SERVICIOS CREADOS
        public static IServiceCollection AddInjectionApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(configuration);

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<IOrderingQuery, OrderingQuery>();
            services.AddScoped<IGenerateExcelApplication, GenerateExcelApplication>();
            services.AddScoped<IFileStorageLocalApplication, FileStorageLocalApplication>();
            services.AddScoped<ICategoryApplication, CategoryApplication>();
            services.AddScoped<IUserApplication, UserApplication>();
            services.AddScoped<IProviderApplication, ProviderApplication>();
            services.AddScoped<IAuthApplication, AuthApplication>();
            services.AddScoped<IWarehouseApplication, WarehouseApplication>();
            services.AddScoped<IProductApplication, ProductApplication>();
            services.AddScoped<IProductStockApplication, ProductStockApplication>();
            services.AddScoped<IPurcharseApplication, PurcharseApplication>();
            services.AddScoped<IClientApplication, ClientApplication>();
            services.AddScoped<IVoucherDocumentTypeApplication, VoucherDocumentTypeApplication>();
            services.AddScoped<ISaleApplication, SaleApplication>();

            return services;
        }
    }
}
