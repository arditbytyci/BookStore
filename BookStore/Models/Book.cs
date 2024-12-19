namespace BookStore.Models
{
    public class Book
    {
        public int BookID { get; set; } // PK

        public string Title { get; set; } = null!;
        public decimal Price { get; set; }
        public DateTime? PublishedDate { get; set; }


        public int AuthorID { get; set; }
        public int GenreID {  get; set; }


        //Navigation properties

        public Author Author { get; set; } = null!; // many - to - one
        public Genre Genre { get; set; } = null!; // many - to - one

        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>(); // many - to - many
    }
}
