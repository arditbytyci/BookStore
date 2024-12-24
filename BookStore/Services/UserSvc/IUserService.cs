using BookStore.DTO;

namespace BookStore.Services.UserSvc
{
    public interface IUserService
    {

        Task<IEnumerable<UserDTO>> GetAllUsersAsync();

        Task<UserDTO> GetUserByIdAsync(int id);

        Task<UserDTO> CreateUserAsync(UserDTO userDTO);

        Task<bool> UpdateUserAsync(int id,UserDTO userDTO);

        Task<bool> DeleteUserAsync(int id);
    }
}
