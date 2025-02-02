using GerenciadorDeTarefas.Application.Interfaces;
using GerenciadorDeTarefas.Domain.Entities;
using GerenciadorDeTarefas.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace GerenciadorDeTarefas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TarefasController : ControllerBase
{
    private readonly ITarefaService _tarefaService;

    public TarefasController(ITarefaService tarefaService)
    {
        _tarefaService = tarefaService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tarefa>>> GetAllTarefas()
    {
        var tarefas = await _tarefaService.ObterTodas();
        return Ok(tarefas);
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefasByStatus(StatusTarefa status)
    {
        var tarefas = await _tarefaService.ObterTarefasPorStatus(status);
        return Ok(tarefas);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Tarefa>> GetTarefaById(int id)
    {
        var tarefa = await _tarefaService.ObterPorId(id);
        return tarefa != null ? Ok(tarefa) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> CreateTarefa(Tarefa tarefa)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _tarefaService.Adicionar(tarefa);
            return CreatedAtAction(nameof(GetTarefaById), new { id = tarefa.Id }, tarefa);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTarefa(int id, Tarefa tarefa)
    {
        try
        {
            if (id != tarefa.Id)
                return BadRequest(new { message = "ID da tarefa inválido" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _tarefaService.Atualizar(tarefa);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTarefa(int id)
    {
        await _tarefaService.Remover(id);
        return NoContent();
    }
}