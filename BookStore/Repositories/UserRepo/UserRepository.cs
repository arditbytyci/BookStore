using BookStore.DATA;
using BookStore.Interfaces.UserInterface;
using BookStore.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories.UserRepo
{
    public class UserRepository : IUserRepository
    {


        private readonly BookContext _context;


        public UserRepository(BookContext context) { 
            _context = context;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return null;
        }

        public async Task DeleteAsync(int id)
        {
            
        }

        public async Task<IEnumerable<User>> GetAllAsync() =>
            await _context.Users.Include(u => u.Customer).ToListAsync();

        public async Task<User> GetUserByIdAsync(string id) =>
            await _context.Users.Include(u => u.Customer).FirstOrDefaultAsync(u => u.Id == id);

        public async Task AddAsync(User entity)
        {
            if (string.IsNullOrEmpty(entity.Id)) { 
            
                entity.Id = Guid.NewGuid().ToString();
            }


            await _context.Users.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(User entity)
        {
            _context.Users.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(string id)
        {
            var user = await GetUserByIdAsync(id);

            if (user != null) { 
                
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

            }  
        }



    }
}
