namespace BookStore.DTO
{
    public class GenreDTO
    {

        public int GenreID { get; set; }
        public string GenreName { get; set; } 

        public List<BookDTO> Books { get; set; } = new List<BookDTO>();
    }
}
