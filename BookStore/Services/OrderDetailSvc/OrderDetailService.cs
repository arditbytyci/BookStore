using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.OrderDetailInterface;
using BookStore.Models;

namespace BookStore.Services.OrderDetailSvc
{
    public class OrderDetailService : IOrderDetailService
    {

        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IMapper _mapper;
        public OrderDetailService(IOrderDetailRepository orderDetailRepository, IMapper mapper)
        {
            _orderDetailRepository = orderDetailRepository;
            _mapper = mapper;
        }


        //CREATE 

        public async Task<OrderDetailDTO> CreateOrderDetailAsync(OrderDetailDTO orderDetailDTO)
        {
            var orderdtl = _mapper.Map<OrderDetail>(orderDetailDTO);

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
