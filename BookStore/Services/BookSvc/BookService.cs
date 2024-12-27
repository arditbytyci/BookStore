using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.AuthorInterface;
using BookStore.Interfaces.BookInterface;
using BookStore.Interfaces.GenreInterface;
using BookStore.Models;

namespace BookStore.Services.BookSvc
{
    public class BookService : IBookService
    {

        private readonly IBookRepository _bookRepository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IGenreRepository _genreRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<BookService> _logger;

        public BookService(IBookRepository bookRepository, IMapper mapper, ILogger<BookService> logger, IAuthorRepository authorRepository, IGenreRepository genreRepository)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
            _logger = logger;
            _authorRepository = authorRepository;
            _genreRepository = genreRepository;
        }


        //Create

        public async Task<BookDTO> CreateBookAsync(BookDTO bookdDto)
        {

            var author = await _authorRepository.GetByIdAsync(bookdDto.AuthorID);
            if (author == null) throw new Exception("Author not found");


            var genre = await _genreRepository.GetByIdAsync(bookdDto.GenreID);
            if (genre == null) throw new Exception("Genre not found");



            var book = _mapper.Map<Book>(bookdDto);
            book.Author = author;
            book.Genre = genre;

            await _bookRepository.AddAsync(book);

            var createdBookDto = _mapper.Map<BookDTO>(book);

            createdBookDto.AuthorName = author.Name;
            createdBookDto.GenreName = genre.GenreName;

            return createdBookDto;
        }

        public async Task<IEnumerable<BookDTO>> GetAllBooksAsync()
        {
            var books = await _bookRepository.GetAllAsync();

        
            return _mapper.Map<IEnumerable<BookDTO>>(books);
        }

        //READ:id
        public async Task<BookDTO> GetBookByIdAsync(int id)
        {
            var book = await _bookRepository.GetByIdAsync(id);
            return book == null ? null : _mapper.Map<BookDTO>(book);
        }


        //Update
        public async Task<bool> UpdateBookAsync(int id, BookDTO bookDto)
        {

            var book = await _bookRepository.GetByIdAsync(id);

            if (book == null) return false;

            _mapper.Map(bookDto, book);

            await _bookRepository.UpdateAsync(book);

            return true;
        }
        //Delete
        public async Task<bool> DeleteBookAsync(int id)
        {
            var book = await _bookRepository.GetByIdAsync(id);

            if(book == null) return false;

            await _bookRepository.DeleteAsync(id);

            return true;
        }

        
        }

    }

