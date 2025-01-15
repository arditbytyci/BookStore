using BookStore.Models;

namespace BookStore.DTO
{
    public class AuthorDTO
    {
        public int AuthorID { get; set; }
        public string? Name { get; set; }
        public string? Bio { get; set; }
        public DateTime? BirthDate { get; set; }

        public string? ImageUrl { get; set; }

        public IEnumerable<BookDTO>? Books { get; set; }


    }
}
