using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.OrderInterface;
using BookStore.Interfaces.UserInterface;
using BookStore.Models;

namespace BookStore.Services.OrderSvc
{
    public class OrderService : IOrderService
    {


        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;


        public OrderService(IMapper mapper, IOrderRepository orderRepository, IUserRepository userRepository)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }


        //CREATE 

        public async Task<OrderDTO> CreateOrderAsync(OrderDTO orderDTO)
        {
            var user = await _userRepository.GetUserByIdAsync(orderDTO.UserId);
            if (user == null)
            {
                throw new Exception("User not found."); // Or return a meaningful error response
            }


            var order = _mapper.Map<Order>(orderDTO);

            order.User = user;

            await _orderRepository.AddAsync(order);

            return _mapper.Map<OrderDTO>(order);
        }


        // READ
        public async Task<IEnumerable<OrderDTO>> GetAllOrdersAsync()
        {
            var orders = await _orderRepository.GetAllAsync();
                
            return _mapper.Map<IEnumerable<OrderDTO>>(orders);
        }

        // READ:id
        public async Task<OrderDTO> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);

            return order == null ? null : _mapper.Map<OrderDTO>(order);

        }

        public async Task<bool> UpdateOrderAsync(int id, OrderDTO orderDto)
        {
            var order = await GetOrderByIdAsync(id);

            if (order == null) return false;

            _mapper.Map(orderDto, order);

            return true;
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null) return false;

            await _orderRepository.DeleteAsync(id);
            return true;
        }
    }
}
