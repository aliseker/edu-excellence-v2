using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class TestimonialService : ITestimonialService
{
    private readonly EduExcellenceDbContext _dbContext;

    public TestimonialService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TestimonialDto>> GetAllAsync()
    {
        var items = await _dbContext.Testimonials
            .OrderBy(x => x.DisplayOrder)
            .ThenByDescending(x => x.CreatedAt)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<IEnumerable<TestimonialDto>> GetActiveAsync()
    {
        var items = await _dbContext.Testimonials
            .Where(x => x.IsActive)
            .OrderBy(x => x.DisplayOrder)
            .ThenByDescending(x => x.CreatedAt)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<TestimonialDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Testimonials.FindAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<TestimonialDto> CreateAsync(TestimonialCreateUpdateDto dto)
    {
        var entity = new Testimonial();
        ApplyDto(entity, dto);
        
        _dbContext.Testimonials.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, TestimonialCreateUpdateDto dto)
    {
        var entity = await _dbContext.Testimonials.FindAsync(id);
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
        var entity = await _dbContext.Testimonials.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.Testimonials.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private static TestimonialDto ToDto(Testimonial entity)
    {
        return new TestimonialDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Title = entity.Title,
            Description = entity.Description,
            UniversityName = entity.UniversityName,
            DisplayOrder = entity.DisplayOrder,
            IsActive = entity.IsActive,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt ?? entity.CreatedAt
        };
    }

    private static void ApplyDto(Testimonial entity, TestimonialCreateUpdateDto dto)
    {
        entity.Name = dto.Name;
        entity.Title = dto.Title;
        entity.Description = dto.Description;
        entity.UniversityName = dto.UniversityName;
        entity.DisplayOrder = dto.DisplayOrder;
        entity.IsActive = dto.IsActive;
    }
}
