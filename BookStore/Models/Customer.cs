namespace BookStore.Models
{
    public class Customer
    {
        public int CustomerID { get; set; } // PK 

        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }
        public string? PhoneNumber { get; set; }


        public int UserID { get; set; } // FK


        public User? User { get; set; } // one-to-one

        public ICollection<Order> Orders { get; set; } = new List<Order>(); // one to many





    }
}
