using BookStore.Models;

namespace BookStore.Interfaces.GenreInterface
{
    public interface IGenreRepository : IRepository<Genre>
    {

        Task<IEnumerable<Genre>> GetGenresWithBooksAsync();

        Task<Genre> GetGenreWithBookByIdAsync(int id);


        



    }
}
