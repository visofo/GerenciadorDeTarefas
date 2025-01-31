using GerenciadorDeTarefas.Application.Interfaces;
using GerenciadorDeTarefas.Domain.Entities;
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
    public async Task<IActionResult> Get()
    {
        var tarefas = await _tarefaService.ObterTodas();
        return Ok(tarefas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var tarefa = await _tarefaService.ObterPorId(id);
        return tarefa != null ? Ok(tarefa) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Tarefa tarefa)
    {
        await _tarefaService.Adicionar(tarefa);
        return CreatedAtAction(nameof(GetById), new { id = tarefa.Id }, tarefa);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Tarefa tarefa)
    {
        if (id != tarefa.Id) return BadRequest();
        await _tarefaService.Atualizar(tarefa);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _tarefaService.Remover(id);
        return NoContent();
    }


    //[HttpGet]
    //public async Task<ActionResult<IEnumerable<Tarefa>>> GetAllTarefas()
    //{
    //    var tarefas = await _tarefaService.GetAllTarefasAsync();
    //    return Ok(tarefas);
    //}

    //[HttpGet("status/{status}")]
    //public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefasByStatus(StatusTarefa status)
    //{
    //    var tarefas = await _tarefaService.GetTarefasByStatusAsync(status);
    //    return Ok(tarefas);
    //}

    //[HttpGet("{id}")]
    //public async Task<ActionResult<Tarefa>> GetTarefaById(int id)
    //{
    //    var tarefa = await _tarefaService.GetTarefaByIdAsync(id);
    //    if (tarefa == null) return NotFound();
    //    return Ok(tarefa);
    //}

    //[HttpPost]
    //public async Task<IActionResult> CreateTarefa(Tarefa tarefa)
    //{
    //    await _tarefaService.CreateTarefaAsync(tarefa);
    //    return CreatedAtAction(nameof(GetTarefaById), new { id = tarefa.Id }, tarefa);
    //}

    //[HttpPut("{id}")]
    //public async Task<IActionResult> UpdateTarefa(int id, Tarefa tarefa)
    //{
    //    if (id != tarefa.Id)
    //    {
    //        return BadRequest();
    //    }

    //    await _tarefaService.UpdateTarefaAsync(tarefa);
    //    return NoContent();
    //}

    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeleteTarefa(int id)
    //{
    //    await _tarefaService.DeleteTarefaAsync(id);
    //    return NoContent();
    //}
}