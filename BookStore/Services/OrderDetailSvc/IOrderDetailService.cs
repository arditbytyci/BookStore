using BookStore.DTO;

namespace BookStore.Services.OrderDetailSvc
{
    public interface IOrderDetailService
    {


        Task<IEnumerable<OrderDetailDTO>> GetAllOrderDetailsAsync();

        Task<OrderDetailDTO> GetOrderDetailByIdAsync(int id);

        Task<OrderDetailDTO> CreateOrderDetailAsync(OrderDetailDTO orderDetailDTO);

        Task<bool> UpdateOrderDetailAsync(int id,OrderDetailDTO orderDetailDTO);

        Task<bool> DeleteOrderDetailAsync(int id);


    }
}
