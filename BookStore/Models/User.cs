using Microsoft.AspNetCore.Identity;

namespace BookStore.Models
{
    public class User : IdentityUser
    {
       
        public string? FullName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        public Customer? Customer;
        public ICollection<Order> Orders { get; set; } = new List<Order>();

    }
}
