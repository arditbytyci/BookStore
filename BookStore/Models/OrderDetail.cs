namespace BookStore.Models
{
    public class OrderDetail
    {
        public int OrderDetailID { get; set; } // PK 
        public int Quantity { get; set; }   

        //FK
        public int OrderID { get; set; }    
        public int BookID { get; set; }

        //Navigation properties

        public Order Order { get; set; } = null!; // many - to - one
        public Book Book { get; set; } = null!; // many - to - one
       
    }
}
