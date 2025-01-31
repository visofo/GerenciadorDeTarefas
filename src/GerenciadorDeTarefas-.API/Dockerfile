# src/GerenciadorDeTarefas.API/Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copia a solução
COPY GerenciadorDeTarefas.sln ./

# Copia o diretório com os projetos da aplicação e faz o restore
COPY src ./src
RUN dotnet restore /p:RestoreExclude="tests/*"

# Copia todo o resto e builda
COPY . ./
RUN dotnet publish -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "GerenciadorDeTarefas.API.dll"]