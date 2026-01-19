using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class LanguageSchoolService : ILanguageSchoolService
{
    private readonly EduExcellenceDbContext _dbContext;

    public LanguageSchoolService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<LanguageSchoolDto>> GetAllAsync()
    {
        var items = await _dbContext.LanguageSchools
            .Include(x => x.City)
            .Include(x => x.Country)
            .OrderByDescending(x => x.Id)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<LanguageSchoolDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.LanguageSchools
            .Include(x => x.City)
            .Include(x => x.Country)
            .FirstOrDefaultAsync(x => x.Id == id);

        return entity == null ? null : ToDto(entity);
    }

    public async Task<LanguageSchoolDto> CreateAsync(LanguageSchoolCreateUpdateDto dto)
    {
        var entity = new LanguageSchool();
        await ApplyDtoAsync(entity, dto);
        _dbContext.LanguageSchools.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, LanguageSchoolCreateUpdateDto dto)
    {
        var entity = await _dbContext.LanguageSchools.FirstOrDefaultAsync(x => x.Id == id);
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
        var entity = await _dbContext.LanguageSchools.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.LanguageSchools.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private async Task ApplyDtoAsync(LanguageSchool entity, LanguageSchoolCreateUpdateDto dto)
    {
        var country = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == dto.CountryId);
        if (country == null)
        {
            throw new ArgumentException("Geçersiz ülke değeri.");
        }

        entity.Name = dto.Name;
        entity.CountryId = country.Id;
        entity.Flag = dto.Flag;
        entity.Description = dto.Description;
        entity.Location = dto.Location;
        entity.Established = dto.Established;
        entity.Students = dto.Students;
        entity.Website = dto.Website;
        entity.Status = dto.Status;
        entity.ImageBase64 = dto.ImageBase64;
        entity.FeaturesJson = JsonHelper.Serialize(dto.Features);
        entity.CoursesJson = JsonHelper.Serialize(dto.Courses);
        entity.AccommodationJson = JsonHelper.Serialize(dto.Accommodation);
        entity.FacilitiesJson = JsonHelper.Serialize(dto.Facilities);
        entity.AccreditationJson = JsonHelper.Serialize(dto.Accreditation);

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

    private static LanguageSchoolDto ToDto(LanguageSchool entity)
    {
        return new LanguageSchoolDto
        {
            Id = entity.Id,
            Name = entity.Name,
            CountryId = entity.CountryId,
            CountryName = entity.Country?.Name,
            CountrySlug = entity.Country?.Slug,
            CityId = entity.CityId,
            CityName = entity.City?.Name,
            Flag = entity.Flag,
            Description = entity.Description,
            Location = entity.Location,
            Established = entity.Established,
            Students = entity.Students,
            Website = entity.Website,
            Status = entity.Status,
            ImageBase64 = entity.ImageBase64,
            Features = JsonHelper.Deserialize<List<string>>(entity.FeaturesJson) ?? new(),
            Courses = JsonHelper.Deserialize<List<LanguageSchoolCourseDto>>(entity.CoursesJson) ?? new(),
            Accommodation = JsonHelper.Deserialize<List<LanguageSchoolAccommodationDto>>(entity.AccommodationJson) ?? new(),
            Facilities = JsonHelper.Deserialize<List<string>>(entity.FacilitiesJson) ?? new(),
            Accreditation = JsonHelper.Deserialize<List<string>>(entity.AccreditationJson) ?? new()
        };
    }
}
