# Task Management API

This is a C# .NET API for managing tasks, along with a React frontend.

## Backend Setup

1.  **Install .NET SDK 8.0:** [https://dotnet.microsoft.com/download/dotnet/8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
2.  **Install SQL Server:** You can use either:
    *   **SQL Server 2022 Developer:** [https://www.microsoft.com/sql-server/sql-server-downloads](https://www.microsoft.com/sql-server/sql-server-downloads)
    *   **Docker:** Install Docker and run the `docker-compose.yml` file from the root directory:

        ```bash
        docker-compose up -d
        ```
3.  **Configure the Connection String:** Make sure the `appsettings.json` in `GerenciadorDeTarefas.API` has the correct connection string for your SQL Server instance.
4.  **Apply Migrations:**
    ```bash
    cd src/GerenciadorDeTarefas.API
    dotnet ef migrations add InitialCreate --project ../GerenciadorDeTarefas.Infrastructure
    dotnet ef database update --project ../GerenciadorDeTarefas.Infrastructure
    ```
5.  **Run the API:**

    ```bash
    cd src/GerenciadorDeTarefas.API
    dotnet run
    ```

## Frontend Setup

1.  **Install Node.js 18+:** [https://nodejs.org/](https://nodejs.org/)
2.  **Install Dependencies:**

    ```bash
    cd src/GerenciadorDeTarefas.WEB
    npm install
    npm install axios react-router-dom
    ```
3.  **Run the Frontend:**

    ```bash
    npm start
    ```

## Database

*   The database is named **GerenciadorDeTarefasDB**.
*   The SQL server configuration will depend on your configuration (docker or native). Please update the **ConnectionString** in `appsettings.json` if it necessary

## API Endpoints

*   **GET /api/tasks:** Get all tasks
*   **GET /api/tasks/status/{status}**: Get tasks by status
*   **GET /api/tasks/{id}**: Get task by id
*   **POST /api/tasks:** Create a new task
*   **PUT /api/tasks/{id}**: Update a task
*   **DELETE /api/tasks/{id}**: Delete a task

**Important Notes**

*   Please, make sure your application is running correctly, and adjust the `baseURL` in the frontend API configuration as you need.
*   Install the Entity Framework tools globally with: `dotnet tool install --global dotnet-ef`.
*   The frontend has a basic implementation. You may need to improve the implementation and add new components.

## Further Improvements

*   Implement authentication.
*   Add more comprehensive tests.
*   Add validation on the API endpoints.
*   Implement more advanced filtering on the frontend.


# Gerenciador de Tarefas

Este projeto é um sistema de gerenciamento de tarefas desenvolvido com **ASP.NET Core Web API** para o backend e **React** para o frontend.

## 📌 Tecnologias Utilizadas
- **Backend:** ASP.NET Core Web API
- **Frontend:** React
- **Banco de Dados:** SQL Server
- **ORM:** Entity Framework Core
- **Autenticação:** (Atualmente sem autenticação)
- **Arquitetura:** Camadas (Domain, Application, Infrastructure, Presentation)

## 🛠️ Configuração do Ambiente
### 1️⃣ Clonar o Repositório
```sh
git clone https://github.com/seu-usuario/gerenciador-de-tarefas.git
cd gerenciador-de-tarefas
```

### 2️⃣ Configurar a Connection String
Edite o arquivo `appsettings.json` na pasta `GerenciadorDeTarefas.Presentation` e configure a string de conexão com o banco de dados:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=GerenciadorDeTarefasDB;User Id=sa;Password=SuaSenha;"
}
```

### 3️⃣ Aplicar as Migrations do Banco de Dados
Execute os seguintes comandos na pasta `GerenciadorDeTarefas.Infrastructure`:
```sh
dotnet ef database update
```
Se precisar criar novas migrations, utilize:
```sh
dotnet ef migrations add NomeDaMigration
```

### 4️⃣ Rodar o Backend
Navegue até a pasta `GerenciadorDeTarefas.Presentation` e execute:
```sh
dotnet run
```
O backend será iniciado em `http://localhost:5000`.

### 5️⃣ Rodar o Frontend
Navegue até a pasta `GerenciadorDeTarefas.WEB` e execute:
```sh
npm install
npm start
```
O frontend será iniciado em `http://localhost:3000`.

## 📄 Endpoints da API
| Método  | Endpoint            | Descrição                        |
|---------|--------------------|--------------------------------|
| GET     | `/api/tarefas`     | Lista todas as tarefas        |
| GET     | `/api/tarefas/{id}` | Obtém uma tarefa específica   |
| POST    | `/api/tarefas`     | Cria uma nova tarefa          |
| PUT     | `/api/tarefas/{id}` | Atualiza uma tarefa existente |
| DELETE  | `/api/tarefas/{id}` | Exclui uma tarefa             |

## 🚀 Funcionalidades
- Criar, editar, excluir e listar tarefas
- Filtragem por status
- Validação de campos

Se tiver dúvidas ou precisar de ajuda, entre em contato! 😊

# Gerenciador de Tarefas

Este é um projeto de gerenciamento de tarefas desenvolvido com .NET Core para o backend e React com Vite para o frontend.

## Requisitos
Antes de iniciar, certifique-se de ter instalado em sua máquina:
- [.NET SDK 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [Node.js 18+](https://nodejs.org/en/)
- [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)
- [Docker (opcional)](https://www.docker.com/)

## Instalação e Configuração

1. **Clone o repositório**
   ```sh
   git clone https://github.com/seu-usuario/gerenciador-de-tarefas.git
   cd gerenciador-de-tarefas
   ```

2. **Configure o banco de dados**
   - No SQL Server, crie um banco de dados chamado `GerenciadorDeTarefasDB`.
   - Atualize a string de conexão em `appsettings.json` dentro do projeto `GerenciadorDeTarefas.API`.
   
3. **Execute as migrations**
   ```sh
   cd GerenciadorDeTarefas.Infrastructure
   dotnet ef database update
   ```

4. **Inicie o backend**
   ```sh
   cd GerenciadorDeTarefas.API
   dotnet run
   ```
   O backend estará disponível em `http://localhost:5000`.

5. **Acesse o sistema**
   Após iniciar o backend, o frontend será servido automaticamente junto com a API. Basta acessar `http://localhost:5000` no navegador.

## Tecnologias Utilizadas
- **Backend:** .NET 7, Entity Framework Core, SQL Server
- **Frontend:** React, TypeScript, Vite, Material UI
- **Autenticação:** JWT (planejado)
- **Containerização:** Docker (opcional)

## Contribuição
Sinta-se à vontade para contribuir com melhorias! Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Licença
Este projeto está licenciado sob a MIT License.

