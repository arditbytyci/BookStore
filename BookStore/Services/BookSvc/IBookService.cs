using BookStore.DTO;

namespace BookStore.Services.BookSvc
{
    public interface IBookService
    {

        Task<IEnumerable<BookDTO>> GetAllBooksAsync();

        Task<BookDTO> GetBookByIdAsync(int id);

        Task<BookDTO> CreateBookAsync(BookDTO book);

        Task<bool> UpdateBookAsync(int id,  BookDTO book);

        Task<bool> DeleteBookAsync(int id);
    }
}
