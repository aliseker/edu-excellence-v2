using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class GalleryService : IGalleryService
{
    private readonly EduExcellenceDbContext _dbContext;

    public GalleryService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<GalleryItemDto>> GetAllAsync()
    {
        var items = await _dbContext.GalleryItems
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<IEnumerable<GalleryItemDto>> GetByCategoryAsync(string category)
    {
        var items = await _dbContext.GalleryItems
            .Where(x => x.Category == category)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<GalleryItemDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.GalleryItems.FindAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<GalleryItemDto> CreateAsync(GalleryItemCreateUpdateDto dto)
    {
        var entity = new GalleryItem();
        ApplyDto(entity, dto);
        
        _dbContext.GalleryItems.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, GalleryItemCreateUpdateDto dto)
    {
        var entity = await _dbContext.GalleryItems.FindAsync(id);
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
        var entity = await _dbContext.GalleryItems.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.GalleryItems.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private static GalleryItemDto ToDto(GalleryItem entity)
    {
        return new GalleryItemDto
        {
            Id = entity.Id,
            Category = entity.Category,
            Title = entity.Title,
            ImagePath = entity.ImagePath,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt ?? entity.CreatedAt
        };
    }

    private static void ApplyDto(GalleryItem entity, GalleryItemCreateUpdateDto dto)
    {
        entity.Category = dto.Category;
        entity.Title = dto.Title;
        entity.ImagePath = dto.ImagePath;
    }
}
