using System.Text.Json.Serialization;

namespace SocialNetwork.API.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string PhotoUrl { get; set; }

        public string PublicId { get; set; }

        public bool isMain { get; set; }
        
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}