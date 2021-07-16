using System.Collections.Generic;
using System.Threading.Tasks;
using SocialNetwork.API.Dtos;
using SocialNetwork.API.Helpers;
using SocialNetwork.API.Models;

namespace SocialNetwork.API.Data
{
    public interface ISocialNetworkRepository
    {

        Task<List<GetUserDto>> getUsers();
        Task<GetUserDto> getUser(int id);

        Task<List<GetPostsDto>> getPosts();

        Task<ServiceResponse<int>> addPost(AddPostDto addPostDto);

        Task<List<GetMessagesDto>> getMessages();

        Task<ServiceResponse<int>> sendMessage(SentMessageDto sentMessageDto);

        Task<bool> updateUser(int id,UserForUpdateDto userForUpdateDto);

        Task<bool> SaveAll();

        Task<bool> deletePost(int id);

        Task<bool> CreatePhoto(int id, PhotoForCreateDto photoForCreateDto);

        Task<PhotoToReturnDto> GetPhoto(int id);






         
    }
}