using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IInternshipProgramService
{
    Task<IEnumerable<InternshipProgramDto>> GetAllAsync();
    Task<InternshipProgramDto?> GetByIdAsync(int id);
    Task<InternshipProgramDto> CreateAsync(InternshipProgramCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, InternshipProgramCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
