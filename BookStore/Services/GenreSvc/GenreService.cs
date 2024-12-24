using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.GenreInterface;
using BookStore.Models;

namespace BookStore.Services.GenreSvc
{
    public class GenreService : IGenreService
    {


        private readonly IGenreRepository _genreRepository;
        private readonly IMapper _mapper;


        public GenreService(IGenreRepository genreRepository, IMapper mapper)
        {
            _genreRepository = genreRepository;
            _mapper = mapper;
        }


        //Create 


        public async Task<GenreDTO> CreateGenreAsync(GenreDTO genreDto)
        {
            var genre = _mapper.Map<Genre>(genreDto);


            await _genreRepository.AddAsync(genre);

            return _mapper.Map<GenreDTO>(genre);    

        }

        public async Task<IEnumerable<GenreDTO>> GetAllGenresAsync()
        {
            var genres = await _genreRepository.GetAllAsync();


            return _mapper.Map<IEnumerable<GenreDTO>>(genres);
        }

        public async Task<GenreDTO> GetGenreByIdAsync(int id)
        {
            var genre = await _genreRepository.GetByIdAsync(id);

            return genre == null ? null : _mapper.Map<GenreDTO>(genre) as GenreDTO;
        }

        public async Task<bool> UpdateGenreAsync(int id, GenreDTO genreDto)
        {
            var genre = await _genreRepository.GetByIdAsync(id);

            if (genre == null) return false;

            _mapper.Map(genreDto, genre);


            return true;
        }


        public async Task<bool> DeleteGenreAsync(int id)
        {
            var genre = await _genreRepository.GetByIdAsync(id);

            if (genre == null) return false;

            await _genreRepository.DeleteAsync(id);

            return true;

        }





    }
}
