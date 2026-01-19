using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class LocationService : ILocationService
{
    private readonly EduExcellenceDbContext _dbContext;

    public LocationService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<CountryOptionDto> GetCountries()
    {
        return _dbContext.Countries
            .Where(x => x.IsActive)
            .OrderBy(x => x.Name)
            .Select(x => new CountryOptionDto
            {
                Id = x.Id,
                Value = x.Slug,
                Label = x.Name
            })
            .ToList();
    }

    public async Task<IEnumerable<CityOptionDto>> GetCitiesAsync(int countryId)
    {
        return await _dbContext.Cities
            .Where(x => x.CountryId == countryId)
            .OrderBy(x => x.Name)
            .Select(x => new CityOptionDto
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToListAsync();
    }
}
