using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduExcellenceV2.Presentation.WebApi.Controllers;

[ApiController]
[Route("api/erasmus-pages")]
public class ErasmusPagesController : ControllerBase
{
    private readonly IErasmusPageService _service;
    private readonly IWebHostEnvironment _env;

    public ErasmusPagesController(IErasmusPageService service, IWebHostEnvironment env)
    {
        _service = service;
        _env = env;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("slug/{slug}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var item = await _service.GetBySlugAsync(slug);
        if (item == null)
            return NotFound();
        return Ok(item);
    }

    [HttpGet("{id:int}")]
    [Authorize]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        if (item == null)
            return NotFound();
        return Ok(item);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] ErasmusPageCreateUpdateDto dto)
    {
        try
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (InvalidOperationException ex) when (ex.Message.Contains("zaten eklenmiş"))
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] ErasmusPageCreateUpdateDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpGet("{id:int}/images")]
    [AllowAnonymous]
    public async Task<IActionResult> GetImages(int id)
    {
        var images = await _service.GetImagesAsync(id);
        return Ok(images);
    }

    [HttpPost("{id:int}/images")]
    [Authorize]
    public async Task<IActionResult> AddImage(int id, [FromBody] ErasmusPageImageCreateDto dto)
    {
        if (id != dto.ErasmusPageId)
        {
            return BadRequest(new { message = "ErasmusPageId ile URL'deki id uyuşmuyor." });
        }

        var created = await _service.AddImageAsync(dto);
        return CreatedAtAction(nameof(GetImages), new { id = created.ErasmusPageId }, created);
    }

    [HttpDelete("images/{imageId:int}")]
    [Authorize]
    public async Task<IActionResult> DeleteImage(int imageId)
    {
        var deleted = await _service.DeleteImageAsync(imageId);
        return deleted ? NoContent() : NotFound();
    }

    /// <summary>
    /// PDF yükler; dosya uploads/ekler klasörüne kaydedilir. Dönen path (ekler/xxx.pdf) sayfa kaydında PdfPath olarak kullanılır.
    /// </summary>
    [HttpPost("upload-pdf")]
    [Authorize]
    [RequestSizeLimit(20 * 1024 * 1024)] // 20 MB
    public async Task<IActionResult> UploadPdf(IFormFile file, [FromQuery] string? suggestedName = null)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "Dosya seçilmedi." });

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (ext != ".pdf")
            return BadRequest(new { message = "Sadece PDF dosyası yüklenebilir." });

        var eklerDir = Path.Combine(_env.ContentRootPath, "uploads", "ekler");
        Directory.CreateDirectory(eklerDir);

        var baseName = string.IsNullOrWhiteSpace(suggestedName)
            ? Path.GetFileNameWithoutExtension(file.FileName)
            : suggestedName.Trim();
        baseName = SanitizeFileName(baseName);
        if (string.IsNullOrEmpty(baseName))
            baseName = "document";

        var fileName = baseName + ".pdf";
        var fullPath = Path.Combine(eklerDir, fileName);

        await using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var relativePath = "ekler/" + fileName;
        return Ok(new { path = relativePath });
    }

    private static string SanitizeFileName(string name)
    {
        var invalid = Path.GetInvalidFileNameChars();
        var sanitized = new string(name
            .Where(c => !invalid.Contains(c))
            .ToArray())
            .Trim()
            .Replace(" ", "-");
        return string.IsNullOrEmpty(sanitized) ? "document" : sanitized;
    }
}
