using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; } // Add your entity models here

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}