using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class ErasmusPageService : IErasmusPageService
{
    private readonly EduExcellenceDbContext _dbContext;

    public ErasmusPageService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<ErasmusPageDto>> GetAllAsync()
    {
        var items = await _dbContext.ErasmusPages
            .OrderBy(x => x.Slug)
            .ToListAsync();
        return items.Select(ToDto);
    }

    public async Task<ErasmusPageDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.ErasmusPages.FindAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<ErasmusPageDto?> GetBySlugAsync(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
            return null;
        var normalized = slug.Trim().ToLowerInvariant();
        var entity = await _dbContext.ErasmusPages
            .FirstOrDefaultAsync(x => x.Slug.ToLower() == normalized);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<ErasmusPageDto> CreateAsync(ErasmusPageCreateUpdateDto dto)
    {
        var slug = (dto.Slug ?? string.Empty).Trim();
        if (!string.IsNullOrEmpty(slug))
        {
            var exists = await _dbContext.ErasmusPages
                .AnyAsync(x => x.Slug.ToLower() == slug.ToLowerInvariant());
            if (exists)
                throw new InvalidOperationException("Bu sayfa türü zaten eklenmiş. Düzenlemek için listeden ilgili sayfayı seçin.");
        }

        var entity = new ErasmusPage();
        ApplyDto(entity, dto);
        _dbContext.ErasmusPages.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, ErasmusPageCreateUpdateDto dto)
    {
        var entity = await _dbContext.ErasmusPages.FindAsync(id);
        if (entity == null)
            return false;
        ApplyDto(entity, dto);
        entity.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _dbContext.ErasmusPages.FindAsync(id);
        if (entity == null)
            return false;
        _dbContext.ErasmusPages.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<ErasmusPageImageDto>> GetImagesAsync(int erasmusPageId)
    {
        var images = await _dbContext.ErasmusPageImages
            .Where(x => x.ErasmusPageId == erasmusPageId)
            .OrderBy(x => x.CreatedAt)
            .ToListAsync();

        return images.Select(ToImageDto);
    }

    public async Task<ErasmusPageImageDto> AddImageAsync(ErasmusPageImageCreateDto dto)
    {
        var entity = new ErasmusPageImage
        {
            ErasmusPageId = dto.ErasmusPageId,
            ImageBase64 = dto.ImageBase64
        };

        _dbContext.ErasmusPageImages.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToImageDto(entity);
    }

    public async Task<bool> DeleteImageAsync(int imageId)
    {
        var entity = await _dbContext.ErasmusPageImages.FindAsync(imageId);
        if (entity == null)
        {
            return false;
        }

        _dbContext.ErasmusPageImages.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private static ErasmusPageDto ToDto(ErasmusPage entity)
    {
        return new ErasmusPageDto
        {
            Id = entity.Id,
            Slug = entity.Slug,
            Title = entity.Title,
            HtmlContent = entity.HtmlContent ?? string.Empty,
            PdfPath = entity.PdfPath,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }

    private static void ApplyDto(ErasmusPage entity, ErasmusPageCreateUpdateDto dto)
    {
        entity.Slug = (dto.Slug ?? string.Empty).Trim();
        entity.Title = (dto.Title ?? string.Empty).Trim();
        entity.HtmlContent = dto.HtmlContent ?? string.Empty;
        entity.PdfPath = string.IsNullOrWhiteSpace(dto.PdfPath) ? null : dto.PdfPath.Trim();
    }

    private static ErasmusPageImageDto ToImageDto(ErasmusPageImage entity)
    {
        return new ErasmusPageImageDto
        {
            Id = entity.Id,
            ErasmusPageId = entity.ErasmusPageId,
            ImageBase64 = entity.ImageBase64,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }
}
