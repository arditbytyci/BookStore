using BookStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DATA
{
    public class BookContext : IdentityDbContext<User>
    {


        public BookContext(DbContextOptions<BookContext> options) : base(options) { }





        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }

     





       








        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

     
            modelBuilder.Entity<Order>()
    .HasOne(o => o.User)
    .WithMany(u => u.Orders)
    .HasForeignKey(o => o.UserId)
    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Book>()
                .HasOne(b => b.Author)
                .WithMany(a => a.Books)
                .HasForeignKey(b => b.AuthorID)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Book>()
                .HasOne(b => b.Genre)
                .WithMany(g => g.Books)
                .HasForeignKey(b => b.GenreID)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderID);

            modelBuilder.Entity<OrderDetail>()
                 .HasOne(od => od.Book)
                 .WithMany(b => b.OrderDetails)
                 .HasForeignKey(od => od.BookID)
                 .OnDelete(DeleteBehavior.Restrict);



        }
    }
}
