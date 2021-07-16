using Microsoft.AspNetCore.Http;

namespace SocialNetwork.API.Dtos
{
    public class PhotoForCreateDto
    {
        public string PhotoUrl { get; set; }

        public IFormFile File { get; set; }
        public string PublicId { get; set; }


    }
}