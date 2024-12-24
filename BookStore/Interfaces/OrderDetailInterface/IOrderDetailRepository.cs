using BookStore.Models;

namespace BookStore.Interfaces.OrderDetailInterface
{
    public interface IOrderDetailRepository : IRepository<OrderDetail>
    {

        Task<IEnumerable<OrderDetail>> GetAllOrderDetailsWithOrderAsync();

        Task<OrderDetail> GetOrderDetailByIdAsync(int id);

        Task<IEnumerable<OrderDetail>> GetAllOrderDetailsWithBooksAsync();

        Task<OrderDetail> GetAllOrderDetailsWithBooksByIdAsync(int id);




    }
}
