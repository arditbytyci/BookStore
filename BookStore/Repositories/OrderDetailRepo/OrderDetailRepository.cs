using BookStore.DATA;
using BookStore.Interfaces.OrderDetailInterface;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;


namespace BookStore.Repositories.OrderDetailRepo
{
    public class OrderDetailRepository : IOrderDetailRepository
    {

        private readonly BookContext _context;

        public OrderDetailRepository(BookContext context) { 
        
            _context = context;
        }

       public async Task<IEnumerable<OrderDetail>> GetAllAsync() => 
            await _context.OrderDetails.ToListAsync();



        public async Task<OrderDetail> GetByIdAsync(int id) =>
            await _context.OrderDetails.FindAsync(id);

        public async Task AddAsync(OrderDetail entity) => 
            await _context.OrderDetails.AddAsync(entity);

        public async Task UpdateAsync(OrderDetail entity) =>
             _context.OrderDetails.Update(entity);

        public async Task DeleteAsync(int id)
        {
            var order = await GetByIdAsync(id);

            if (order != null) _context.Remove(order);
        }

        public async Task<IEnumerable<OrderDetail>> GetAllOrderDetailsWithOrderAsync() =>
            await _context.OrderDetails.Include(od => od.Order).ToListAsync();

        public async Task<OrderDetail> GetOrderDetailByIdAsync(int id) =>
            await _context.OrderDetails.Include(od => od.Order).FirstOrDefaultAsync(od => od.OrderID == id);

        public async Task<IEnumerable<OrderDetail>> GetAllOrderDetailsWithBooksAsync() => 
            await _context.OrderDetails.Include(od => od.Book).ToListAsync();

        public async Task<OrderDetail> GetAllOrderDetailsWithBooksByIdAsync(int id) =>
            await _context.OrderDetails.Include(od => od.Book).FirstOrDefaultAsync(od => od.BookID == id);

    }
}
