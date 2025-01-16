namespace BookStore.Models
{
    public class Order
    {
        public int OrderID { get; set; } // PK 
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; } 

        
        public string UserId { get; set; }
        
        // navigation properties

        
        public User User { get; set; } = null!;

        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
