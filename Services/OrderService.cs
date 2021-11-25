using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using lpnu.Data;
using lpnu.Data.Entities;
using lpnu.Dtos;
using lpnu.Exceptions;
using lpnu.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace lpnu.Services
{
    public class OrderService : IOrderService
    {
        private readonly EFContext _context;

        public OrderService(EFContext context)
        {
            _context = context;
        }
        
        public async Task CreateOrderAsync(string userId, OrderRequestDto model)
        {
            var order = new Order();
            order.Status = "Pending";
            order.UserId = userId;
            await _context.SaveChangesAsync();

            foreach (var element in model.Products)
            {
                var product = await _context.Products
                    .Include(t => t.Orders)
                    .SingleOrDefaultAsync(t => t.Id == element.ProductId);
                if (product.AvailableCount >= element.Count)
                {
                    product.AvailableCount -= element.Count;
                    order.TotalPrice += element.Count * product.Price;
                    product.Orders.Add(order);
                }
                else
                {
                    throw new RestException(HttpStatusCode.UnprocessableEntity);
                }
            }
            
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<OrderResponseDto>> GetOrdersAsync()
        {
            var orders = await _context.Orders.ToListAsync();
            return orders.Adapt<IEnumerable<OrderResponseDto>>();
        }

        public async Task AcceptOrderAsync(int orderId)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(t => t.Id == orderId);
            order.Status = "Completed";
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(string userId)
        {
            var orders = await _context.Orders
                .Include(t => t.User)
                .Where(t => t.UserId == userId)
                .ToListAsync();

            var result = new List<OrderResponseDto>();
            foreach (var item in orders)
            {
                var temp = item.Adapt<OrderResponseDto>();
                temp.UserEmail = item.User.Email;
                result.Add(temp);
            }

            return result;
        }
    }
}