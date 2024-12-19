namespace BookStore.Models
{
    public class Author
    {
        public int AuthorID { get; set; }   
        public string Name { get; set; }
        public string? Bio { get; set; }
        public DateTime? BirthDate { get; set; }


        //Nav properties
        public ICollection<Book> Books { get; set; } = new List<Book>(); // one-to-many
    }
}
