using BookStore.DATA;
using BookStore.Interfaces.CustomerInterface;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories.CustomerRepo
{
    public class CustomerRepository : ICustomerRepository
    {

        private readonly BookContext _context;

        public CustomerRepository(BookContext context) { 
            _context = context;
        }

        public async Task<IEnumerable<Customer>> GetAllAsync() =>
            await _context.Customers
            .Include(c => c.User)
            //.Include(c => c.Orders)
            .ToListAsync();


        public async Task<Customer> GetByIdAsync(int id) =>
            await _context.Customers.FindAsync(id);

        public async Task AddAsync(Customer entity)
        {
            await _context.Customers.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Customer entity)
        {
            _context.Customers.Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var customer = await GetByIdAsync(id);

            if (customer != null) { 
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<IEnumerable<Customer>> GetAllCustomersWithUsers() =>
            await _context.Customers.Include(c => c.User).ToListAsync();

        public async Task<Customer> GetCustomersWithUsersById(int id) =>
            await _context.Customers.Include(c => c.User).FirstOrDefaultAsync(c => c.CustomerID == id);


    }
}
