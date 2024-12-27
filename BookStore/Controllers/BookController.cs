using BookStore.DTO;
using BookStore.Services.BookSvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;


        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }



        [HttpGet] 
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookService.GetAllBooksAsync();

          

            if (books == null) return NotFound();

            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id); 
            if(book == null) return NotFound();

            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] BookDTO bookDto)
        {

            var createdBook = await _bookService.CreateBookAsync(bookDto);

            return CreatedAtAction(nameof(GetBookById), new { id = createdBook.BookID }, createdBook);

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDTO bookDto)
        {
            var success = await _bookService.UpdateBookAsync(id, bookDto);


            if(!success) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var success = await _bookService.DeleteBookAsync(id);
            if(!success) return NotFound();
            return NoContent();
        }
    }
}
