using BookStore.DTO;
using BookStore.Services.AuthorSvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {

        private readonly IAuthorService _authorService;


        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAuthors()
        {
            var authors = await _authorService.GetAllAuthorsAsync();
            if (authors == null) return NotFound();
            return Ok(authors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthorById(int id)
        {
            var author = await _authorService.GetAuthorById(id);

            if (author == null) return NotFound();

            return Ok(author);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAuthor([FromBody] AuthorDTO authorDto)
        {
            var createdAuthor = await _authorService.CreateAuthorAsync(authorDto); 
            return CreatedAtAction(nameof(GetAuthorById), new { id = createdAuthor.AuthorID }, createdAuthor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(int id,[FromBody] AuthorDTO authorDto)
        {
            var success = await _authorService.UpdateAuthorAsync(id, authorDto);

            if(!success) return NotFound();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var success = await _authorService.DeleteAuthorAsync(id);

            if (!success) return NotFound();

            return NoContent();
        }
    }
}
