using BookStore.DTO;
using BookStore.Services.GenreSvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {


        private readonly IGenreService _genreService;

        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGenres()
        {
            var genres = await _genreService.GetAllGenresAsync();

            if (genres == null) return NotFound();

            return Ok(genres);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenreById(int id)
        {
            var genre = await _genreService.GetGenreByIdAsync(id);
            if (genre == null) return NotFound();
            return Ok(genre);

        }


        [HttpPost]
        public async Task<IActionResult> CreateGenre([FromBody]GenreDTO genreDTO)
        {
            var createdGenre = await _genreService.CreateGenreAsync(genreDTO);



            return CreatedAtAction(nameof(GetGenreById), new { id = createdGenre.GenreID }, createdGenre);

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGenre(int id, [FromBody] GenreDTO genreDTO)
        {
            var success = await _genreService.UpdateGenreAsync(id, genreDTO);

            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            var success = await _genreService.DeleteGenreAsync(id);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
