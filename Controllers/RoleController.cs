using System.Threading.Tasks;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace lpnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> CreateRoleAsync([FromQuery] string role)
        {
            await _roleService.CreateRoleAsync(role);
            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetRolesAsync()
        {
            var result = await _roleService.GetRolesAsync();
            return Ok(result);
        }
    }
}