using EduExcellenceV2.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduExcellenceV2.Presentation.WebApi.Controllers;

[ApiController]
[Route("api/locations")]
public class LocationsController : ControllerBase
{
    private readonly ILocationService _service;

    public LocationsController(ILocationService service)
    {
        _service = service;
    }

    [HttpGet("countries")]
    public IActionResult GetCountries()
    {
        var items = _service.GetCountries();
        return Ok(items);
    }

    [HttpGet("cities")]
    public async Task<IActionResult> GetCities([FromQuery] int countryId)
    {
        var items = await _service.GetCitiesAsync(countryId);
        return Ok(items);
    }
}
