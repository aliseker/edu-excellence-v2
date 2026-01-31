using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IHighSchoolService
{
    Task<IEnumerable<CountryOptionDto>> GetCountriesAsync(string? status = "active");
    Task<IEnumerable<HighSchoolDto>> GetAllAsync(int? countryId = null, int? cityId = null, string? search = null, string? status = null);
    Task<HighSchoolDto?> GetByIdAsync(int id);
    Task<HighSchoolDto> CreateAsync(HighSchoolCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, HighSchoolCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}

