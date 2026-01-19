namespace EduExcellenceV2.Application.DTOs;

public class CityCreateUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public int CountryId { get; set; }
}

public class CityDto : CityCreateUpdateDto
{
    public int Id { get; set; }
}
