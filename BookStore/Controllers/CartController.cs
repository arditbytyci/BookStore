using BookStore.DTO;
using BookStore.Services.OrderSvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

        private readonly IOrderService _orderService;
        private readonly IConfiguration _configuration;
        public CartController(IOrderService orderService, IConfiguration configuration)
        {
            _orderService = orderService;
            _configuration = configuration;
        }



        [HttpPost("payment-intent")]
        public IActionResult CreatePaymentIntent([FromBody] PaymentIntentRequest request)
        {
            if (request == null || request.Amount <= 0)
            {
                return BadRequest("Invalid payment request");
            }

            var stripeSK = _configuration["Stripe:SecretKey"];

            if(string.IsNullOrEmpty(stripeSK))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Stripe key not found");
            }

            StripeConfiguration.ApiKey = stripeSK;

            var options = new PaymentIntentCreateOptions
            {
                Amount = request.Amount,
                Currency = "EUR",
                PaymentMethodTypes = new List<string> { "card" }

            };



            var service = new PaymentIntentService();

            var paymentIntent = service.Create(options);

            return Ok(new { clientSecret = paymentIntent.ClientSecret });
        }



        [HttpPost("order")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
        {
            if (request == null)
            {
                return BadRequest("Order request is null");
            }

            if (request.OrderDetails == null || !request.OrderDetails.Any())
            {
                return BadRequest("Order must contain at least one order detail");
            }

            if (request.TotalAmount <= 0)
            {
                return BadRequest("Total amount must be greater than zero");
            }

            if (request == null)
            {
                return BadRequest("Order request is null");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { message = "Validation failed", errors = errors });
            }

            // Optionally log for debugging
            Console.WriteLine(JsonConvert.SerializeObject(request));

            var order = new OrderDTO
            {
                UserId = request.UserId,
                OrderID = request.OrderID,
                Email = request.Email,
                FullName = request.FullName,
                OrderDate = request.OrderDate,
                TotalAmount = request.TotalAmount,
                OrderDetails = request.OrderDetails,
            };

            await _orderService.CreateOrderAsync(order);

            return Ok("Order created successfully");
        }

    }
}
