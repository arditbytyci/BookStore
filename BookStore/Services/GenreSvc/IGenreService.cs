using BookStore.DTO;

namespace BookStore.Services.GenreSvc
{
    public interface IGenreService
    {


         Task<IEnumerable<GenreDTO>> GetAllGenresAsync();

        Task<GenreDTO> GetGenreByIdAsync(int id);

        Task<GenreDTO> CreateGenreAsync(GenreDTO genreDTO);

        Task<bool> UpdateGenreAsync(int id, GenreDTO genreDTO);

        Task<bool> DeleteGenreAsync(int id);


    }
}
