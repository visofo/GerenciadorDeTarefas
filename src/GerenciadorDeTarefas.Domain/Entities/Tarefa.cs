using GerenciadorDeTarefas.Domain.Enums;

namespace GerenciadorDeTarefas.Domain.Entities;

public class Tarefa
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
    public DateTime? DataConclusao { get; set; }
    public StatusTarefa Status { get; set; } = StatusTarefa.Pendente;
}