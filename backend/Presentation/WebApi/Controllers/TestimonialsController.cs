using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduExcellenceV2.Presentation.WebApi.Controllers;

[ApiController]
[Route("api/testimonials")]
public class TestimonialsController : ControllerBase
{
    private readonly ITestimonialService _service;

    public TestimonialsController(ITestimonialService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var items = await _service.GetActiveAsync();
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
    public async Task<IActionResult> Create([FromBody] TestimonialCreateUpdateDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TestimonialCreateUpdateDto dto)
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
