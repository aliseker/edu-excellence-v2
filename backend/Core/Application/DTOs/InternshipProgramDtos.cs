namespace EduExcellenceV2.Application.DTOs;

public class InternshipProgramDetailDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public List<string> Areas { get; set; } = new();
    public List<string> Requirements { get; set; } = new();
}

public class InternshipProgramCreateUpdateDto
{
    public int CountryId { get; set; }
    public string? CountryName { get; set; }
    public string? CountrySlug { get; set; }
    public string GeneralInfo { get; set; } = string.Empty;
    public string Status { get; set; } = "active";
    public List<InternshipProgramDetailDto> Programs { get; set; } = new();
    public List<string> Advantages { get; set; } = new();
    public List<string> ApplicationSteps { get; set; } = new();
    public List<string> RequiredDocuments { get; set; } = new();
}

public class InternshipProgramDto : InternshipProgramCreateUpdateDto
{
    public int Id { get; set; }
}
