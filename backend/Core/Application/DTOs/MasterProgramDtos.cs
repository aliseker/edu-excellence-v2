namespace EduExcellenceV2.Application.DTOs;

public class MasterProgramDetailDto
{
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Concentrations { get; set; } = new();
}

public class MasterProgramRequirementDto
{
    public List<string> Language { get; set; } = new();
    public List<string> Academic { get; set; } = new();
    public List<string> Documents { get; set; } = new();
}

public class MasterProgramCreateUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string ProgramType { get; set; } = string.Empty;
    public string University { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public string? CountryName { get; set; }
    public string? CountrySlug { get; set; }
    public int? CityId { get; set; }
    public string? CityName { get; set; }
    public string? Duration { get; set; }
    public string? ShortDescription { get; set; }
    public string? Established { get; set; }
    public string? Students { get; set; }
    public string? Ranking { get; set; }
    public string? Intro { get; set; }
    public string? Location { get; set; }
    public string Status { get; set; } = "active";
    public string? ImageBase64 { get; set; }
    public List<string> Features { get; set; } = new();
    public List<MasterProgramDetailDto> Programs { get; set; } = new();
    public MasterProgramRequirementDto Requirements { get; set; } = new();
    public List<string> CareerServices { get; set; } = new();
    public List<string> Campus { get; set; } = new();
    public List<string> Accreditation { get; set; } = new();
}

public class MasterProgramDto : MasterProgramCreateUpdateDto
{
    public int Id { get; set; }
}
