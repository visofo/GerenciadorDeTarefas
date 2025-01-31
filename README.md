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