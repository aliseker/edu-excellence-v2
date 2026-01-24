using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class BlogPostService : IBlogPostService
{
    private readonly EduExcellenceDbContext _dbContext;

    public BlogPostService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<BlogPostDto>> GetAllAsync()
    {
        var items = await _dbContext.BlogPosts
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();

        return items.Select(ToDto);
    }

    public async Task<BlogPostDto?> GetByIdAsync(int id)
    {
        var entity = await _dbContext.BlogPosts.FindAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<BlogPostDto?> GetBySlugAsync(string slug)
    {
        var entity = await _dbContext.BlogPosts
            .FirstOrDefaultAsync(x => x.Slug == slug);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<BlogPostDto> CreateAsync(BlogPostCreateUpdateDto dto)
    {
        var entity = new BlogPost();
        ApplyDto(entity, dto);
        entity.Slug = GenerateSlug(dto.Title);
        
        _dbContext.BlogPosts.Add(entity);
        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> UpdateAsync(int id, BlogPostCreateUpdateDto dto)
    {
        var entity = await _dbContext.BlogPosts.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        ApplyDto(entity, dto);
        entity.Slug = GenerateSlug(dto.Title);
        entity.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _dbContext.BlogPosts.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        _dbContext.BlogPosts.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IncrementViewCountAsync(int id)
    {
        var entity = await _dbContext.BlogPosts.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        entity.ViewCount++;
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private static BlogPostDto ToDto(BlogPost entity)
    {
        return new BlogPostDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Slug = entity.Slug,
            Category = entity.Category,
            CoverImageBase64 = entity.CoverImageBase64,
            Summary = entity.Summary,
            Content = entity.Content,
            Status = entity.Status,
            ViewCount = entity.ViewCount,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt ?? entity.CreatedAt
        };
    }

    private static void ApplyDto(BlogPost entity, BlogPostCreateUpdateDto dto)
    {
        entity.Title = dto.Title;
        entity.Category = dto.Category;
        entity.CoverImageBase64 = dto.CoverImageBase64;
        entity.Summary = dto.Summary;
        entity.Content = dto.Content;
        entity.Status = dto.Status;
    }

    private static string GenerateSlug(string title)
    {
        // Türkçe karakterleri değiştir
        var slug = title.ToLowerInvariant();
        slug = slug.Replace("ç", "c").Replace("ğ", "g").Replace("ı", "i")
                   .Replace("ö", "o").Replace("ş", "s").Replace("ü", "u");
        
        // Özel karakterleri temizle
        slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
        
        // Boşlukları tire ile değiştir
        slug = Regex.Replace(slug, @"\s+", "-");
        
        // Birden fazla tireyi tek tire yap
        slug = Regex.Replace(slug, @"-+", "-");
        
        return slug.Trim('-');
    }
}
