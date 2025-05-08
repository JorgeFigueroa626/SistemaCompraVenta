using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace POS.Api.Extensions
{
    public static class SwaggerExtensions
    {
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            //DESCRIPCION DE LA API
            var openApi = new OpenApiInfo
            {
                //DOCUMENTACION
                Title = "Sale API",
                Version = "v1",
                Description = "Punto de Venta API 2025",
                TermsOfService = new Uri("https://opensource.org/licenses/NIT"),
                Contact = new OpenApiContact
                {
                    //CONTACTOS
                    Name = "SIR TECH S.A.C.",
                    Email = "jlfigueroa626@gmail.com",
                    Url = new Uri("https://sirtech.com.pe")
                },
                License = new OpenApiLicense
                {
                    //LECENCIA
                    Name = "Use under LICX",
                    Url = new Uri("https://opensource.org/licenses/")
                }
            };

            //INFORMACION DE AUTHENTICACION
            services.AddSwaggerGen(x =>
            {
                openApi.Version = "v1";
                x.SwaggerDoc("v1", openApi);

                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "JWT Authentication",
                    Description = "JWT Bearer Token",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };

                x.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
                x.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { securityScheme, new string[]{ } }
                });
            });

            return services;
        }
    }
}
