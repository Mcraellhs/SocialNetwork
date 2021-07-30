using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.API.Data;
using SocialNetwork.API.Dtos;

namespace SocialNetwork.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly ISocialNetworkRepository _repo;

        public PostsController(ISocialNetworkRepository repo)
        {
            _repo = repo;

        }



        [HttpGet]

        public async Task<IActionResult> GetPosts()
        {
           
           

           return Ok(await _repo.getPosts());

        }

        [HttpPost]
        public async Task<IActionResult> AddPost(AddPostDto request){

             if(request.UserId !=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
              return Unauthorized();
          }

            
            await _repo.addPost(request);
            return StatusCode(201);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id){

            
            return Ok( await _repo.deletePost(id));

        }

    }
}