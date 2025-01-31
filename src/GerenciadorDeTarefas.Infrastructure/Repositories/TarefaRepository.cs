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
        await _context.Tarefas.AddAsync(tarefa);
        await _context.SaveChangesAsync();
    }
    public async Task AtualizarAsync(Tarefa tarefa)
    {
        _context.Tarefas.Update(tarefa);
        await _context.SaveChangesAsync();
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



    public async Task<Tarefa> GetTarefaByIdAsync(int id)
    {
        return await _context.Tarefas.FindAsync(id);
    }

    public async Task<IEnumerable<Tarefa>> GetAllTarefasAsync()
    {
        return await _context.Tarefas.ToListAsync();
    }

    public async Task<IEnumerable<Tarefa>> GetTarefasByStatusAsync(StatusTarefa status)
    {
        return await _context.Tarefas.Where(t => t.Status == status).ToListAsync();
    }


    public async Task CreateTarefaAsync(Tarefa tarefa)
    {
        _context.Tarefas.Add(tarefa);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateTarefaAsync(Tarefa tarefa)
    {
        _context.Entry(tarefa).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }


    public async Task DeleteTarefaAsync(int id)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);
        if (tarefa != null)
        {
            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();
        }
    }
}
