using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduExcellenceV2.Presentation.WebApi.Controllers;

[ApiController]
[Route("api/high-schools")]
public class HighSchoolsController : ControllerBase
{
    private readonly IHighSchoolService _service;

    public HighSchoolsController(IHighSchoolService service)
    {
        _service = service;
    }

    [HttpGet("countries")]
    public async Task<IActionResult> GetCountries([FromQuery] string? status = "active")
    {
        var items = await _service.GetCountriesAsync(status);
        return Ok(items);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? countryId, [FromQuery] int? cityId, [FromQuery] string? search, [FromQuery] string? status)
    {
        var items = await _service.GetAllAsync(countryId, cityId, search, status);
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] HighSchoolCreateUpdateDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] HighSchoolCreateUpdateDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}

