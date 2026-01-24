using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IVisaService
{
    Task<IEnumerable<VisaServiceDto>> GetAllAsync();
    Task<VisaServiceDto?> GetByIdAsync(int id);
    Task<VisaServiceDto> CreateAsync(VisaServiceCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, VisaServiceCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
