using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.API.Dtos
{
    public class UserRegisterDto
    {
        [Required]
        [StringLength(20,MinimumLength =3,ErrorMessage ="Field must be between 3 - 20 characters long")]
        public string Username { get; set; }

        [StringLength(20,MinimumLength =4,ErrorMessage ="Field must be between 4 - 20 characters long")]
        [Required]
        public string Password { get; set; }

        [Required]
        [StringLength(50,MinimumLength =2,ErrorMessage ="Field must be at least 2 characters long")]
         public string Firstname { get; set; }

        [Required]
        [StringLength(50,MinimumLength =2,ErrorMessage ="Field must be at least 2 characters long")]
        public string Lastname { get; set; }

        [Required]
        [StringLength(50,MinimumLength =4,ErrorMessage ="Field must be at least 4 characters long")]
        public string Email { get; set; }

        [Required]
        [StringLength(50,MinimumLength =4,ErrorMessage ="Field must be at least 4 characters long")]
        public string University { get; set; }
    }
}