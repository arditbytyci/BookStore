using BookStore.Models;

namespace BookStore.Interfaces.UserInterface
{
    public interface IUserRepository : IRepository<User>
    {

        Task<User> GetUserByIdAsync(string id);
        Task DeleteUserAsync(string id);

        Task<User?> GetUserByUsernameAsync(string username);

    }
}
