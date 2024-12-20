namespace BookStore.DTO
{
    public class BookDTO
    {
        public int BookID { get; set; } // PK

        public string Title { get; set; } = null!;


        public decimal Price { get; set; }
        public DateTime? PublishedDate { get; set; }

        public int AuthorID { get; set; }
        public int GenreID { get; set; }
    }
}
