using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly CloudinaryService _cloudinaryService;

    public UploadController(CloudinaryService cloudinaryService)
    {
        _cloudinaryService = cloudinaryService;
    }

    [HttpPost("image")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        try
        {
            var imageUrl = await _cloudinaryService.UploadImageAsync(file);
            return Ok(new { imageUrl });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpPost("upload/author-image")]
    public async Task<IActionResult> UploadAuthorImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        try
        {
            var imageUrl = await _cloudinaryService.UploadImageAsync(file);
            return Ok(new { imageUrl });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}