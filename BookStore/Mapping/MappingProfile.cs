using AutoMapper;
using BookStore.DTO;
using BookStore.Models;

namespace BookStore.Mapping
{
    public class MapperProfile : Profile
    {

        public MapperProfile()
        {
            CreateMap<Author, AuthorDTO>().ReverseMap();
            CreateMap<Book, BookDTO>().ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Name))
                .ForMember(dest => dest.GenreName, opt => opt.MapFrom(src => src.Genre.GenreName)).ReverseMap().ForMember(dest => dest.Author, opt => opt.Ignore()).ForMember(dest => dest.Genre, opt => opt.Ignore());
            CreateMap<Genre, GenreDTO>().ForMember(dest => dest.Books, opt => opt.MapFrom(src => src.Books)).ReverseMap();
            CreateMap<Order, OrderDTO>().ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.FullName))
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails))
                .ReverseMap();
            CreateMap<OrderDetail, OrderDetailDTO>().ForMember(dest => dest.BookName, opt => opt.MapFrom(src => src.Book.Title))
                .ForMember(dest => dest.BookPrice, opt => opt.MapFrom(src => src.Book.Price))
                .ReverseMap();
            CreateMap<Customer, CustomerDTO>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders))
                .ReverseMap();
            CreateMap<User, UserDTO>().ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Customer.FullName))
                                       .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Customer.Phone))
                                       .ForMember(dest => dest.CustomerID, opt => opt.MapFrom(src => src.Customer.CustomerID))
                                       .ReverseMap();    
        }
    }
}
