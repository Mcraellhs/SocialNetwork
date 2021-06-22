using Microsoft.EntityFrameworkCore;
using SocialNetwork.API.Models;

namespace SocialNetwork.API.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options):base(options){}

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        
            
        
        
    }
}