using BookStore.DTO;
using FluentValidation;

namespace BookStore.Validators
{
    public class LoginValidator : AbstractValidator<LoginDTO> 
    {

        public LoginValidator() { 
        

            RuleFor(x => x.Username).NotEmpty().WithMessage("Username field is empty.");

            RuleFor(x => x.Password).NotEmpty().WithMessage("Password field is empty.");
            




        }


    }
}
