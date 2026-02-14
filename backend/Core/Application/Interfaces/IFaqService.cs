using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IFaqService
{
    Task<IEnumerable<FaqDto>> GetAllAsync();
    Task<IEnumerable<FaqDto>> GetActiveAsync();
    Task<FaqDto?> GetByIdAsync(int id);
    Task<FaqDto> CreateAsync(FaqCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, FaqCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
