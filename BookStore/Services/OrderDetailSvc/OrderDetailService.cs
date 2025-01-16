using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.BookInterface;
using BookStore.Interfaces.OrderDetailInterface;
using BookStore.Models;

namespace BookStore.Services.OrderDetailSvc
{
    public class OrderDetailService : IOrderDetailService
    {

        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;
        public OrderDetailService(IOrderDetailRepository orderDetailRepository, IMapper mapper, IBookRepository bookRepository)
        {
            _orderDetailRepository = orderDetailRepository;
            _mapper = mapper;
            _bookRepository = bookRepository;
        }


        //CREATE 

        public async Task<OrderDetailDTO> CreateOrderDetailAsync(OrderDetailDTO orderDetailDTO)
        {
            var orderdtl = _mapper.Map<OrderDetail>(orderDetailDTO);
            var book = await _bookRepository.GetByIdAsync(orderDetailDTO.BookID);


            if (book == null) {
                throw new Exception("Book not found");
            }

            orderdtl.Book = book;

            await _orderDetailRepository.AddAsync(orderdtl);

            return _mapper.Map<OrderDetailDTO>(orderdtl);


        }

        //READ 

        public async Task<IEnumerable<OrderDetailDTO>> GetAllOrderDetailsAsync()
        {
            var odtls = await _orderDetailRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<OrderDetailDTO>>(odtls);
        }


        //READ:id
        public async Task<OrderDetailDTO> GetOrderDetailByIdAsync(int id)
        {
            var odtl = await _orderDetailRepository.GetByIdAsync(id);

            return odtl == null ? null : _mapper.Map<OrderDetailDTO>(odtl);
        }

        public async Task<bool> UpdateOrderDetailAsync(int id, OrderDetailDTO orderDetailDTO)
        {
            var odtl = await GetOrderDetailByIdAsync(id);

            if (odtl == null) return false;

            _mapper.Map(orderDetailDTO, odtl);

            return true;

        }

        public async Task<bool> DeleteOrderDetailAsync(int id)
        {
            var odtl = await _orderDetailRepository.GetByIdAsync(id);

            if(odtl == null) return false;

            await _orderDetailRepository.DeleteAsync(id);

            return true;
        }



    }
}
