using BookStore.DATA;
using BookStore.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories
{
    public class Repository<T> : IRepository<T> where T : class 
    {

        private readonly BookContext _context;
        private readonly DbSet<T> _dbSet;


        public Repository(BookContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();
        public async Task<T> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

        public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);

        public async Task UpdateAsync(T entity) =>  _dbSet.Update(entity);


        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);

            if (entity != null) _dbSet.Remove(entity);
        }



    }
}
