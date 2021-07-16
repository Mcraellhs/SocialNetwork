using System.Linq;
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
            /*   .ForMember(dest=>dest.ProfilePicture,opt=>{
                opt.MapFrom(src=>src.ProfilePicture.FirstOrDefault(p=>p.isMain).PhotoUrl);
            });   */
            CreateMap<AddPostDto,Post>();
            CreateMap<SentMessageDto,Chat>();
            //CreateMap<UserForUpdateDto,User>();
            CreateMap<Photo,PhotoToReturnDto>();
            CreateMap<PhotoToAddDto,Photo>();


            
        }
    }
}