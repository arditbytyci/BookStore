using BookStore.DTO;
using BookStore.Services.AuthenticationService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService) { _authService = authService; }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            try
            {
                var result = await _authService.RegisterAsync(registerDTO);
                return Ok(new { message = result });
            }
            catch (Exception ex) { 
              return BadRequest(new {error = ex.Message});
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var token = await _authService.LoginAsync(loginDTO);

            if (token == null) {
                return Unauthorized(new { error = "Invalid username or password" });
            }

            return Ok(new { token });
    }
}
