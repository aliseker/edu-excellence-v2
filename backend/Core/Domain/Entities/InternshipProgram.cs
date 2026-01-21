namespace EduExcellenceV2.Domain.Entities;

public class InternshipProgram : BaseEntity
{
    public int CountryId { get; set; }
    public CountryEntity? Country { get; set; }
    public string GeneralInfo { get; set; } = string.Empty;
    public string Status { get; set; } = "active";
    public string? ProgramsJson { get; set; }
    public string? AdvantagesJson { get; set; }
    public string? ApplicationStepsJson { get; set; }
    public string? RequiredDocumentsJson { get; set; }
}
