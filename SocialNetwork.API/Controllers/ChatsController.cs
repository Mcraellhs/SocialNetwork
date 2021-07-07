using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.API.Data;
using SocialNetwork.API.Dtos;

namespace SocialNetwork.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatsController : ControllerBase
    {
        private readonly ISocialNetworkRepository _repo;

        public ChatsController(ISocialNetworkRepository repo)
        {
            _repo = repo;

        }




        [HttpGet]

        public async Task<IActionResult> GetMessages(){

            return Ok(await _repo.getMessages());
        }


        [HttpPost]

        public async Task<IActionResult> SendMessage(SentMessageDto request){
            await _repo.sendMessage(request);
            return StatusCode(201);
        }

    }
}