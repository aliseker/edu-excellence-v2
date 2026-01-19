namespace EduExcellenceV2.Domain.Entities;

public class LanguageSchool : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public CountryEntity? Country { get; set; }
    public int? CityId { get; set; }
    public City? City { get; set; }
    public string? Flag { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public string? Established { get; set; }
    public string? Students { get; set; }
    public string? Website { get; set; }
    public string Status { get; set; } = "active";
    public string? ImageBase64 { get; set; }
    public string? FeaturesJson { get; set; }
    public string? CoursesJson { get; set; }
    public string? AccommodationJson { get; set; }
    public string? FacilitiesJson { get; set; }
    public string? AccreditationJson { get; set; }
}
