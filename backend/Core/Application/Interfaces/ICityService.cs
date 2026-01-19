using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface ICityService
{
    Task<IEnumerable<CityDto>> GetAllByCountryAsync(int countryId);
    Task<CityDto> CreateAsync(CityCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, CityCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
