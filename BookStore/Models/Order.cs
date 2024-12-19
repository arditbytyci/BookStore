namespace BookStore.Models
{
    public class Order
    {
        public int OrderID { get; set; } // PK 
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; } 

        public int CustomerID   { get; set; }

        // navigation properties

        public Customer Customer { get; set; } = null!; // many - to - one

        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
