using BookStore.DTO;
using BookStore.Services.OrderSvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {


        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();

            if(orders == null) return NotFound();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if(order == null) return NotFound();
            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDTO orderDto)
        {

            var createdOrder = await _orderService.CreateOrderAsync(orderDto);

            return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.OrderID }, createdOrder);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id,[FromBody] OrderDTO orderDto)
        {
            var success = await _orderService.UpdateOrderAsync(id, orderDto);

            if(!success) return NotFound();

            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var success = await _orderService.DeleteOrderAsync(id);

            if(!success) return NotFound();

            return NoContent();
        }



    }
}
