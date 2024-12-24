using BookStore.DATA;
using BookStore.Interfaces.UserInterface;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories.UserRepo
{
    public class UserRepository : IUserRepository
    {


        private readonly BookContext _context;


        public UserRepository(BookContext context) { 
            _context = context;
        }



        public async Task<IEnumerable<User>> GetAllAsync() =>
            await _context.Users.ToListAsync();

        public async Task<User> GetByIdAsync(int id) =>
            await _context.Users.FindAsync(id);

        public async Task AddAsync(User entity) =>
            await _context.Users.AddAsync(entity);

        public async Task UpdateAsync(User entity) =>
            _context.Users.Update(entity);


        public async Task DeleteAsync(int id)
        {
            var user = await GetByIdAsync(id);

            if (user != null) _context.Users.Remove(user);  
        }



    }
}
