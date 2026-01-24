using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IGalleryService
{
    Task<IEnumerable<GalleryItemDto>> GetAllAsync();
    Task<IEnumerable<GalleryItemDto>> GetByCategoryAsync(string category);
    Task<GalleryItemDto?> GetByIdAsync(int id);
    Task<GalleryItemDto> CreateAsync(GalleryItemCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, GalleryItemCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
