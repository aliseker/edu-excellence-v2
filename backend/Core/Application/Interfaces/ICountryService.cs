using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface ICountryService
{
    Task<IEnumerable<CountryDto>> GetAllAsync();
    Task<CountryDto?> GetByIdAsync(int id);
    Task<CountryDto> CreateAsync(CountryCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, CountryCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
