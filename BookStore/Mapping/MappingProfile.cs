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
            CreateMap<Book, BookDTO>().ReverseMap();
        }
    }
}
