using POS.Application.Extensions;
using POS.Api.Extensions;
using POS.Infrastructure.Extensions;
using POS.Utilities.Static;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var Configuration = builder.Configuration;

///CONFIGURAMOS INJECCION DE LA BASE DE DATOS
builder.Services.AddInjectionInfraestructure(Configuration);

///CONFIGURAMOS INJECCION DE LOS SERVICIOS
builder.Services.AddInjectionApplication(Configuration);

///CONFIGURAMOS LAS AUTENTICACIONES DE LAS API
builder.Services.AddAuthentication(Configuration);

///POLITICAS DE CORS
var Cors = "Cors";
builder.Services.AddCors( opts =>
{
    opts.AddPolicy(name: Cors,
        builder =>
        {
            builder.WithOrigins("*");
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

///CONFIGURAMOS LA DESCRIPCION DE LA API
builder.Services.AddSwagger();
//builder.Services.AddSwaggerGen();

///CONFIGURAMOS LA LECTURA DE LA API DE GOOGLE
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("GoogleSettings"));

///CONFIGURAMOS EL CONTECTOS DE RUTAS HTTP - URL LOCALES
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

///INTEGRAMOS LOS CORS
app.UseCors(Cors);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

///CONFIGURA LA LECTURA DE DATOS ESTATICOS LOCAL
app.UseStaticFiles();

///CONFIGURA LA AUTENTICACION DEL USUARIO
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
