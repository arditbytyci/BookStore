using BookStore.DTO;

namespace BookStore.Services.AuthorSvc
{
    public interface IAuthorService
    {
        Task<IEnumerable<AuthorDTO>> GetAllAuthorsAsync();

        Task<AuthorDTO> GetAuthorById(int authorId);

        Task<AuthorDTO> CreateAuthorAsync(AuthorDTO authorDTO);

        Task<bool> UpdateAuthorAsync(int id, AuthorDTO authorDTO);

        Task<bool> DeleteAuthorAsync(int id);

        Task<AuthorDTO> GetAuthorsWithBooksByIdAsync(int id);
    }
}
