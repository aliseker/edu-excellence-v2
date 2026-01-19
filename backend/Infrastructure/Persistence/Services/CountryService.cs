using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class CountryService : ICountryService
{
    private readonly EduExcellenceDbContext _dbContext;

    public CountryService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<CountryDto>> GetAllAsync()
    {
        var items = await _dbContext.Countries
            .OrderBy(x => x.Name)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<CountryDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<CountryDto> CreateAsync(CountryCreateUpdateDto dto)
    {
        var entity = new CountryEntity
        {
            Name = dto.Name,
            Slug = dto.Slug,
            IsActive = dto.IsActive
        };
        _dbContext.Countries.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, CountryCreateUpdateDto dto)
    {
        var entity = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        entity.Name = dto.Name;
        entity.Slug = dto.Slug;
        entity.IsActive = dto.IsActive;
        entity.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.Countries.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private static CountryDto ToDto(CountryEntity entity)
    {
        return new CountryDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Slug = entity.Slug,
            IsActive = entity.IsActive
        };
    }
}
