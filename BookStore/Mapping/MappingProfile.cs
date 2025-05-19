using AutoMapper;
using BookStore.DTO;
using BookStore.Models;

namespace BookStore.Mapping
{
    public class MapperProfile : Profile
    {

        public MapperProfile()
        {



         


       


        // RegisterDTO and LoginDTO Mappings
        CreateMap<RegisterDTO, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Username))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // Password is hashed by Identity
                .ReverseMap();

            CreateMap<LoginDTO, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Username))
                .ReverseMap();


            //Author
            CreateMap<Author, AuthorDTO>().ForMember(dest => dest.Books, opt => opt.MapFrom(src => src.Books)).ReverseMap();

            

            //Book
            CreateMap<Book, BookDTO>().ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Name))
                .ForMember(dest => dest.GenreName, opt => opt.MapFrom(src => src.Genre.GenreName)).ReverseMap()
                .ForMember(dest => dest.Author, opt => opt.Ignore())
                .ForMember(dest => dest.Genre, opt => opt.Ignore());

            //Genre
            CreateMap<Genre, GenreDTO>().ForMember(dest => dest.Books, opt => opt.MapFrom(src => src.Books)).ReverseMap();



            //Order
            CreateMap<Order, OrderDTO>()
    .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName))
    .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails)) // Map OrderDetails
    .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
    .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id)) // Correctly map to UserId
    .ReverseMap()
    .ForMember(dest => dest.User, opt => opt.Ignore()) // Ignore navigation property to User
    .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails)); // Map OrderDetails back





            //OrderDetail
            CreateMap<OrderDetail, OrderDetailDTO>()
    .ForMember(dest => dest.BookName, opt => opt.MapFrom(src => src.Book.Title))
    .ForMember(dest => dest.BookPrice, opt => opt.MapFrom(src => src.Book.Price))
    .ForMember(dest => dest.OrderID, opt => opt.MapFrom(src => src.Order.OrderID)) // Map OrderID to OrderDetailDTO
    .ReverseMap()
    .ForMember(dest => dest.Book, opt => opt.Ignore())
    .ForMember(dest => dest.Order, opt => opt.Ignore());



        


            //User
         CreateMap<User, UserDTO>()
        .ForMember(dest => dest.Role, opt => opt.Ignore()) // Ignore role here
     
        .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
        .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
         .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders))
        .ReverseMap();

        }
    }
}
