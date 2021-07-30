using System;
using System.Text.Json.Serialization;

namespace SocialNetwork.API.Models
{
    public class Post
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime DateAdded { get; set; }
        
        public int UserId { get; set; }
          [JsonIgnore]
        public User User { get; set; }
    }
}