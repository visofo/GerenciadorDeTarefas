﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GerenciadorDeTarefas.Domain.Enums;

namespace GerenciadorDeTarefas.Domain.Entities;

public class Tarefa : IValidatableObject
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O título é obrigatório")]
    [MaxLength(100, ErrorMessage = "O título deve ter no máximo 100 caracteres")]
    public string Titulo { get; set; } = string.Empty;
    
    public string? Descricao { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime DataCriacao { get; set; } = DateTime.Now;

    private DateTime? _dataConclusao;
    public DateTime? DataConclusao
    {
        get => _dataConclusao;
        set
        {
            if (value.HasValue)
            {
                // Verifica se a data não possui hora, minuto e segundo definidos
                if (value.Value.TimeOfDay == TimeSpan.Zero)
                {
                    // Atualiza o valor de value com a hora atual
                    value = value.Value.Date.Add(DateTime.Now.TimeOfDay);
                }

                if (value < DataCriacao)
                    throw new ArgumentException("Data de conclusão não pode ser anterior à data de criação");
            }
            _dataConclusao = value;
        }
    }

    public StatusTarefa Status { get; set; } = StatusTarefa.Pendente;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (DataConclusao.HasValue && DataConclusao < DataCriacao)
        {
            yield return new ValidationResult(
                "Data de conclusão não pode ser anterior à data de criação",
                new[] { nameof(DataConclusao) });
        }
    }
}