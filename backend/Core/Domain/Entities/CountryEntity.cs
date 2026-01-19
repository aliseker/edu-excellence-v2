namespace EduExcellenceV2.Domain.Entities;

public class CountryEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public ICollection<City> Cities { get; set; } = new List<City>();
}
