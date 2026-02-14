using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class SiteSettingsService : ISiteSettingsService
{
    private readonly EduExcellenceDbContext _dbContext;

    public SiteSettingsService(EduExcellenceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<SiteSettingsDto?> GetAsync()
    {
        var entity = await _dbContext.SiteSettings.OrderBy(x => x.Id).FirstOrDefaultAsync();
        return entity == null ? null : ToDto(entity);
    }

    public async Task<SiteSettingsDto> UpdateAsync(int id, SiteSettingsUpdateDto dto)
    {
        var entity = await _dbContext.SiteSettings.FindAsync(id);
        if (entity == null)
        {
            entity = new SiteSettings();
            _dbContext.SiteSettings.Add(entity);
        }

        entity.FacebookUrl = string.IsNullOrWhiteSpace(dto.FacebookUrl) ? null : dto.FacebookUrl.Trim();
        entity.TwitterUrl = string.IsNullOrWhiteSpace(dto.TwitterUrl) ? null : dto.TwitterUrl.Trim();
        entity.InstagramUrl = string.IsNullOrWhiteSpace(dto.InstagramUrl) ? null : dto.InstagramUrl.Trim();
        entity.LinkedInUrl = string.IsNullOrWhiteSpace(dto.LinkedInUrl) ? null : dto.LinkedInUrl.Trim();
        entity.WhatsAppPhoneNumber = string.IsNullOrWhiteSpace(dto.WhatsAppPhoneNumber) ? null : dto.WhatsAppPhoneNumber.Trim();
        entity.WhatsAppMessageText = string.IsNullOrWhiteSpace(dto.WhatsAppMessageText) ? null : dto.WhatsAppMessageText.Trim();
        entity.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
        return ToDto(entity);
    }

    private static SiteSettingsDto ToDto(SiteSettings entity)
    {
        return new SiteSettingsDto
        {
            Id = entity.Id,
            FacebookUrl = entity.FacebookUrl,
            TwitterUrl = entity.TwitterUrl,
            InstagramUrl = entity.InstagramUrl,
            LinkedInUrl = entity.LinkedInUrl,
            WhatsAppPhoneNumber = entity.WhatsAppPhoneNumber,
            WhatsAppMessageText = entity.WhatsAppMessageText
        };
    }
}
