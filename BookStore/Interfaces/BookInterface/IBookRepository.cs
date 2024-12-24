using BookStore.Models;

namespace BookStore.Interfaces.BookInterface
{
    public interface IBookRepository : IRepository<Book>
    {


        Task<IEnumerable<Book>> GetBooksWithAuthorsAsync();

        Task<Book?> GetBooksWithAuthorsByIdAsync(int id);

        Task<IEnumerable<Book>> GetBooksWithGenresAsync();

        Task<Book?> GetBooksWithGenresByIdAsync(int id);



    }
}
