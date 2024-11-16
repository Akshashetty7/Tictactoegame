
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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

            return Ok("Login successful!");
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            using var sha256 = SHA256.Create();
            var computedHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
            return computedHash == storedHash;
        }
    }

}
