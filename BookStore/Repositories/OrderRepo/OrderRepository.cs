using BookStore.DATA;
using BookStore.Interfaces.OrderInterface;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories.OrderRepo
{
    public class OrderRepository : IOrderRepository
    {

        private readonly BookContext _context;


        public OrderRepository(BookContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Order>> GetAllAsync() =>
            await _context.Orders.ToListAsync();


        public async Task<Order> GetByIdAsync(int id) => 
            await _context.Orders.FindAsync(id);

        public async Task AddAsync(Order entity) =>
            await _context.Orders.AddAsync(entity);

        public async Task UpdateAsync(Order entity) =>
             _context.Orders.Update(entity);

        public async Task DeleteAsync(int id)
        {
            var order = await GetByIdAsync(id);

            if (order != null) _context.Orders.Remove(order);
        }

        public async Task<IEnumerable<Order>> GetOrdersWithCustomersAsync() => 
            await _context.Orders.Include(o => o.Customer).ToListAsync();

        public async Task<Order> GetOrdersWithCustomersByIdAsync(int id) =>
            await _context.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.CustomerID == id);
    }
}
