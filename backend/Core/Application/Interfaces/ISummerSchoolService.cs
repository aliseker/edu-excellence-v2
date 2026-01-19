using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface ISummerSchoolService
{
    Task<IEnumerable<SummerSchoolDto>> GetAllAsync();
    Task<SummerSchoolDto?> GetByIdAsync(int id);
    Task<SummerSchoolDto> CreateAsync(SummerSchoolCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, SummerSchoolCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
