using BookStore.DTO;
using BookStore.Services.OrderSvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

        private readonly IOrderService _orderService;

        public CartController(IOrderService orderService)
        {
            _orderService = orderService;
        }


        [HttpGet]
        public IActionResult GetCart()
        {
            var cart = HttpContext.Session.GetString("Cart");
            return Ok(cart == null ? new List<OrderDetailDTO>() : JsonConvert.DeserializeObject<List<OrderDetailDTO>>(cart));
        }

        [HttpPost]
        public IActionResult AddToCart([FromBody] OrderDetailDTO item)
        {
            var cart = HttpContext.Session.GetString("Cart");

            var cartItems = cart == null ? new List<OrderDetailDTO>() : JsonConvert.DeserializeObject<List<OrderDetailDTO>>(cart);

            var existingItem = cartItems.FirstOrDefault(c => c.BookID == item.BookID);
            if (existingItem == null)
            {

                existingItem.Quantity += item.Quantity;
            }
            else
            {
                cartItems.Add(existingItem);
            }

            HttpContext.Session.SetString("Cart", JsonConvert.SerializeObject(cartItems));
            return Ok(cartItems);
        }

        [HttpDelete("{bookId}")]

        public IActionResult RemoveFromCart(int bookId)
        {
            var cart = HttpContext.Session.GetString("Cart");
            if (cart == null) return NotFound();


            var cartItems = JsonConvert.DeserializeObject<List<OrderDetailDTO>>(cart);

            cartItems = cartItems.Where(c => c.BookID != bookId).ToList();

            HttpContext.Session.SetString("Cart", JsonConvert.SerializeObject(cartItems));
            return Ok(cartItems);
        }
    }
}
