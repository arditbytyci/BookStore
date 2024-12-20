namespace BookStore.DTO
{
    public class OrderDetail
    {
        public int OrderDetailID { get; set; } // PK 
        public int Quantity { get; set; }

        //FK
        public int OrderID { get; set; }
        public int BookID { get; set; }
    }
}
