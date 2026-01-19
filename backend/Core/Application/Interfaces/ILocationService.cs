using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface ILocationService
{
    IEnumerable<CountryOptionDto> GetCountries();
    Task<IEnumerable<CityOptionDto>> GetCitiesAsync(int countryId);
}
