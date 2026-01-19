using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IUniversityService
{
    Task<IEnumerable<UniversityDto>> GetAllAsync();
    Task<UniversityDto?> GetByIdAsync(int id);
    Task<UniversityDto> CreateAsync(UniversityCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, UniversityCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
