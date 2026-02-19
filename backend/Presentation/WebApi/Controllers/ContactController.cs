using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Application.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace EduExcellenceV2.Presentation.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpPost]
    [EnableRateLimiting("ContactPolicy")]
    [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Submit([FromBody] ContactRequestDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { message = "Geçersiz istek." });
        }

        if (string.IsNullOrWhiteSpace(dto.Name) ||
            string.IsNullOrWhiteSpace(dto.Email) ||
            string.IsNullOrWhiteSpace(dto.Message))
        {
            return BadRequest(new { message = "Ad, e-posta ve mesaj alanları zorunludur." });
        }

        if (dto.Name.Length > 200)
        {
            return BadRequest(new { message = "Ad soyad en fazla 200 karakter olabilir." });
        }
        if (!string.IsNullOrWhiteSpace(dto.Subject) && dto.Subject.Length > 200)
        {
            return BadRequest(new { message = "Konu en fazla 200 karakter olabilir." });
        }
        if (dto.Message.Length > 5000)
        {
            return BadRequest(new { message = "Mesaj en fazla 5000 karakter olabilir." });
        }

        var sanitizedDto = new ContactRequestDto
        {
            Name = InputSanitizer.Sanitize(dto.Name),
            Email = InputSanitizer.Sanitize(dto.Email),
            Phone = string.IsNullOrWhiteSpace(dto.Phone) ? null : InputSanitizer.Sanitize(dto.Phone),
            Subject = InputSanitizer.Sanitize(dto.Subject),
            Message = InputSanitizer.Sanitize(dto.Message)
        };

        if (string.IsNullOrWhiteSpace(sanitizedDto.Name) ||
            string.IsNullOrWhiteSpace(sanitizedDto.Email) ||
            string.IsNullOrWhiteSpace(sanitizedDto.Message))
        {
            return BadRequest(new { message = "Geçersiz veya güvenlik nedeniyle reddedilen giriş." });
        }

        try
        {
            await _contactService.SendContactEmailAsync(sanitizedDto);
            return Ok(new { message = "Mesajınız başarıyla gönderildi." });
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Mesaj gönderilirken bir hata oluştu." });
        }
    }
}

