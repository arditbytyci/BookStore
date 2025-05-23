﻿using BookStore.DATA;
using BookStore.Interfaces.AuthorInterface;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Repositories.AuthorRepo
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly BookContext _context;

        public AuthorRepository(BookContext context)
        {
            _context = context;
        }



        public async Task<IEnumerable<Author>> GetAllAsync() =>
            await _context.Authors.Include(b => b.Books).ToListAsync();

            

        public async Task<Author> GetByIdAsync(int id) =>
            await _context.Authors.FindAsync(id);


        public async Task AddAsync(Author entity) {
            await _context.Authors.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Author entity)
        {
            _context.Authors.Update(entity);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAsync(int id)
        {
            var author = await GetByIdAsync(id);

            if (author != null)
            {
                _context.Authors.Remove(author);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Author>> GetAuthorsWithBooksAsync() =>
            await _context.Authors.Include(a => a.Books).ToListAsync();


        public async Task<Author> GetAuthorsWithBooksByIdAsync(int id) =>
            await _context.Authors.Include(a => a.Books).FirstOrDefaultAsync(a => a.AuthorID == id);

        public async Task<IEnumerable<Author>> SearchAuthorsByNameAsync(string name) =>
            await _context.Authors.Where(a => a.Name.Contains(name)).ToListAsync();



    }
}
