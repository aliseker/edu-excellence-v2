namespace EduExcellenceV2.Application.DTOs;

public class LanguageSchoolCourseDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Hours { get; set; } = string.Empty;
}

public class LanguageSchoolAccommodationDto
{
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class LanguageSchoolCreateUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public string? CountryName { get; set; }
    public string? CountrySlug { get; set; }
    public int? CityId { get; set; }
    public string? CityName { get; set; }
    public string? Flag { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public string? Established { get; set; }
    public string? Students { get; set; }
    public string? Website { get; set; }
    public string Status { get; set; } = "active";
    public string? ImageBase64 { get; set; }
    public List<string> Features { get; set; } = new();
    public List<LanguageSchoolCourseDto> Courses { get; set; } = new();
    public List<LanguageSchoolAccommodationDto> Accommodation { get; set; } = new();
    public List<string> Facilities { get; set; } = new();
    public List<string> Accreditation { get; set; } = new();
}

public class LanguageSchoolDto : LanguageSchoolCreateUpdateDto
{
    public int Id { get; set; }
}
