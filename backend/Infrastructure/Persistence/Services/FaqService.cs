using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class FaqService : IFaqService
{
    private readonly EduExcellenceDbContext _dbContext;

    public FaqService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<FaqDto>> GetAllAsync()
    {
        var items = await _dbContext.Faqs
            .OrderBy(x => x.DisplayOrder)
            .ThenByDescending(x => x.CreatedAt)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<IEnumerable<FaqDto>> GetActiveAsync()
    {
        var items = await _dbContext.Faqs
            .Where(x => x.IsActive)
            .OrderBy(x => x.DisplayOrder)
            .ThenByDescending(x => x.CreatedAt)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<FaqDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Faqs.FindAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<FaqDto> CreateAsync(FaqCreateUpdateDto dto)
    {
        var entity = new Faq();
        ApplyDto(entity, dto);

        _dbContext.Faqs.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, FaqCreateUpdateDto dto)
    {
        var entity = await _dbContext.Faqs.FindAsync(id);
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
        var entity = await _dbContext.Faqs.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.Faqs.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private static FaqDto ToDto(Faq entity)
    {
        return new FaqDto
        {
            Id = entity.Id,
            Question = entity.Question,
            Answer = entity.Answer,
            DisplayOrder = entity.DisplayOrder,
            IsActive = entity.IsActive,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt ?? entity.CreatedAt
        };
    }

    private static void ApplyDto(Faq entity, FaqCreateUpdateDto dto)
    {
        entity.Question = dto.Question;
        entity.Answer = dto.Answer;
        entity.DisplayOrder = dto.DisplayOrder;
        entity.IsActive = dto.IsActive;
    }
}
