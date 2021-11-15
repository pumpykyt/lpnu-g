using System.Linq;
using System.Threading.Tasks;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lpnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateOrderAsync(OrderRequestDto model)
        {
            var userId = User.Claims.First(t => t.Type == "id").Value;
            await _orderService.CreateOrderAsync(userId, model);
            return Ok();
        }
        
        [HttpGet("get")]
        public async Task<IActionResult> GetUserOrdersAsync()
        {
            var userId = User.Claims.First(t => t.Type == "id").Value;
            var result = await _orderService.GetUserOrdersAsync(userId);
            return Ok(result);
        }

        [HttpPost("accept")]
        public async Task<IActionResult> AcceptOrderAsync(int orderId)
        {
            await _orderService.AcceptOrderAsync(orderId);
            return Ok();
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> GetOrdersAsync()
        {
            var result = await _orderService.GetOrdersAsync();
            return Ok(result);
        }
    }
}