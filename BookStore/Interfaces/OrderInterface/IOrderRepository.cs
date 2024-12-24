using BookStore.Models;

namespace BookStore.Interfaces.OrderInterface
{
    public interface IOrderRepository : IRepository<Order>
    {

        Task<IEnumerable<Order>> GetOrdersWithCustomersAsync();

        Task<Order> GetOrdersWithCustomersByIdAsync(int id);


    }
}
