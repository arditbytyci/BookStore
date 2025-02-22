using AutoMapper;
using BookStore.DATA;
using BookStore.DTO;
using BookStore.Interfaces.BookInterface;
using BookStore.Interfaces.OrderInterface;
using BookStore.Interfaces.UserInterface;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Services.OrderSvc
{
    public class OrderService : IOrderService
    {


        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;


        public OrderService(IMapper mapper, IOrderRepository orderRepository, IUserRepository userRepository, IBookRepository bookRepository)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _bookRepository = bookRepository;
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


            var orderDetails = _mapper.Map<List<OrderDetail>>(orderDTO.OrderDetails);
            foreach (var orderDetail in orderDetails)
            {
                // Ensure the Book is mapped from the OrderDetailDTO (based on the BookID)
                // If necessary, you could fetch the book from the database by ID here
                var book = await _bookRepository.GetByIdAsync(orderDetail.BookID);
                if (book != null)
                {
                    orderDetail.Book = book; // Set the Book in the OrderDetail
                    orderDetail.Order = order; // Set the Order in the OrderDetail
                }
                else
                {
                    throw new Exception("Book not found.");
                }
            }


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
