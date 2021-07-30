using System;

namespace SocialNetwork.API.Dtos
{
    public class AddPostDto
    {
        public string Text { get; set; }
        
        public int UserId { get; set; }

        public DateTime DateAdded { get; set; }

        public AddPostDto()
        {
            this.DateAdded=DateTime.Now;
            
            
        }

    }
}