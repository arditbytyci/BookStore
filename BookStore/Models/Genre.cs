namespace BookStore.Models
{
    public class Genre
    {
        public int GenreID { get; set; }
        public string GenreName { get; set; } = null!;

        public ICollection<Book> Books { get; set; } = new List<Book>(); // one - to - many
    }
}
