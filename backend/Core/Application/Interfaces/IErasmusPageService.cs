using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IErasmusPageService
{
    Task<IEnumerable<ErasmusPageDto>> GetAllAsync();
    Task<ErasmusPageDto?> GetByIdAsync(int id);
    Task<ErasmusPageDto?> GetBySlugAsync(string slug);
    Task<ErasmusPageDto> CreateAsync(ErasmusPageCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, ErasmusPageCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
