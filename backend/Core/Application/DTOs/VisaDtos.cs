namespace EduExcellenceV2.Application.DTOs;

public class VisaTypeDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ProcessingTime { get; set; } = string.Empty;
    public List<string> Requirements { get; set; } = new();
}

public class VisaServiceCreateUpdateDto
{
    public string CountrySlug { get; set; } = string.Empty;
    public string CountryName { get; set; } = string.Empty;
    public string Flag { get; set; } = string.Empty;
    public string GeneralInfo { get; set; } = string.Empty;
    public string Status { get; set; } = "active";
    public List<VisaTypeDto> VisaTypes { get; set; } = new();
    public List<string> Process { get; set; } = new();
    public List<string> Documents { get; set; } = new();
    public List<string> ImportantNotes { get; set; } = new();
}

public class VisaServiceDto : VisaServiceCreateUpdateDto
{
    public int Id { get; set; }
}
