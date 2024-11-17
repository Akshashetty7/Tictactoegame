
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace reactnet.Server.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Username and password are required.");
            //var test = await _context.Users.GetAsyncEnumerator().ConfigureAwait(false).


            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Email);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            // Verify the password hash
            if (!VerifyPassword(request.Password, user.PasswordHash))
                return Unauthorized("Invalid username or password.");
            // Generate a JWT token
            var claims = new[]
            {
             new Claim(ClaimTypes.Name, user.Username),
             };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecureKey32tictacgamectersLong\r\n")); // Use a secure key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "YourIssuer",
                audience: "YourAudience",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
            var tokenString = string.Empty;
            try
            {
                tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch(Exception ex)
            {
                throw ex;
            }
           

            // Return the token in the response
            return Ok(new { Token = tokenString });
        }
        [HttpPost("register")]
        public  IActionResult Register(RegisterRequest model)
        {
            using (var connection = new SqlConnection("Server=.;Database=Tictacgame;TrustServerCertificate=True;MultipleActiveResultSets=true"))
            {
                try
                {
                    connection.Open();
                    Console.WriteLine("Database connected successfully!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Database connection failed: {ex.Message}");
                }
            }
             _context.Database.CanConnect();
            Console.WriteLine("Database connection successful!");
            // Check if the username already exists
            var existingUser = _context.Users.FirstOrDefault(u => u.Username == model.Email);
            if (existingUser != null)
            {
                return BadRequest("Username already exists. Please choose a different one.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // Create a new user
            var newUser = new User
            {
                Username = model.Email,
                PasswordHash = hashedPassword
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok("Registration successful!");
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }
    }

}
