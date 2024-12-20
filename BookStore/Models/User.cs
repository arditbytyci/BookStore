using Microsoft.AspNetCore.Identity;

namespace BookStore.Models
{
    public class User : IdentityUser
    {
       
        public string Role { get; set; } = "Customer";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        public Customer? Customer;

    }
}
