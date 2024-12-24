using AutoMapper;
using BookStore.DTO;
using BookStore.Interfaces.UserInterface;
using BookStore.Models;

namespace BookStore.Services.UserSvc
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper) {
            _userRepository = userRepository;
            _mapper = mapper;
        }


        //CREATE

        public async Task<UserDTO> CreateUserAsync(UserDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);

            await _userRepository.AddAsync(user);

            return _mapper.Map<UserDTO>(user);  
        }

        //READ

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }

        //READ:id 
        
        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            return user == null ? null : _mapper.Map<UserDTO>(user);
        }

        //UPDATE

        public async Task<bool> UpdateUserAsync(int id, UserDTO userDto)
        {
            var user = await GetUserByIdAsync(id);

            if (user == null) return false;

            _mapper.Map(userDto, user);

            return true;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null) return false;

            await _userRepository.DeleteAsync(id);

            return true;
            
        }
    }
}
