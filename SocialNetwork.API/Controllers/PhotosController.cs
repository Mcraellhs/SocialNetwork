using System.Security.Claims;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SocialNetwork.API.Data;
using SocialNetwork.API.Dtos;
using SocialNetwork.API.Helpers;

namespace SocialNetwork.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("users/{userId}/photos")]
    public class PhotosController : ControllerBase
    {
        private readonly ISocialNetworkRepository _repo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;

        private Cloudinary _cloudinary;
        public PhotosController(ISocialNetworkRepository repo, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }


      [HttpGet("{id}", Name ="GetPhoto")]

      public async Task<IActionResult> GetPhoto(int id){

          var photoFromRepo = await _repo.GetPhoto(id);

          return Ok(photoFromRepo);
      }


      [HttpPost]

      public async Task<IActionResult> CreatePhoto(int userId,
      [FromForm]PhotoForCreateDto photoForCreateDto){
  
          if(userId !=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
              return Unauthorized();
          }

          

          var file = photoForCreateDto.File;

          var uploadResult = new ImageUploadResult();

          if(file.Length>0){

              using(var stream=file.OpenReadStream()){

                  var uploadParams = new ImageUploadParams(){
                      File = new FileDescription(file.Name, stream),
                      Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                  };

                  uploadResult=_cloudinary.Upload(uploadParams);

              }
          }

          photoForCreateDto.PhotoUrl=uploadResult.Url.ToString();
          photoForCreateDto.PublicId=uploadResult.PublicId;
          
           
          if(await _repo.CreatePhoto(userId,photoForCreateDto)){
             return Ok("Photo added");
          }

          return BadRequest("Could not add Photo");




      }

      [HttpPost("{id}/setMain")]

      public async Task<IActionResult> SetMainPhoto(int userId,
      int id){

          if(userId !=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
              return Unauthorized();
          }

          if(await _repo.SetMainPhoto(userId,id)){
              return NoContent();
          }

          return BadRequest();


      }

      [HttpDelete("{id}")]

      public async Task<IActionResult> DeleteUserPhoto(int id, int userId){
            if(userId !=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
              return Unauthorized();
          }

          if(await _repo.DeletePhotoFromUser(id)){
              return NoContent();
          }
          else{
              return BadRequest();
          }

      }


        
    }
}