using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class HighSchoolService : IHighSchoolService
{
    private readonly EduExcellenceDbContext _dbContext;

    public HighSchoolService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<CountryOptionDto>> GetCountriesAsync(string? status = "active")
    {
        var hsQuery = _dbContext.HighSchools.AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
        {
            var st = status.Trim().ToLower();
            hsQuery = hsQuery.Where(x => x.Status.ToLower() == st);
        }

        var countryIds = await hsQuery
            .Select(x => x.CountryId)
            .Distinct()
            .ToListAsync();

        return await _dbContext.Countries
            .Where(c => countryIds.Contains(c.Id))
            .OrderBy(c => c.Name)
            .Select(c => new CountryOptionDto
            {
                Id = c.Id,
                Value = c.Slug,
                Label = c.Name
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<HighSchoolDto>> GetAllAsync(int? countryId = null, int? cityId = null, string? search = null, string? status = null)
    {
        var query = _dbContext.HighSchools
            .Include(x => x.City)
            .Include(x => x.Country)
            .AsQueryable();

        if (countryId.HasValue && countryId.Value > 0)
        {
            query = query.Where(x => x.CountryId == countryId.Value);
        }

        if (cityId.HasValue && cityId.Value > 0)
        {
            query = query.Where(x => x.CityId == cityId.Value);
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            var st = status.Trim().ToLower();
            query = query.Where(x => x.Status.ToLower() == st);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(x => x.Name.ToLower().Contains(s));
        }

        var items = await query
            .OrderByDescending(x => x.Id)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<HighSchoolDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.HighSchools
            .Include(x => x.City)
            .Include(x => x.Country)
            .FirstOrDefaultAsync(x => x.Id == id);

        return entity == null ? null : ToDto(entity);
    }

    public async Task<HighSchoolDto> CreateAsync(HighSchoolCreateUpdateDto dto)
    {
        var entity = new HighSchool();
        await ApplyDtoAsync(entity, dto);
        _dbContext.HighSchools.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, HighSchoolCreateUpdateDto dto)
    {
        var entity = await _dbContext.HighSchools.FirstOrDefaultAsync(x => x.Id == id);
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
        var entity = await _dbContext.HighSchools.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.HighSchools.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private async Task ApplyDtoAsync(HighSchool entity, HighSchoolCreateUpdateDto dto)
    {
        var country = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == dto.CountryId);
        if (country == null)
        {
            throw new ArgumentException("Geçersiz ülke değeri.");
        }

        entity.Name = dto.Name;
        entity.CountryId = country.Id;
        entity.Description = dto.Description;
        entity.WhySchool = dto.WhySchool;
        entity.Location = dto.Location;
        entity.Established = dto.Established;
        entity.Students = dto.Students;
        entity.Website = dto.Website;
        entity.Status = dto.Status;
        entity.SchoolType = string.IsNullOrWhiteSpace(dto.SchoolType) ? "Devlet" : dto.SchoolType.Trim();
        entity.ImageBase64 = dto.ImageBase64;

        entity.FeaturesJson = JsonHelper.Serialize(dto.Features);
        entity.ProgramOptionsJson = JsonHelper.Serialize(dto.ProgramOptions);
        entity.AccommodationOptionsJson = JsonHelper.Serialize(dto.AccommodationOptions);
        entity.FacilitiesJson = JsonHelper.Serialize(dto.Facilities);
        entity.RequirementsJson = JsonHelper.Serialize(dto.Requirements);
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

    private static HighSchoolDto ToDto(HighSchool entity)
    {
        return new HighSchoolDto
        {
            Id = entity.Id,
            Name = entity.Name,
            CountryId = entity.CountryId,
            CountryName = entity.Country?.Name,
            CountrySlug = entity.Country?.Slug,
            CityId = entity.CityId,
            CityName = entity.City?.Name,
            Description = entity.Description,
            WhySchool = entity.WhySchool,
            Location = entity.Location,
            Established = entity.Established,
            Students = entity.Students,
            Website = entity.Website,
            Status = entity.Status,
            SchoolType = entity.SchoolType ?? "Devlet",
            ImageBase64 = entity.ImageBase64,
            Features = JsonHelper.Deserialize<List<string>>(entity.FeaturesJson) ?? new(),
            ProgramOptions = JsonHelper.Deserialize<List<HighSchoolTitledOptionDto>>(entity.ProgramOptionsJson) ?? new(),
            AccommodationOptions = JsonHelper.Deserialize<List<HighSchoolTitledOptionDto>>(entity.AccommodationOptionsJson) ?? new(),
            Facilities = JsonHelper.Deserialize<List<string>>(entity.FacilitiesJson) ?? new(),
            Requirements = JsonHelper.Deserialize<List<string>>(entity.RequirementsJson) ?? new(),
            Accreditation = JsonHelper.Deserialize<List<string>>(entity.AccreditationJson) ?? new()
        };
    }
}

