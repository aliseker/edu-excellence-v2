namespace EduExcellenceV2.Application.DTOs;

public class UniversityProgramDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
}

public class UniversityRequirementDto
{
    public List<string> Language { get; set; } = new();
    public List<string> Academic { get; set; } = new();
    public List<string> Documents { get; set; } = new();
}

public class UniversityAccommodationDto
{
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class UniversityCreateUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public string? CountryName { get; set; }
    public string? CountrySlug { get; set; }
    public int? CityId { get; set; }
    public string? CityName { get; set; }
    public string? Ranking { get; set; }
    public string? Established { get; set; }
    public string? Students { get; set; }
    public string? Description { get; set; }
    public string? Intro { get; set; }
    public string? VideoUrl { get; set; }
    public string? Location { get; set; }
    public string Status { get; set; } = "active";
    public string? ImageBase64 { get; set; }
    public List<string> Features { get; set; } = new();
    public List<UniversityProgramDto> Programs { get; set; } = new();
    public UniversityRequirementDto Requirements { get; set; } = new();
    public List<string> Campus { get; set; } = new();
    public List<UniversityAccommodationDto> Accommodation { get; set; } = new();
    public List<string> Scholarships { get; set; } = new();
}

public class UniversityDto : UniversityCreateUpdateDto
{
    public int Id { get; set; }
}
