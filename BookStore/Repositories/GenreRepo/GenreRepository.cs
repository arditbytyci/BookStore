using BookStore.DATA;
using BookStore.Interfaces.GenreInterface;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories.GenreRepo
{
    public class GenreRepository : IGenreRepository
    {

        private readonly BookContext _context;


        public GenreRepository(BookContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Genre>> GetAllAsync() =>
            await _context.Genres.Include(g => g.Books).ToListAsync();


        public async Task<Genre> GetByIdAsync(int id) =>
            await _context.Genres.FindAsync(id);

        public async Task AddAsync(Genre entity)
        {
            await _context.Genres.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Genre entity)
        {
            _context.Genres.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var genre = await GetByIdAsync(id);

            if (genre != null)
            {
                _context.Remove(genre);
                await _context.SaveChangesAsync();
            }
        }
        

        public async Task<IEnumerable<Genre>> GetGenresWithBooksAsync() =>
            await _context.Genres.Include(g => g.Books).ToListAsync();


        public async Task<Genre> GetGenreWithBookByIdAsync(int id) =>
            await _context.Genres.Include(g => g.Books).FirstOrDefaultAsync(g => g.GenreID == id);






        }


    }

