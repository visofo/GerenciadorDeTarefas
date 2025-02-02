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
git clone https://github.com/visofo/GerenciadorDeTarefas.git
```

### 2️⃣ Configurar a Connection String
   - No SQL Server, crie um banco de dados chamado `GerenciadorDeTarefasDB`.
   - Atualize a string de conexão em `appsettings.json` dentro do projeto `GerenciadorDeTarefas.API`.
Edite o arquivo `appsettings.json` na pasta `GerenciadorDeTarefas.API` e configure a string de conexão com o banco de dados:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=seu_banco_de_dados_;User Id=usuario_do_banco;Password=senha_do_banco;"
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
Navegue até a pasta `GerenciadorDeTarefas.API` e execute:
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
O frontend será iniciado em `http://localhost:5173`.

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