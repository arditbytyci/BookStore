using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.CustomerInterface;
using BookStore.Models;

namespace BookStore.Services.CustomerSvc
{
    public class CustomerService : ICustomerService
    {

        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;



        public CustomerService(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        //CREATE

        public async Task<CustomerDTO> CreateCustomerAsync(CustomerDTO customerDTO)
        {
            var customer = _mapper.Map<Customer>(customerDTO);

            await _customerRepository.AddAsync(customer);

            return _mapper.Map<CustomerDTO>(customer);
            
        }

        //READ 
        public async Task<IEnumerable<CustomerDTO>> GetAllCustomersAsync()
        {
            var customers = await _customerRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<CustomerDTO>>(customers);

        }


        //READ: id
        public async Task<CustomerDTO> GetCustomerByIdAsync(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);

            return customer == null ? null : _mapper.Map<CustomerDTO>(customer);
        }

        //Update
        public async Task<bool> UpdateCustomerAsync(int id, CustomerDTO customerDto)
        {
            var customer = await GetCustomerByIdAsync(id);

            if (customer == null) return false;

            _mapper.Map(customerDto, customer);

            return true;
        }


        //Delete
        public async Task<bool> DeleteCustomerAsync(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);


            if(customer == null) return false;
               
            await _customerRepository.DeleteAsync(id);

            return true;

        }


    }
}
