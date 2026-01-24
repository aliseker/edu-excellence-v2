using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class VisaService : IVisaService
{
    private readonly EduExcellenceDbContext _dbContext;

    public VisaService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<VisaServiceDto>> GetAllAsync()
    {
        var items = await _dbContext.VisaCountries
            .OrderByDescending(x => x.Id)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<VisaServiceDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.VisaCountries.FindAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<VisaServiceDto> CreateAsync(VisaServiceCreateUpdateDto dto)
    {
        var entity = new VisaCountry();
        ApplyDto(entity, dto);
        _dbContext.VisaCountries.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, VisaServiceCreateUpdateDto dto)
    {
        var entity = await _dbContext.VisaCountries.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        ApplyDto(entity, dto);
        entity.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _dbContext.VisaCountries.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.VisaCountries.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private static VisaServiceDto ToDto(VisaCountry entity)
    {
        return new VisaServiceDto
        {
            Id = entity.Id,
            CountrySlug = entity.CountrySlug,
            CountryName = entity.CountryName,
            Flag = entity.Flag,
            GeneralInfo = entity.GeneralInfo,
            Status = entity.Status,
            VisaTypes = JsonHelper.Deserialize<List<VisaTypeDto>>(entity.VisaTypesJson) ?? new(),
            Process = JsonHelper.Deserialize<List<string>>(entity.ProcessJson) ?? new(),
            Documents = JsonHelper.Deserialize<List<string>>(entity.DocumentsJson) ?? new(),
            ImportantNotes = JsonHelper.Deserialize<List<string>>(entity.ImportantNotesJson) ?? new()
        };
    }

    private static void ApplyDto(VisaCountry entity, VisaServiceCreateUpdateDto dto)
    {
        entity.CountrySlug = dto.CountrySlug;
        entity.CountryName = dto.CountryName;
        entity.Flag = dto.Flag;
        entity.GeneralInfo = dto.GeneralInfo;
        entity.Status = dto.Status;
        entity.VisaTypesJson = JsonHelper.Serialize(dto.VisaTypes);
        entity.ProcessJson = JsonHelper.Serialize(dto.Process);
        entity.DocumentsJson = JsonHelper.Serialize(dto.Documents);
        entity.ImportantNotesJson = JsonHelper.Serialize(dto.ImportantNotes);
    }
}
