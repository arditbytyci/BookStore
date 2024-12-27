using BookStore.DTO;
using BookStore.Services.CustomerSvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly ICustomerService _customerService;


        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _customerService.GetAllCustomersAsync();

            if (customers == null) return NotFound();

            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            var custoner = await _customerService.GetCustomerByIdAsync(id);

            if (custoner == null) return NotFound();

            return Ok(custoner);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerDTO customerDTO)
        {
            var createdCustomer = await _customerService.CreateCustomerAsync(customerDTO);

            return CreatedAtAction(nameof(GetCustomerById), new { id = createdCustomer.CustomerID }, createdCustomer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] CustomerDTO customerDTO)
        {
            var success = await _customerService.UpdateCustomerAsync(id, customerDTO);

            if(!success) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var success = await _customerService.DeleteCustomerAsync(id);

            if(!success) return NotFound();

            return NoContent();
        }
    }
}
