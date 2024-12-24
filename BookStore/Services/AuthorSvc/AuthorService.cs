using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.AuthorInterface;
using BookStore.Models;

namespace BookStore.Services.AuthorSvc
{
    public class AuthorService : IAuthorService
    {


        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;

        public AuthorService(IAuthorRepository authorRepository, IMapper mapper)
        {
            _authorRepository = authorRepository;
            _mapper = mapper;
        }

        public async Task<AuthorDTO> CreateAuthorAsync(AuthorDTO authorDTO)
        {
            var author = _mapper.Map<Author>(authorDTO);
            await _authorRepository.AddAsync(author);
            return _mapper.Map<AuthorDTO>(author);
        }

        public async Task<IEnumerable<AuthorDTO>> GetAllAuthorsAsync()
        {
            var authors = await _authorRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<AuthorDTO>>(authors);
        }

        public async Task<AuthorDTO?> GetAuthorById(int authorId)
        {
            var author = await _authorRepository.GetByIdAsync(authorId);
            return author == null ? null : _mapper.Map<AuthorDTO>(author);
        }

        public async Task<bool> UpdateAuthorAsync(int id, AuthorDTO authorDto)
        {
            var author = await _authorRepository.GetByIdAsync(id);

            if (author == null)
            {
                return false;
            }

            _mapper.Map(authorDto, author);

            await _authorRepository.UpdateAsync(author);
            return true;
        }

        public async Task<bool> DeleteAuthorAsync(int authorId)
        {
            var author = await _authorRepository.GetByIdAsync(authorId);

            if (author == null) return false;

            await _authorRepository.DeleteAsync(authorId);

            return true;
        }

        public async Task<IEnumerable<AuthorDTO>> SearchAuthorByNameAsync(string authorName)
        {
            var authors = await _authorRepository.SearchAuthorsByNameAsync(authorName);
            return _mapper.Map<IEnumerable<AuthorDTO>>(authors);
        }
    }
}
