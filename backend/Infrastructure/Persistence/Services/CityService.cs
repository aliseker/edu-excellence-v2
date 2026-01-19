using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class CityService : ICityService
{
    private readonly EduExcellenceDbContext _dbContext;

    public CityService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<CityDto>> GetAllByCountryAsync(int countryId)
    {
        return await _dbContext.Cities
            .Where(x => x.CountryId == countryId)
            .OrderBy(x => x.Name)
            .Select(x => new CityDto
            {
                Id = x.Id,
                Name = x.Name,
                CountryId = x.CountryId
            })
            .ToListAsync();
    }

    public async Task<CityDto> CreateAsync(CityCreateUpdateDto dto)
    {
        var country = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == dto.CountryId);
        if (country == null)
        {
            throw new ArgumentException("Geçersiz ülke.");
        }

        var entity = new City
        {
            Name = dto.Name,
            CountryId = dto.CountryId
        };
        _dbContext.Cities.Add(entity);
        await _dbContext.SaveChangesAsync();
        return new CityDto { Id = entity.Id, Name = entity.Name, CountryId = entity.CountryId };
    }

    public async Task<bool> UpdateAsync(int id, CityCreateUpdateDto dto)
    {
        var entity = await _dbContext.Cities.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        var country = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == dto.CountryId);
        if (country == null)
        {
            throw new ArgumentException("Geçersiz ülke.");
        }

        entity.Name = dto.Name;
        entity.CountryId = dto.CountryId;
        entity.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _dbContext.Cities.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.Cities.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }
}
