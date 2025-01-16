using AutoMapper;
using BookStore.DTO;
using BookStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BookStore.Services.AuthenticationService
{
    public class AuthService : IAuthService
    {

        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _mapper = mapper;
            
        }

        public async Task<string> RegisterAsync(RegisterDTO registerDto)
        {
            if (string.IsNullOrEmpty(registerDto.Role))
            {
                registerDto.Role = "Customer"; // Default role
            }
            else if (registerDto.Role != "Admin" && registerDto.Role != "Customer")
            {
                throw new ArgumentException("Invalid role. Role must be either 'Admin' or 'Customer'.");
            }

            // Ensure you map the correct role value
            var user = _mapper.Map<User>(registerDto);

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            // Create the role if it does not exist
            if (!await _roleManager.RoleExistsAsync(registerDto.Role))
            {
                await _roleManager.CreateAsync(new IdentityRole(registerDto.Role));
            }

            // Add the user to the correct role (Admin or Customer)
            await _userManager.AddToRoleAsync(user, registerDto.Role);

            return "User registered successfully!";
        }


        public async Task<string?> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password)) return null;

            var userRoles = await _userManager.GetRolesAsync(user);





            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));
           



            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(

                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)

                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
