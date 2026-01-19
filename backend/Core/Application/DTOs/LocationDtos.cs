namespace EduExcellenceV2.Application.DTOs;

public class CountryOptionDto
{
    public int Id { get; set; }
    public string Value { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
}

public class CityOptionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
