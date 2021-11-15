using System.Collections.Generic;
using System.Threading.Tasks;
using lpnu.Dtos;

namespace lpnu.Interfaces
{
    public interface IOrderService
    {
        Task CreateOrderAsync(string userId, OrderRequestDto model);
        Task<IEnumerable<OrderResponseDto>> GetOrdersAsync();
        Task AcceptOrderAsync(int orderId);
        Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(string userId);
    }
}