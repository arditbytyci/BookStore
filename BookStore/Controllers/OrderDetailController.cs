using BookStore.DTO;
using BookStore.Services.OrderDetailSvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {

        private readonly IOrderDetailService _orderDetailService;


        public OrderDetailController(IOrderDetailService orderDetailService)
        {
            _orderDetailService = orderDetailService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrderDetails()
        {
            var odtls = await _orderDetailService.GetAllOrderDetailsAsync();

            if (odtls == null) return NotFound();

            return Ok(odtls);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetailsById(int id)
        {
            var odtl = await _orderDetailService.GetOrderDetailByIdAsync(id);

            if (odtl == null) return NotFound();

            return Ok(odtl);    
        }



        [HttpPost]
        public async Task<IActionResult> CreateOrderDetail([FromBody] OrderDetailDTO orderDetailDto)
        {
            var createdODtl = await _orderDetailService.CreateOrderDetailAsync(orderDetailDto);

            return CreatedAtAction(nameof(GetOrderDetailsById), new { orderDetailId = createdODtl.OrderDetailID }, createdODtl);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderDetail(int id, [FromBody] OrderDetailDTO orderDetailDTO)
        {
            var success = await _orderDetailService.UpdateOrderDetailAsync(id, orderDetailDTO);

            if(!success) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            var success = await _orderDetailService.DeleteOrderDetailAsync(id);

            if(!success) return NotFound();

            return NoContent();
        }

    }
}
