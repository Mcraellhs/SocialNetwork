using AutoMapper;
using SocialNetwork.API.Dtos;
using SocialNetwork.API.Models;

namespace SocialNetwork.API
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User,GetUserDto>();
            CreateMap<AddPostDto,Post>();
            CreateMap<SentMessageDto,Chat>();
            //CreateMap<UserForUpdateDto,User>();


            
        }
    }
}