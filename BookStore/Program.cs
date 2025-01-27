using BookStore.DATA;
using BookStore.Interfaces.AuthorInterface;
using BookStore.Interfaces.BookInterface;
using BookStore.Interfaces.CustomerInterface;
using BookStore.Interfaces.GenreInterface;
using BookStore.Interfaces.OrderDetailInterface;
using BookStore.Interfaces.OrderInterface;
using BookStore.Interfaces.UserInterface;
using BookStore.Models;
using BookStore.Repositories.AuthorRepo;
using BookStore.Repositories.BookRepo;
using BookStore.Repositories.CustomerRepo;
using BookStore.Repositories.GenreRepo;
using BookStore.Repositories.OrderDetailRepo;
using BookStore.Repositories.OrderRepo;
using BookStore.Repositories.UserRepo;
using BookStore.Services.AuthenticationService;
using BookStore.Services.AuthorSvc;
using BookStore.Services.BookSvc;
using BookStore.Services.CustomerSvc;
using BookStore.Services.GenreSvc;
using BookStore.Services.OrderDetailSvc;
using BookStore.Services.OrderSvc;
using BookStore.Services.UserSvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol.Core.Types;
using Stripe;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.






builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Stripe
StripeConfiguration.ApiKey = builder.Configuration["Stripe: SecretKey"];



builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<BookContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddControllersWithViews();

//Author
builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
builder.Services.AddScoped<IAuthorService, AuthorService>();

//Book
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IBookService, BookService>();
var configuration = builder.Configuration;


//Genre 
builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<IGenreService, GenreService>();

//Order 
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

//OrderDetail
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();

//Customer 


//User 
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

//Auth 
builder.Services.AddScoped<IAuthService, AuthService>();



// Retrieve JWT settings
var key = configuration["Jwt:Key"];
var issuer = configuration["Jwt:Issuer"];
var audience = configuration["Jwt:Audience"];


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Allow your frontend origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
{
    throw new ArgumentNullException("JWT configuration is missing values.");
}
//Identity
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
})
    .AddEntityFrameworkStores<BookContext>()
    .AddDefaultTokenProviders();



builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    var conf = app.Services.GetRequiredService<IConfiguration>();

    await SeedRolesAndAdminAsync(roleManager, userManager, conf);

   
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSession();


app.UseCors("AllowSpecificOrigins");


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


async Task SeedRolesAndAdminAsync(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, IConfiguration conf)
{
    var roles = new[] { "Admin", "Customer" };

    // Create roles if they don't exist
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            var roleResult = await roleManager.CreateAsync(new IdentityRole(role));
            Console.WriteLine($"Created role '{role}': {roleResult.Succeeded}");
        }
    }

    // Get the admin user email and password from configuration
    var adminUserName = conf["AdminSettings:UserName"];
    var adminPassword = conf["AdminSettings:Password"];
    Console.WriteLine($"Admin UserName: {adminUserName}, Admin Password: {adminPassword}");

    // Try to find the admin user
    var adminUser = await userManager.FindByNameAsync(adminUserName);
    if (adminUser == null)
    {
        // If the user doesn't exist, create a new one
        adminUser = new User
        {
            UserName = adminUserName,
            
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(adminUser, adminPassword);
        if (result.Succeeded)
        {
            Console.WriteLine($"Admin user created successfully: {adminUser.UserName}");

            // Explicitly assign Admin role
            var roleAssignResult = await userManager.AddToRoleAsync(adminUser, "Admin");
            Console.WriteLine($"Admin role assignment result (after creation): {roleAssignResult.Succeeded}");

            // Optionally check if the assignment is reflected in the database
            var userRoles = await userManager.GetRolesAsync(adminUser);
            Console.WriteLine($"Roles assigned to {adminUser.UserName}: {string.Join(", ", userRoles)}");
        }
        else
        {
            Console.WriteLine($"Error creating admin user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }
    }
    else
    {
        // If the admin user exists, check for roles and assign "Admin" explicitly
        var rolesForUser = await userManager.GetRolesAsync(adminUser);
        if (!rolesForUser.Contains("Admin"))
        {
            // Remove any incorrect roles first
            var removeResult = await userManager.RemoveFromRoleAsync(adminUser, "Customer");
            Console.WriteLine($"Removed Customer role: {removeResult.Succeeded}");

            // Now assign the Admin role explicitly
            var roleAssignResult = await userManager.AddToRoleAsync(adminUser, "Admin");
            Console.WriteLine($"Re-assigned Admin role: {roleAssignResult.Succeeded}");
        }
        else
        {
            Console.WriteLine("Admin role is already assigned to the user.");
        }
    }

    // Optional: Check roles in the database to confirm
    var rolesInDb = await roleManager.Roles.ToListAsync();
    foreach (var role in rolesInDb)
    {
        Console.WriteLine($"Role in DB: {role.Name}");
    }

    var userRolesInDb = await userManager.GetRolesAsync(adminUser);
    Console.WriteLine($"Roles assigned to {adminUser.UserName}: {string.Join(", ", userRolesInDb)}");
}