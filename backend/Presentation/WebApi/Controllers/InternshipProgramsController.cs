using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduExcellenceV2.Presentation.WebApi.Controllers;

[ApiController]
[Route("api/internship-programs")]
public class InternshipProgramsController : ControllerBase
{
    private readonly IInternshipProgramService _service;

    public InternshipProgramsController(IInternshipProgramService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
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
    public async Task<IActionResult> Create([FromBody] InternshipProgramCreateUpdateDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] InternshipProgramCreateUpdateDto dto)
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
