namespace EduExcellenceV2.Application.DTOs;

public class ApplicationRequestDto
{
    public string ProgramType { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string? University { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? BirthDate { get; set; }
    public string EducationLevel { get; set; } = string.Empty;
    public string Gpa { get; set; } = string.Empty;
    public string? LanguageScore { get; set; }
    public string? LanguageTest { get; set; }
    public string? Message { get; set; }
}
