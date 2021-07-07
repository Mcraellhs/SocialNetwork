using System.Collections.Generic;
using SocialNetwork.API.Models;

namespace SocialNetwork.API.Dtos
{
    public class GetUserDtoDetailed
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string University { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public List<Post> Posts { get; set; }
        
    }
}