using GerenciadorDeTarefas.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorDeTarefas.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Tarefa> Tarefas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tarefa>(entity =>
        {
            entity.Property(e => e.Titulo).IsRequired().HasMaxLength(100);
            entity.Property(e => e.DataCriacao).HasDefaultValueSql("GETDATE()");
        });
    }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //    optionsBuilder.UseSqlServer("Server=localhost\\sqlexpress;Database=GerenciadorDeTarefasDB;User Id=sa;Password=MyStrong@Pass123;TrustServerCertificate=True");
    //}
}