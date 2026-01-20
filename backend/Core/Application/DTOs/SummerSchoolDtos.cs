namespace EduExcellenceV2.Application.DTOs;

public class SummerSchoolProgramDto
{
    public string Lessons { get; set; } = string.Empty;
    public List<string> Activities { get; set; } = new();
    public List<string> Excursions { get; set; } = new();
}

public class SummerSchoolAccommodationDto
{
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Meals { get; set; } = string.Empty;
}

public class SummerSchoolCreateUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public string? CountryName { get; set; }
    public string? CountrySlug { get; set; }
    public int? CityId { get; set; }
    public string? CityName { get; set; }
    public string? Description { get; set; }
    public string? AgeRange { get; set; }
    public string? Duration { get; set; }
    public string? Location { get; set; }
    public string? Website { get; set; }
    public string Status { get; set; } = "active";
    public string? ImageBase64 { get; set; }
    public List<string> Features { get; set; } = new();
    public SummerSchoolProgramDto Program { get; set; } = new();
    public List<SummerSchoolAccommodationDto> Accommodation { get; set; } = new();
    public List<string> Included { get; set; } = new();
    public List<string> Dates { get; set; } = new();
}

public class SummerSchoolDto : SummerSchoolCreateUpdateDto
{
    public int Id { get; set; }
}
