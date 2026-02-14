using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface ISiteSettingsService
{
    Task<SiteSettingsDto?> GetAsync();
    Task<SiteSettingsDto> UpdateAsync(int id, SiteSettingsUpdateDto dto);
}
