using GerenciadorDeTarefas.Application.Interfaces;
using GerenciadorDeTarefas.Domain.Entities;
using GerenciadorDeTarefas.Domain.Enums;
using GerenciadorDeTarefas.Domain.Interfaces;

namespace GerenciadorDeTarefas.Application.Services;

public class TarefaService : ITarefaService
{
    private readonly ITarefaRepository _tarefaRepository;

    public TarefaService(ITarefaRepository tarefaRepository)
    {
        _tarefaRepository = tarefaRepository;
    }

    public async Task<IEnumerable<Tarefa>> ObterTodas() => await _tarefaRepository.ObterTodosAsync();
    
    public async Task<Tarefa> ObterPorId(int id) => await _tarefaRepository.ObterPorIdAsync(id);
    
    public async Task Adicionar(Tarefa tarefa) => await _tarefaRepository.AdicionarAsync(tarefa);

    //public async Task Atualizar(Tarefa tarefa)
    //{
    //    var existingTarefa = await _tarefaRepository.ObterPorIdAsync(tarefa.Id);
    //    if (existingTarefa == null)
    //        throw new KeyNotFoundException("Tarefa não encontrada");

    //    if (tarefa.DataConclusao.HasValue && tarefa.DataConclusao < existingTarefa.DataCriacao)
    //        throw new ArgumentException("Data de conclusão inválida");

    //    await _tarefaRepository.AtualizarAsync(tarefa);
    //}

    public async Task Atualizar(Tarefa tarefa)
    {
        var existingTarefa = await _tarefaRepository.ObterPorIdAsync(tarefa.Id);
        if (existingTarefa == null)
            throw new KeyNotFoundException("Tarefa não encontrada");

        if (tarefa.DataConclusao.HasValue && tarefa.DataConclusao < existingTarefa.DataCriacao)
            throw new ArgumentException("Data de conclusão inválida");

        await _tarefaRepository.AtualizarAsync(tarefa);
    }

    public async Task Remover(int id) => await _tarefaRepository.RemoverAsync(id);

    public async Task<IEnumerable<Tarefa>> ObterTarefasPorStatus(StatusTarefa status)
    {
        return await _tarefaRepository.ObterTarefasPorStatusAsync(status);
    }
}