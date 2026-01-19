using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface ILanguageSchoolService
{
    Task<IEnumerable<LanguageSchoolDto>> GetAllAsync();
    Task<LanguageSchoolDto?> GetByIdAsync(int id);
    Task<LanguageSchoolDto> CreateAsync(LanguageSchoolCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, LanguageSchoolCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
