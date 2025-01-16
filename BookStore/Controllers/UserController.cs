using BookStore.DTO;
using BookStore.Services.UserSvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();

            if (users == null) return NotFound();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null) return NotFound();

            return Ok(user);

        }

       


        [HttpPost]

        public async Task<IActionResult> CreateUser([FromBody] UserDTO userDto)
        {
            var createdUser = await _userService.CreateUserAsync(userDto);

            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserDTO userDTO)
        {
            var success = await _userService.UpdateUserAsync(id, userDTO);

            if(!success) return NotFound();

            return NoContent();
        }
       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var success = await _userService.DeleteUserAsync(id);
            if(!success) return NotFound();
            return NoContent();
        }
    }
}
