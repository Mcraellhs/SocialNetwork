using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.API.Dtos;
using SocialNetwork.API.Helpers;
using SocialNetwork.API.Models;

namespace SocialNetwork.API.Data
{
    public class SocialNetworkRepository : ISocialNetworkRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpaccessor;

        public SocialNetworkRepository(DataContext context, IMapper mapper, IHttpContextAccessor httpaccessor)
        {
            _httpaccessor = httpaccessor;
            _mapper = mapper;
            _context = context;

        }

      //  private int getUserId()=>int.Parse(_httpaccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        public async Task<List<GetPostsDto>> getPosts()
        {
            List<GetPostsDto> posts = new List<GetPostsDto>();


  
                //return await _context.Posts.ToListAsync();

                var listOfPost= await _context.Posts.ToListAsync();
               
                    
                 
                  for(int i=0;i<listOfPost.Count;i++){
             var getPostsDto = new GetPostsDto();
                   

                    getPostsDto.Text=listOfPost[i].Text;

                    
                    var seta =await _context.Users.FirstOrDefaultAsync(x=>x.Id==listOfPost[i].UserId);
                    getPostsDto.Username=seta.Username;
                    getPostsDto.PostId=listOfPost[i].Id;


                    posts.Add(getPostsDto);
                    
                 } 

                

                 return posts;
                 

            
            
        }

        public async Task<GetUserDto> getUser(int id)
        {
            var user = _mapper.Map<GetUserDto>(await _context.Users.FirstOrDefaultAsync(x => x.Id == id));
            return user;
        }

        public async Task<List<GetUserDto>> getUsers()
        {
            var user = await _context.Users.Select(x => _mapper.Map<GetUserDto>(x)).ToListAsync();
            return user;
        }

        public async Task<ServiceResponse<int>> addPost(AddPostDto addPostDto)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();

            await _context.Posts.AddAsync(_mapper.Map<Post>(addPostDto));
            await _context.SaveChangesAsync();
            response.Data=addPostDto.UserId;

            return response;
            
            
        }

        public async Task<ServiceResponse<int>> sendMessage(SentMessageDto sentMessageDto)
        {
             ServiceResponse<int> response = new ServiceResponse<int>();

            await _context.Chats.AddAsync(_mapper.Map<Chat>(sentMessageDto));
            await _context.SaveChangesAsync();
            response.Data=sentMessageDto.UserId;

            return response;
            
        }

        public async Task<List<GetMessagesDto>> getMessages()
        {
            List<GetMessagesDto> messages = new List<GetMessagesDto>();


  
                

                var listOfMessages= await _context.Chats.ToListAsync();
               
                    
                 
                  for(int i=0;i<listOfMessages.Count;i++){
             var getMessagesDto = new GetMessagesDto();
                   

                    getMessagesDto.Message=listOfMessages[i].Message;

                    
                    var seta =await _context.Users.FirstOrDefaultAsync(x=>x.Id==listOfMessages[i].UserId);
                    getMessagesDto.Username=seta.Username;


                    messages.Add(getMessagesDto);
                    
                 } 

                

                 return messages;
                 
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public async Task<bool> updateUser(int id,UserForUpdateDto userForUpdateDto)
        {
           
            var user= await _context.Users.FirstOrDefaultAsync(c=>c.Id==id);

            user.Username=userForUpdateDto.Username;
            user.Firstname=userForUpdateDto.Firstname;
            user.Lastname=userForUpdateDto.Lastname;
            user.Email=userForUpdateDto.Email;
            user.University=userForUpdateDto.University;

            _context.Update(user);
            if(await _context.SaveChangesAsync()>0){
                return true;
            }

          
            return false;

            
        }

        public async Task<bool> deletePost(int id)
        {

            var postToDelete= await _context.Posts.FirstAsync(c=>c.Id==id);

           

             _context.Posts.Remove(postToDelete);

             if(await _context.SaveChangesAsync()>0){
                 return true;
             }
             return false;
            
        }
    }
}