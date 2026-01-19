using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class UniversityService : IUniversityService
{
    private readonly EduExcellenceDbContext _dbContext;

    public UniversityService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<UniversityDto>> GetAllAsync()
    {
        var items = await _dbContext.Universities
            .Include(x => x.City)
            .Include(x => x.Country)
            .OrderByDescending(x => x.Id)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<UniversityDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Universities
            .Include(x => x.City)
            .Include(x => x.Country)
            .FirstOrDefaultAsync(x => x.Id == id);

        return entity == null ? null : ToDto(entity);
    }

    public async Task<UniversityDto> CreateAsync(UniversityCreateUpdateDto dto)
    {
        var entity = new University();
        await ApplyDtoAsync(entity, dto);
        _dbContext.Universities.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, UniversityCreateUpdateDto dto)
    {
        var entity = await _dbContext.Universities.FirstOrDefaultAsync(x => x.Id == id);
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
        var entity = await _dbContext.Universities.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.Universities.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private async Task ApplyDtoAsync(University entity, UniversityCreateUpdateDto dto)
    {
        var country = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == dto.CountryId);
        if (country == null)
        {
            throw new ArgumentException("Geçersiz ülke değeri.");
        }

        entity.Name = dto.Name;
        entity.CountryId = country.Id;
        entity.Ranking = dto.Ranking;
        entity.Established = dto.Established;
        entity.Students = dto.Students;
        entity.Description = dto.Description;
        entity.Intro = dto.Intro;
        entity.VideoUrl = dto.VideoUrl;
        entity.Location = dto.Location;
        entity.Status = dto.Status;
        entity.ImageBase64 = dto.ImageBase64;
        entity.FeaturesJson = JsonHelper.Serialize(dto.Features);
        entity.ProgramsJson = JsonHelper.Serialize(dto.Programs);
        entity.RequirementsJson = JsonHelper.Serialize(dto.Requirements);
        entity.CampusJson = JsonHelper.Serialize(dto.Campus);
        entity.AccommodationJson = JsonHelper.Serialize(dto.Accommodation);
        entity.ScholarshipsJson = JsonHelper.Serialize(dto.Scholarships);

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

    private static UniversityDto ToDto(University entity)
    {
        return new UniversityDto
        {
            Id = entity.Id,
            Name = entity.Name,
            CountryId = entity.CountryId,
            CountryName = entity.Country?.Name,
            CountrySlug = entity.Country?.Slug,
            CityId = entity.CityId,
            CityName = entity.City?.Name,
            Ranking = entity.Ranking,
            Established = entity.Established,
            Students = entity.Students,
            Description = entity.Description,
            Intro = entity.Intro,
            VideoUrl = entity.VideoUrl,
            Location = entity.Location,
            Status = entity.Status,
            ImageBase64 = entity.ImageBase64,
            Features = JsonHelper.Deserialize<List<string>>(entity.FeaturesJson) ?? new(),
            Programs = JsonHelper.Deserialize<List<UniversityProgramDto>>(entity.ProgramsJson) ?? new(),
            Requirements = JsonHelper.Deserialize<UniversityRequirementDto>(entity.RequirementsJson) ?? new(),
            Campus = JsonHelper.Deserialize<List<string>>(entity.CampusJson) ?? new(),
            Accommodation = JsonHelper.Deserialize<List<UniversityAccommodationDto>>(entity.AccommodationJson) ?? new(),
            Scholarships = JsonHelper.Deserialize<List<string>>(entity.ScholarshipsJson) ?? new()
        };
    }
}
