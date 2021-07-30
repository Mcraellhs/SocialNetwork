using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.API.Data;
using SocialNetwork.API.Dtos;

namespace SocialNetwork.API.Controllers
{

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ISocialNetworkRepository _repo;
        //private readonly IMapper _mapper;
        public UsersController(ISocialNetworkRepository repo)
        {
          //  _mapper = mapper;
            _repo = repo;

        }
        
        
        [HttpGet]

        public async Task<IActionResult> GetUsers()
        {


            var usersToReturn = await _repo.getUsers();

            return Ok(usersToReturn);




        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {

            var userToreturn = await _repo.getUser(id);
            return Ok(userToreturn);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            return Ok(await _repo.updateUser(id,userForUpdateDto));
           

           /*  if(await _repo.SaveAll()){

                return NoContent();
            }

            return BadRequest();

 */




        }





    }
}