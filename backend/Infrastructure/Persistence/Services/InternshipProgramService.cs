using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class InternshipProgramService : IInternshipProgramService
{
    private readonly EduExcellenceDbContext _dbContext;

    public InternshipProgramService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<InternshipProgramDto>> GetAllAsync()
    {
        var items = await _dbContext.InternshipPrograms
            .Include(x => x.Country)
            .OrderByDescending(x => x.Id)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<InternshipProgramDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.InternshipPrograms
            .Include(x => x.Country)
            .FirstOrDefaultAsync(x => x.Id == id);

        return entity == null ? null : ToDto(entity);
    }

    public async Task<InternshipProgramDto> CreateAsync(InternshipProgramCreateUpdateDto dto)
    {
        var entity = new InternshipProgram();
        await ApplyDtoAsync(entity, dto);
        _dbContext.InternshipPrograms.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, InternshipProgramCreateUpdateDto dto)
    {
        var entity = await _dbContext.InternshipPrograms.FirstOrDefaultAsync(x => x.Id == id);
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
        var entity = await _dbContext.InternshipPrograms.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.InternshipPrograms.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private async Task ApplyDtoAsync(InternshipProgram entity, InternshipProgramCreateUpdateDto dto)
    {
        var country = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id == dto.CountryId);
        if (country == null)
        {
            throw new ArgumentException("Geçersiz ülke değeri.");
        }

        entity.CountryId = country.Id;
        entity.GeneralInfo = dto.GeneralInfo;
        entity.Status = dto.Status;
        entity.ProgramsJson = JsonHelper.Serialize(dto.Programs);
        entity.AdvantagesJson = JsonHelper.Serialize(dto.Advantages);
        entity.ApplicationStepsJson = JsonHelper.Serialize(dto.ApplicationSteps);
        entity.RequiredDocumentsJson = JsonHelper.Serialize(dto.RequiredDocuments);
    }

    private static InternshipProgramDto ToDto(InternshipProgram entity)
    {
        return new InternshipProgramDto
        {
            Id = entity.Id,
            CountryId = entity.CountryId,
            CountryName = entity.Country?.Name,
            CountrySlug = entity.Country?.Slug,
            GeneralInfo = entity.GeneralInfo,
            Status = entity.Status,
            Programs = JsonHelper.Deserialize<List<InternshipProgramDetailDto>>(entity.ProgramsJson) ?? new(),
            Advantages = JsonHelper.Deserialize<List<string>>(entity.AdvantagesJson) ?? new(),
            ApplicationSteps = JsonHelper.Deserialize<List<string>>(entity.ApplicationStepsJson) ?? new(),
            RequiredDocuments = JsonHelper.Deserialize<List<string>>(entity.RequiredDocumentsJson) ?? new()
        };
    }
}
