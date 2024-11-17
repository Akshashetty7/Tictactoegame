using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Tictactoegame.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _context.Users.Take(2).Select(u => new { u.Username }).ToList();
            return Ok(users);
        }
    }
}
