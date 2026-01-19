namespace EduExcellenceV2.Application.DTOs;

public class CountryCreateUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}

public class CountryDto : CountryCreateUpdateDto
{
    public int Id { get; set; }
}
