using BookStore.Models;

namespace BookStore.Interfaces.CustomerInterface
{
    public interface ICustomerRepository : IRepository<Customer>
    {

        Task<IEnumerable<Customer>> GetAllCustomersWithUsers();

        Task<Customer> GetCustomersWithUsersById(int id);




    }
}
