using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.API.Data;
using SocialNetwork.API.Dtos;
using SocialNetwork.API.Helpers;

namespace SocialNetwork.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }
         [HttpPost("register")]

         public async Task<IActionResult> Register(UserRegisterDto request){

             ServiceResponse<int> serviceRespone = await _repo.Register(
                 new Models.User{
                     Username=request.Username,
                     Firstname=request.Firstname,
                     Lastname=request.Lastname,
                     Email=request.Email,
                     University=request.University

                     
                 }, request.Password
             );

             if(!serviceRespone.Success==true){
               return BadRequest(serviceRespone);
             }

             return StatusCode(201);



  
         }

         [HttpPost("login")]

         public async Task<IActionResult> Login(UserLoginDto request){
      
      ServiceResponse<string> serviceResponse = await _repo.Login(request.Username,request.Password);

      if(!serviceResponse.Success){
          return BadRequest(serviceResponse);
      }
      return Ok(serviceResponse);

         }

         [HttpGet("guestLogin")]
         public async Task<IActionResult> GuestLogin(){

             ServiceResponse<string> serviceResponse = await _repo.GuestLogin();
             return Ok(serviceResponse);
         }
    }
}