namespace EduExcellenceV2.Domain.Entities;

public class MasterProgram : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string ProgramType { get; set; } = string.Empty;
    public string University { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public CountryEntity? Country { get; set; }
    public int? CityId { get; set; }
    public City? City { get; set; }
    public string? Duration { get; set; }
    public string? ShortDescription { get; set; }
    public string? Established { get; set; }
    public string? Students { get; set; }
    public string? Ranking { get; set; }
    public string? Intro { get; set; }
    public string? Location { get; set; }
    public string Status { get; set; } = "active";
    public string? ImageBase64 { get; set; }
    public string? FeaturesJson { get; set; }
    public string? ProgramsJson { get; set; }
    public string? RequirementsJson { get; set; }
    public string? CareerServicesJson { get; set; }
    public string? CampusJson { get; set; }
    public string? AccreditationJson { get; set; }
}
