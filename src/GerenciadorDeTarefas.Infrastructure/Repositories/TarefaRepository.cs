using GerenciadorDeTarefas.Domain.Entities;
using GerenciadorDeTarefas.Domain.Enums;
using GerenciadorDeTarefas.Domain.Interfaces;
using GerenciadorDeTarefas.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorDeTarefas.Infrastructure.Repositories;

public class TarefaRepository : ITarefaRepository
{
    private readonly ApplicationDbContext _context;

    public TarefaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Tarefa>> ObterTodosAsync() => await _context.Tarefas.ToListAsync();
   
    public async Task<Tarefa> ObterPorIdAsync(int id) => await _context.Tarefas.FindAsync(id);
    
    public async Task AdicionarAsync(Tarefa tarefa)
    {
        tarefa.DataCriacao = DateTime.Now;
        await _context.Tarefas.AddAsync(tarefa);
        await _context.SaveChangesAsync();
    }

    public async Task AtualizarAsync(Tarefa tarefa)
    {
        var existingTarefa = await _context.Set<Tarefa>().FindAsync(tarefa.Id);
        if (existingTarefa != null)
        {
            if (tarefa.Status == StatusTarefa.Concluida && existingTarefa.Status != tarefa.Status)
                tarefa.DataConclusao = DateTime.Now;

            if(tarefa.Status != StatusTarefa.Concluida)
                tarefa.DataConclusao = null;

            _context.Entry(existingTarefa).CurrentValues.SetValues(tarefa);
            await _context.SaveChangesAsync();
}
        else
        {
            throw new KeyNotFoundException("Tarefa não encontrada");
        }
    }

    public async Task RemoverAsync(int id)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);
        if (tarefa != null)
        {
            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();
        }
    }
                                           
    public async Task<IEnumerable<Tarefa>> ObterTarefasPorStatusAsync(StatusTarefa status)
    {
        return await _context.Tarefas.Where(t => t.Status == status).ToListAsync();
    }
}
