using GerenciadorDeTarefas.Domain.Entities;
using GerenciadorDeTarefas.Domain.Enums;


namespace GerenciadorDeTarefas.Application.Interfaces;

public interface ITarefaService
{
    Task<IEnumerable<Tarefa>> ObterTodas();
    Task<Tarefa> ObterPorId(int id);
    Task Adicionar(Tarefa tarefa);
    Task Atualizar(Tarefa tarefa);
    Task Remover(int id);
    Task<IEnumerable<Tarefa>> ObterTarefasPorStatus(StatusTarefa status);
}