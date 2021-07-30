using System.Threading.Tasks;
using SocialNetwork.API.Helpers;
using SocialNetwork.API.Models;

namespace SocialNetwork.API.Data
{
    public interface IAuthRepository
    {
         Task<ServiceResponse<int>> Register(User user, string password);

         Task<ServiceResponse<string>> Login(string username, string password);

         Task<bool> UserExist(string username);

         Task<ServiceResponse<string>> GuestLogin();


    }
}