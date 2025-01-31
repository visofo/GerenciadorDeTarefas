using GerenciadorDeTarefas.Application.Interfaces;
using GerenciadorDeTarefas.Domain.Entities;
using GerenciadorDeTarefas.Domain.Enums;
using GerenciadorDeTarefas.Domain.Interfaces;

namespace GerenciadorDeTarefas.Application.Services;

public class TarefaService : ITarefaService
{
    private readonly ITarefaRepository _repository;

    public TarefaService(ITarefaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Tarefa>> ObterTodas() => await _repository.ObterTodosAsync();
    public async Task<Tarefa> ObterPorId(int id) => await _repository.ObterPorIdAsync(id);
    public async Task Adicionar(Tarefa tarefa) => await _repository.AdicionarAsync(tarefa);
    public async Task Atualizar(Tarefa tarefa) => await _repository.AtualizarAsync(tarefa);
    public async Task Remover(int id) => await _repository.RemoverAsync(id);

    //private readonly ITarefaRepository _tarefaRepository;

    //public TarefaService(ITarefaRepository tarefaRepository)
    //{
    //    _tarefaRepository = tarefaRepository;
    //}

    //public async Task<Tarefa> GetTarefaByIdAsync(int id)
    //{
    //    return await _tarefaRepository.GetTarefaByIdAsync(id);
    //}

    //public async Task<IEnumerable<Tarefa>> GetAllTarefasAsync()
    //{
    //    return await _tarefaRepository.GetAllTarefasAsync();
    //}

    //public async Task<IEnumerable<Tarefa>> GetTarefasByStatusAsync(StatusTarefa status)
    //{
    //    return await _tarefaRepository.GetTarefasByStatusAsync(status);
    //}
    //public async Task CreateTarefaAsync(Tarefa tarefa)
    //{
    //    await _tarefaRepository.CreateTarefaAsync(tarefa);
    //}

    //public async Task UpdateTarefaAsync(Tarefa tarefa)
    //{
    //    await _tarefaRepository.UpdateTarefaAsync(tarefa);
    //}


    //public async Task DeleteTarefaAsync(int id)
    //{
    //    await _tarefaRepository.DeleteTarefaAsync(id);
    //}
}