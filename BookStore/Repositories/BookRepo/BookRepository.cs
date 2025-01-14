using BookStore.DATA;
using BookStore.Interfaces.BookInterface;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories.BookRepo
{
    public class BookRepository : IBookRepository
    {


        private readonly BookContext _context;


        public BookRepository(BookContext context) { 
        
            _context = context;
        }


        public async Task<IEnumerable<Book>> GetAllAsync() =>
            await _context.Books.Include(b => b.Author)
            .Include(b => b.Genre).
            ToListAsync();

        public async Task<Book> GetByIdAsync(int id)
        {
            return await _context.Books
        .Include(b => b.Author)
        .Include(b => b.Genre)
        .FirstOrDefaultAsync(b => b.BookID == id);
        }
           

        public async Task AddAsync(Book entity) { 
            await _context.Books.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Book entity)
        {
            _context.Books.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var book = await GetByIdAsync(id);

            if (book != null) {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
            };
        }


        public async Task<IEnumerable<Book>> GetBooksWithAuthorsAsync() =>
            await _context.Books.Include(b => b.Author).ToListAsync();

        public async Task<Book> GetBooksWithAuthorsByIdAsync(int id) =>
            await _context.Books.Include(b => b.Author)
                .FirstOrDefaultAsync(b => b.AuthorID == id);

        public async Task<IEnumerable<Book>> GetBooksWithGenresAsync() => 
            await _context.Books.Include(b => b.Genre).ToListAsync();

        public async Task<Book> GetBooksWithGenresByIdAsync(int id) =>
            await _context.Books.Include(b => b.Genre).FirstOrDefaultAsync(b => b.GenreID == id);

    }
}
