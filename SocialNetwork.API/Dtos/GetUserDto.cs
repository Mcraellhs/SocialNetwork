using System.Collections.Generic;
using SocialNetwork.API.Models;

namespace SocialNetwork.API.Dtos
{
    public class GetUserDto
    {

         public int Id { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string University { get; set; }

        public string MainPhotoUrl { get; set; }

        public List<Photo> ProfilePicture {get; set;}
        public List<Post> Posts { get; set; }

        
    }
}