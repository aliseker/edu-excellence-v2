namespace EduExcellenceV2.Domain.Entities;

public class SummerSchool : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public CountryEntity? Country { get; set; }
    public int? CityId { get; set; }
    public City? City { get; set; }
    public string? Description { get; set; }
    public string? AgeRange { get; set; }
    public string? Duration { get; set; }
    public string? Location { get; set; }
    public string? Website { get; set; }
    public string Status { get; set; } = "active";
    public string? ImageBase64 { get; set; }
    public string? FeaturesJson { get; set; }
    public string? ProgramJson { get; set; }
    public string? AccommodationJson { get; set; }
    public string? IncludedJson { get; set; }
    public string? DatesJson { get; set; }
}
