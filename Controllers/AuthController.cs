using System.Threading.Tasks;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace lpnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(UserRegisterDto model)
        {
            await _authService.RegisterAsync(model);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(UserLoginDto model)
        {
            var result = await _authService.LoginAsync(model);
            return Ok(result);
        }
    }
}