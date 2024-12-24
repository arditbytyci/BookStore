using BookStore.DTO;

namespace BookStore.Services.CustomerSvc
{
    public interface ICustomerService
    {

        Task<IEnumerable<CustomerDTO>> GetAllCustomersAsync();

        Task<CustomerDTO> GetCustomerByIdAsync(int id);

        Task<CustomerDTO> CreateCustomerAsync(CustomerDTO customerDTO);

        Task<bool> UpdateCustomerAsync(int id, CustomerDTO customerDTO);    

        Task<bool> DeleteCustomerAsync(int id);


    }
}
