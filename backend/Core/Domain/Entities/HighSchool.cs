namespace EduExcellenceV2.Domain.Entities;

public class HighSchool : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public int CountryId { get; set; }
    public CountryEntity? Country { get; set; }

    public int? CityId { get; set; }
    public City? City { get; set; }

    public string? Description { get; set; }
    public string? WhySchool { get; set; }
    public string? Location { get; set; }
    public string? Established { get; set; }
    public string? Students { get; set; }
    public string? Website { get; set; }
    public string Status { get; set; } = "active";

    // Optional image support (frontend may omit)
    public string? ImageBase64 { get; set; }

    public string? FeaturesJson { get; set; }
    public string? ProgramOptionsJson { get; set; }
    public string? AccommodationOptionsJson { get; set; }
    public string? FacilitiesJson { get; set; }
    public string? RequirementsJson { get; set; }
    public string? AccreditationJson { get; set; }
}

