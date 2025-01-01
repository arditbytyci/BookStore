using BookStore.DTO;

namespace BookStore.Services.UserSvc
{
    public interface IUserService
    {

        Task<IEnumerable<UserDTO>> GetAllUsersAsync();

        Task<UserDTO> GetUserByIdAsync(string id);

        Task<UserDTO> CreateUserAsync(UserDTO userDTO);

        Task<bool> UpdateUserAsync(string id,UserDTO userDTO);

        Task<bool> DeleteUserAsync(string id);
    }
}
