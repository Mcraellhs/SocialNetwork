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
        private string defaultUrl="https://res.cloudinary.com/theviciousasp/image/upload/v1626458763/defaultuser_kc3obe.jpg";
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

                    
                    var users =await _context.Users.FirstOrDefaultAsync(x=>x.Id==listOfPost[i].UserId);
                    var photo = await _context.Photos.FirstOrDefaultAsync(x=>x.UserId==users.Id);
                    getPostsDto.Username=users.Username;
                    getPostsDto.PostId=listOfPost[i].Id;
                    getPostsDto.DateAdded=listOfPost[i].DateAdded;
                    if(photo!=null){
                       
                    getPostsDto.UserPhotoUrl=photo.PhotoUrl;
                    }
                    
                    // get photos instead of users profile pictures

                    
                    
                    
                    
                    
                    


                    posts.Add(getPostsDto);
                    
                 } 

                

                 return posts;
                 

            
            
        }

        public async Task<GetUserDto> getUser(int id)
        {
            var user = _mapper.Map<GetUserDto>(await _context.Users.Include(p=>p.ProfilePicture).Include(s=>s.Posts).FirstOrDefaultAsync(x => x.Id == id));
           /*  var photo = await _context.Photos.FirstAsync(x=>x.UserId==id);
            user.ProfilePicture.Add(photo); */
         //  user.MainPhotoUrl=user.ProfilePicture.First(x=>x.isMain).PhotoUrl;
         if(!user.ProfilePicture.Exists(x=>x.isMain==true)){
             if(user.ProfilePicture.Count==0){
                 user.MainPhotoUrl=this.defaultUrl;
                 
             }
             else
             user.MainPhotoUrl=user.ProfilePicture.First().PhotoUrl;
         }
         else
            user.MainPhotoUrl=user.ProfilePicture.First(x=>x.isMain).PhotoUrl;
            return user;
        }

        public async Task<List<GetUserDto>> getUsers()
        {
            var user = await _context.Users.Include(p=>p.ProfilePicture).Include(s=>s.Posts).Select(x => _mapper.Map<GetUserDto>(x)).ToListAsync();
             for(int i=0;i<user.Count;i++){
                //user[i].MainPhotoUrl=user[i].ProfilePicture.First().PhotoUrl;
                
                if(user[i].ProfilePicture.Count!=0){
                    if(!user[i].ProfilePicture.Exists(x=>x.isMain==true)){
                        


                        user[i].MainPhotoUrl=user[i].ProfilePicture.First().PhotoUrl;

                    }
                    else{
                    
                    user[i].MainPhotoUrl=user[i].ProfilePicture.First(x=>x.isMain).PhotoUrl;

                    }

                }
                else{
                    user[i].MainPhotoUrl=this.defaultUrl;
                }
            }  
            

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

        public async Task<bool> CreatePhoto(int id, PhotoForCreateDto photoForCreateDto)
        {
                 PhotoToAddDto photoToAddDto = new PhotoToAddDto();
       /*      var user = await _context.Users.FirstOrDefaultAsync(c=>c.Id==id);

            var photoToADD= new Photo();
            photoToADD.PublicId=photoForCreateDto.PublicId;
            photoToADD.PhotoUrl=photoForCreateDto.PhotoUrl;
        

            user.ProfilePicture.Add(photoToADD);

             _context.Update(user); */
             photoToAddDto.PhotoUrl=photoForCreateDto.PhotoUrl;
             photoToAddDto.PublicId=photoForCreateDto.PublicId;
             photoToAddDto.UserId=id;
            await _context.Photos.AddAsync(_mapper.Map<Photo>(photoToAddDto));
           
            

            if(await _context.SaveChangesAsync()>0){
                return true;
            }
            return false;
         

            
            
        }

        public async Task<PhotoToReturnDto> GetPhoto(int id)
        {
            var photo=await _context.Photos.FirstOrDefaultAsync(c=>c.Id==id);

            


            return _mapper.Map<PhotoToReturnDto>(photo);
        }

        public async Task<bool> SetMainPhoto(int userId,int id)
        {
            
            var photosWithId = await _context.Photos.FirstOrDefaultAsync(x=>x.Id==id);
            var photos=await _context.Photos.Where(u=>u.UserId==userId).FirstOrDefaultAsync(p=>p.isMain);
            if(photos!=null){
            photos.isMain=false;

            }
            photosWithId.isMain=true;

            if(await _context.SaveChangesAsync()>0){
            return true;

            }
            return false;
        }

        public async Task<bool> DeletePhotoFromUser(int id)
        {
            var photoToDelete= await _context.Photos.FirstOrDefaultAsync(x=>x.Id==id);

            _context.Remove(photoToDelete);

            if(await _context.SaveChangesAsync()>0){
                return true;
            }
            return false;
        }
    }
}