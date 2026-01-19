namespace EduExcellenceV2.Domain.Entities;

public class City : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public CountryEntity? Country { get; set; }
}
