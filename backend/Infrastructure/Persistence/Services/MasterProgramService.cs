using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class MasterProgramService : IMasterProgramService
{
    private readonly EduExcellenceDbContext _dbContext;

    public MasterProgramService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<MasterProgramDto>> GetAllAsync()
    {
        var items = await _dbContext.MasterPrograms
            .Include(x => x.City)
            .Include(x => x.Country)
            .OrderByDescending(x => x.Id)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<MasterProgramDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.MasterPrograms
            .Include(x => x.City)
            .Include(x => x.Country)
            .FirstOrDefaultAsync(x => x.Id == id);

        return entity == null ? null : ToDto(entity);
    }

    public async Task<MasterProgramDto> CreateAsync(MasterProgramCreateUpdateDto dto)
    {
        var entity = new MasterProgram();
        await ApplyDtoAsync(entity, dto);
        _dbContext.MasterPrograms.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, MasterProgramCreateUpdateDto dto)
    {
        var entity = await _dbContext.MasterPrograms.FirstOrDefaultAsync(x => x.Id == id);
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
        var entity = await _dbContext.MasterPrograms.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.MasterPrograms.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private async Task ApplyDtoAsync(MasterProgram entity, MasterProgramCreateUpdateDto dto)
    {
        var country = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == dto.CountryId);
        if (country == null)
        {
            throw new ArgumentException("Geçersiz ülke değeri.");
        }

        entity.Name = dto.Name;
        entity.ProgramType = dto.ProgramType;
        entity.University = dto.University;
        entity.CountryId = country.Id;
        entity.Duration = dto.Duration;
        entity.ShortDescription = dto.ShortDescription;
        entity.Established = dto.Established;
        entity.Students = dto.Students;
        entity.Ranking = dto.Ranking;
        entity.Intro = dto.Intro;
        entity.Location = dto.Location;
        entity.Status = dto.Status;
        entity.ImageBase64 = dto.ImageBase64;
        entity.FeaturesJson = JsonHelper.Serialize(dto.Features);
        entity.ProgramsJson = JsonHelper.Serialize(dto.Programs);
        entity.RequirementsJson = JsonHelper.Serialize(dto.Requirements);
        entity.CareerServicesJson = JsonHelper.Serialize(dto.CareerServices);
        entity.CampusJson = JsonHelper.Serialize(dto.Campus);
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

    private static MasterProgramDto ToDto(MasterProgram entity)
    {
        return new MasterProgramDto
        {
            Id = entity.Id,
            Name = entity.Name,
            ProgramType = entity.ProgramType,
            University = entity.University,
            CountryId = entity.CountryId,
            CountryName = entity.Country?.Name,
            CountrySlug = entity.Country?.Slug,
            CityId = entity.CityId,
            CityName = entity.City?.Name,
            Duration = entity.Duration,
            ShortDescription = entity.ShortDescription,
            Established = entity.Established,
            Students = entity.Students,
            Ranking = entity.Ranking,
            Intro = entity.Intro,
            Location = entity.Location,
            Status = entity.Status,
            ImageBase64 = entity.ImageBase64,
            Features = JsonHelper.Deserialize<List<string>>(entity.FeaturesJson) ?? new(),
            Programs = JsonHelper.Deserialize<List<MasterProgramDetailDto>>(entity.ProgramsJson) ?? new(),
            Requirements = JsonHelper.Deserialize<MasterProgramRequirementDto>(entity.RequirementsJson) ?? new(),
            CareerServices = JsonHelper.Deserialize<List<string>>(entity.CareerServicesJson) ?? new(),
            Campus = JsonHelper.Deserialize<List<string>>(entity.CampusJson) ?? new(),
            Accreditation = JsonHelper.Deserialize<List<string>>(entity.AccreditationJson) ?? new()
        };
    }
}
