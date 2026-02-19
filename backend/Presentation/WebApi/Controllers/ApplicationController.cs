using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Application.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace EduExcellenceV2.Presentation.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationController : ControllerBase
{
    private readonly IApplicationService _applicationService;

    public ApplicationController(IApplicationService applicationService)
    {
        _applicationService = applicationService;
    }

    [HttpPost]
    [EnableRateLimiting("ContactPolicy")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Submit([FromBody] ApplicationRequestDto dto)
    {
        if (dto == null)
        {
            return BadRequest(new { message = "Geçersiz istek." });
        }

        if (string.IsNullOrWhiteSpace(dto.ProgramType))
            return BadRequest(new { message = "Program türü zorunludur." });
        if (string.IsNullOrWhiteSpace(dto.Country))
            return BadRequest(new { message = "Ülke zorunludur." });
        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Trim().Length < 2)
            return BadRequest(new { message = "Ad soyad en az 2 karakter olmalıdır." });
        if (string.IsNullOrWhiteSpace(dto.Email))
            return BadRequest(new { message = "E-posta zorunludur." });
        if (string.IsNullOrWhiteSpace(dto.EducationLevel))
            return BadRequest(new { message = "Eğitim seviyesi zorunludur." });
        if (string.IsNullOrWhiteSpace(dto.Gpa))
            return BadRequest(new { message = "Not ortalaması (GPA) zorunludur." });

        var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$");
        if (!emailRegex.IsMatch(dto.Email.Trim()))
            return BadRequest(new { message = "Geçerli bir e-posta adresi girin." });

        if (!IsValidGpa(dto.Gpa.Trim()))
            return BadRequest(new { message = "Not ortalaması 0-5 arasında, ondalıklı olabilir (örn: 3.5) olmalıdır." });

        if (dto.Name.Length > 200)
            return BadRequest(new { message = "Ad soyad en fazla 200 karakter olabilir." });
        if (dto.ProgramType.Length > 100)
            return BadRequest(new { message = "Program türü en fazla 100 karakter olabilir." });
        if (dto.Country.Length > 100)
            return BadRequest(new { message = "Ülke en fazla 100 karakter olabilir." });
        if (!string.IsNullOrWhiteSpace(dto.Message) && dto.Message.Length > 5000)
            return BadRequest(new { message = "Mesaj en fazla 5000 karakter olabilir." });

        var sanitizedDto = new ApplicationRequestDto
        {
            ProgramType = InputSanitizer.Sanitize(dto.ProgramType),
            Country = InputSanitizer.Sanitize(dto.Country),
            University = string.IsNullOrWhiteSpace(dto.University) ? null : InputSanitizer.Sanitize(dto.University),
            Name = InputSanitizer.Sanitize(dto.Name),
            Email = InputSanitizer.Sanitize(dto.Email),
            Phone = string.IsNullOrWhiteSpace(dto.Phone) ? null : InputSanitizer.Sanitize(dto.Phone),
            BirthDate = string.IsNullOrWhiteSpace(dto.BirthDate) ? null : InputSanitizer.Sanitize(dto.BirthDate),
            EducationLevel = InputSanitizer.Sanitize(dto.EducationLevel),
            Gpa = InputSanitizer.Sanitize(dto.Gpa),
            LanguageScore = string.IsNullOrWhiteSpace(dto.LanguageScore) ? null : InputSanitizer.Sanitize(dto.LanguageScore),
            LanguageTest = string.IsNullOrWhiteSpace(dto.LanguageTest) ? null : InputSanitizer.Sanitize(dto.LanguageTest),
            Message = string.IsNullOrWhiteSpace(dto.Message) ? null : InputSanitizer.Sanitize(dto.Message)
        };

        try
        {
            await _applicationService.SubmitApplicationAsync(sanitizedDto);
            return Ok(new { message = "Başvurunuz başarıyla gönderildi." });
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Başvuru gönderilirken bir hata oluştu." });
        }
    }

    private static bool IsValidGpa(string gpa)
    {
        if (string.IsNullOrWhiteSpace(gpa)) return false;
        if (!double.TryParse(gpa.Replace(',', '.'), System.Globalization.NumberStyles.AllowDecimalPoint, System.Globalization.CultureInfo.InvariantCulture, out var num))
            return false;
        return num >= 0 && num <= 5;
    }
}
