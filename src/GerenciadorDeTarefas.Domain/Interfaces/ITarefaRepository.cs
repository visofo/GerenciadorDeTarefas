using GerenciadorDeTarefas.Domain.Entities;
using GerenciadorDeTarefas.Domain.Enums;

namespace GerenciadorDeTarefas.Domain.Interfaces;

public interface ITarefaRepository
{
    Task<IEnumerable<Tarefa>> ObterTodosAsync();
    Task<Tarefa> ObterPorIdAsync(int id);
    Task AdicionarAsync(Tarefa tarefa);
    Task AtualizarAsync(Tarefa tarefa);
    Task RemoverAsync(int id);

//    Task<Tarefa> GetTarefaByIdAsync(int id);
//    Task<IEnumerable<Tarefa>> GetAllTarefasAsync();
//    Task<IEnumerable<Tarefa>> GetTarefasByStatusAsync(StatusTarefa status);
//    Task CreateTarefaAsync(Tarefa tarefa);
//    Task UpdateTarefaAsync(Tarefa tarefa);
//    Task DeleteTarefaAsync(int id);
}
