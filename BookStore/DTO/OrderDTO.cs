namespace BookStore.DTO
{
    public class OrderDTO
    {
        public int OrderID { get; set; } // PK 
        public DateTime? OrderDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; }

        public int CustomerID { get; set; }
    }
}
