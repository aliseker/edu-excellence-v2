namespace EduExcellenceV2.Application.DTOs;

public class BlogPostCreateUpdateDto
{
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string CoverImageBase64 { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Status { get; set; } = "draft";
}

public class BlogPostDto : BlogPostCreateUpdateDto
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public int ViewCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
