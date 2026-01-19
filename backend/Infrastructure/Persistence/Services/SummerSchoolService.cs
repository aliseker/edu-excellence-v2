using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class SummerSchoolService : ISummerSchoolService
{
    private readonly EduExcellenceDbContext _dbContext;

    public SummerSchoolService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<SummerSchoolDto>> GetAllAsync()
    {
        var items = await _dbContext.SummerSchools
            .Include(x => x.City)
            .Include(x => x.Country)
            .OrderByDescending(x => x.Id)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<SummerSchoolDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.SummerSchools
            .Include(x => x.City)
            .Include(x => x.Country)
            .FirstOrDefaultAsync(x => x.Id == id);

        return entity == null ? null : ToDto(entity);
    }

    public async Task<SummerSchoolDto> CreateAsync(SummerSchoolCreateUpdateDto dto)
    {
        var entity = new SummerSchool();
        await ApplyDtoAsync(entity, dto);
        _dbContext.SummerSchools.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, SummerSchoolCreateUpdateDto dto)
    {
        var entity = await _dbContext.SummerSchools.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        await ApplyDtoAsync(entity, dto);
        entity.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _dbContext.SummerSchools.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.SummerSchools.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private async Task ApplyDtoAsync(SummerSchool entity, SummerSchoolCreateUpdateDto dto)
    {
        var country = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == dto.CountryId);
        if (country == null)
        {
            throw new ArgumentException("Geçersiz ülke değeri.");
        }

        entity.Name = dto.Name;
        entity.CountryId = country.Id;
        entity.Description = dto.Description;
        entity.AgeRange = dto.AgeRange;
        entity.Duration = dto.Duration;
        entity.Location = dto.Location;
        entity.Website = dto.Website;
        entity.Status = dto.Status;
        entity.ImageBase64 = dto.ImageBase64;
        entity.FeaturesJson = JsonHelper.Serialize(dto.Features);
        entity.ProgramJson = JsonHelper.Serialize(dto.Program);
        entity.AccommodationJson = JsonHelper.Serialize(dto.Accommodation);
        entity.IncludedJson = JsonHelper.Serialize(dto.Included);
        entity.DatesJson = JsonHelper.Serialize(dto.Dates);

        entity.CityId = await ResolveCityIdAsync(dto.CityId, dto.CityName, country.Id);
    }

    private async Task<int?> ResolveCityIdAsync(int? cityId, string? cityName, int countryId)
    {
        if (cityId.HasValue)
        {
            var city = await _dbContext.Cities.FirstOrDefaultAsync(x => x.Id == cityId.Value);
            if (city == null || city.CountryId != countryId)
            {
                throw new ArgumentException("Şehir ülkeye ait değil.");
            }

            return cityId;
        }

        if (string.IsNullOrWhiteSpace(cityName))
        {
            return null;
        }

        var existing = await _dbContext.Cities.FirstOrDefaultAsync(x =>
            x.CountryId == countryId && x.Name.ToLower() == cityName.Trim().ToLower());

        if (existing != null)
        {
            return existing.Id;
        }

        var newCity = new City { Name = cityName.Trim(), CountryId = countryId };
        _dbContext.Cities.Add(newCity);
        await _dbContext.SaveChangesAsync();
        return newCity.Id;
    }

    private static SummerSchoolDto ToDto(SummerSchool entity)
    {
        return new SummerSchoolDto
        {
            Id = entity.Id,
            Name = entity.Name,
            CountryId = entity.CountryId,
            CountryName = entity.Country?.Name,
            CountrySlug = entity.Country?.Slug,
            CityId = entity.CityId,
            CityName = entity.City?.Name,
            Description = entity.Description,
            AgeRange = entity.AgeRange,
            Duration = entity.Duration,
            Location = entity.Location,
            Website = entity.Website,
            Status = entity.Status,
            ImageBase64 = entity.ImageBase64,
            Features = JsonHelper.Deserialize<List<string>>(entity.FeaturesJson) ?? new(),
            Program = JsonHelper.Deserialize<SummerSchoolProgramDto>(entity.ProgramJson) ?? new(),
            Accommodation = JsonHelper.Deserialize<List<SummerSchoolAccommodationDto>>(entity.AccommodationJson) ?? new(),
            Included = JsonHelper.Deserialize<List<string>>(entity.IncludedJson) ?? new(),
            Dates = JsonHelper.Deserialize<List<string>>(entity.DatesJson) ?? new()
        };
    }
}
