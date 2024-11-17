using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("https://localhost:51443")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
// Configure DbContext with retry logic
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
         sqlOptions => sqlOptions.EnableRetryOnFailure(
             maxRetryCount: 5,       // Max number of retries
             maxRetryDelay: TimeSpan.FromSeconds(10), // Delay between retries
             errorNumbersToAdd: null // Optionally specify specific error codes to retry
         )));

var app = builder.Build();
app.UseCors("AllowReactApp");
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
