using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IBlogPostService
{
    Task<IEnumerable<BlogPostDto>> GetAllAsync();
    Task<BlogPostDto?> GetByIdAsync(int id);
    Task<BlogPostDto?> GetBySlugAsync(string slug);
    Task<BlogPostDto> CreateAsync(BlogPostCreateUpdateDto dto);
    Task<bool> UpdateAsync(int id, BlogPostCreateUpdateDto dto);
    Task<bool> DeleteAsync(int id);
    Task<bool> IncrementViewCountAsync(int id);
}
