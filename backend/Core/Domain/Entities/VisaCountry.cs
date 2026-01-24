namespace EduExcellenceV2.Domain.Entities;

public class VisaCountry : BaseEntity
{
    public string CountrySlug { get; set; } = string.Empty;
    public string CountryName { get; set; } = string.Empty;
    public string Flag { get; set; } = string.Empty;
    public string GeneralInfo { get; set; } = string.Empty;
    public string Status { get; set; } = "active";
    public string? VisaTypesJson { get; set; }
    public string? ProcessJson { get; set; }
    public string? DocumentsJson { get; set; }
    public string? ImportantNotesJson { get; set; }
}
