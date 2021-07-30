using System;

namespace SocialNetwork.API.Dtos
{
    public class GetPostsDto
    {
        public int PostId { get; set; }
         public string Text { get; set; }

         public string Username { get; set; }
        public DateTime DateAdded { get; set; }
        public string UserPhotoUrl { get; set; }


    }
}