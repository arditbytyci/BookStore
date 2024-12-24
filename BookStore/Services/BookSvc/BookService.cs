using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.BookInterface;
using BookStore.Models;

namespace BookStore.Services.BookSvc
{
    public class BookService : IBookService
    {

        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;
            

        public BookService(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }


        //Create

        public async Task<BookDTO> CreateBookAsync(BookDTO bookdDto)
        {
            var book = _mapper.Map<Book>(bookdDto);

            await _bookRepository.AddAsync(book);

            return _mapper.Map<BookDTO>(book);
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

