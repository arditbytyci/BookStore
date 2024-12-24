using BookStore.Models;

namespace BookStore.Interfaces.AuthorInterface
{
    public interface IAuthorRepository : IRepository<Author>
    {

        Task<IEnumerable<Author>> GetAuthorsWithBooksAsync();
        Task<Author?> GetAuthorsWithBooksByIdAsync(int authorId);
        Task<IEnumerable<Author>> SearchAuthorsByNameAsync(string authorName);

    }
}
