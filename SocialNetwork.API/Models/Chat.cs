namespace SocialNetwork.API.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public string Message { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}