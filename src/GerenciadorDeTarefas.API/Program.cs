
using GerenciadorDeTarefas.Application.Interfaces;
using GerenciadorDeTarefas.Application.Services;
using GerenciadorDeTarefas.Domain.Entities;
using GerenciadorDeTarefas.Domain.Interfaces;
using GerenciadorDeTarefas.Infrastructure.Data;
using GerenciadorDeTarefas.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Gerenciador de Tarefas API",
        Version = "v1"
    });

    // Habilita documentação de validações
    c.EnableAnnotations();
    c.SchemaFilter<SwaggerSchemaExampleFilter>();
});

// Adicione serviços ao contêiner.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("https://localhost:5173") // Adicione a origem permitida aqui
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// Add database context and repository
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ITarefaRepository, TarefaRepository>();
builder.Services.AddScoped<ITarefaService, TarefaService>();



var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

// Use o CORS
app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

// Adicione esta classe para exemplos de validação
public class SwaggerSchemaExampleFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (context.Type == typeof(Tarefa))
        {
            schema.Example = new OpenApiObject
            {
                ["titulo"] = new OpenApiString("Minha Tarefa"),
                ["descricao"] = new OpenApiString("Descrição detalhada"),
                ["status"] = new OpenApiString("Pendente")
            };
        }
    }
};