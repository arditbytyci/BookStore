namespace BookStore.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string  PasswordHash { get; set; }
        public string Email { get; set; } = null!;
        public string Role { get; set; } = "Customer";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        public Customer? Customer;

    }
}
