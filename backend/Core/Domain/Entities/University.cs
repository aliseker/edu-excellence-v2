namespace EduExcellenceV2.Domain.Entities;

public class University : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public CountryEntity? Country { get; set; }
    public int? CityId { get; set; }
    public City? City { get; set; }
    public string? Ranking { get; set; }
    public string? Established { get; set; }
    public string? Students { get; set; }
    public string? Description { get; set; }
    public string? Intro { get; set; }
    public string? VideoUrl { get; set; }
    public string? Location { get; set; }
    public string Status { get; set; } = "active";
    public string? ImageBase64 { get; set; }
    public string? FeaturesJson { get; set; }
    public string? ProgramsJson { get; set; }
    public string? RequirementsJson { get; set; }
    public string? CampusJson { get; set; }
    public string? AccommodationJson { get; set; }
    public string? ScholarshipsJson { get; set; }
}
