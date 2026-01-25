using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface ITestimonialService
{
    Task<IEnumerable<TestimonialDto>> GetAllAsync();
    Task<IEnumerable<TestimonialDto>> GetActiveAsync();
    Task<TestimonialDto?> GetByIdAsync(int id);
    Task<TestimonialDto> CreateAsync(TestimonialCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, TestimonialCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
