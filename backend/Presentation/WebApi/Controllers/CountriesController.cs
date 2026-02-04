using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduExcellenceV2.Presentation.WebApi.Controllers;

[ApiController]
[Route("api/countries")]
public class CountriesController : ControllerBase
{
    private readonly ICountryService _service;
    private readonly IWebHostEnvironment _env;

    public CountriesController(ICountryService service, IWebHostEnvironment env)
    {
        _service = service;
        _env = env;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CountryCreateUpdateDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] CountryCreateUpdateDto dto)
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

    /// <summary>
    /// Ülke bayrak resmi yükle (multipart/form-data, file key: flag).
    /// </summary>
    [HttpPost("{id:int}/flag")]
    [Authorize]
    public async Task<IActionResult> UploadFlag(int id, IFormFile? flag)
    {
        if (flag == null || flag.Length == 0)
        {
            return BadRequest("Bayrak dosyası gönderilmedi.");
        }

        var allowed = new[] { "image/jpeg", "image/png", "image/webp", "image/gif" };
        if (!allowed.Contains(flag.ContentType.ToLowerInvariant()))
        {
            return BadRequest("Sadece resim dosyaları (JPEG, PNG, WebP, GIF) kabul edilir.");
        }

        if (flag.Length > 2 * 1024 * 1024) // 2 MB
        {
            return BadRequest("Dosya boyutu 2 MB'dan küçük olmalıdır.");
        }

        var country = await _service.GetByIdAsync(id);
        if (country == null)
        {
            return NotFound();
        }

        var ext = flag.FileName.Contains('.') ? Path.GetExtension(flag.FileName).ToLowerInvariant() : ".png";
        if (ext != ".jpg" && ext != ".jpeg" && ext != ".png" && ext != ".webp" && ext != ".gif")
        {
            ext = ".png";
        }

        var uploadsDir = Path.Combine(_env.ContentRootPath, "uploads", "flags");
        Directory.CreateDirectory(uploadsDir);
        var fileName = $"{id}{ext}";
        var filePath = Path.Combine(uploadsDir, fileName);

        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await flag.CopyToAsync(stream);
        }

        var relativePath = "/uploads/flags/" + fileName;
        await _service.SetFlagImageUrlAsync(id, relativePath);

        return Ok(new { flagImageUrl = relativePath });
    }
}
