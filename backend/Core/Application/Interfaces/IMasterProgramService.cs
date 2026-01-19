using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IMasterProgramService
{
    Task<IEnumerable<MasterProgramDto>> GetAllAsync();
    Task<MasterProgramDto?> GetByIdAsync(int id);
    Task<MasterProgramDto> CreateAsync(MasterProgramCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, MasterProgramCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
