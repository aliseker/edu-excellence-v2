namespace EduExcellenceV2.Application.DTOs;

public class ErasmusPageCreateUpdateDto
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string HtmlContent { get; set; } = string.Empty;
    public string ImagesJson { get; set; } = "[]";
    public string? PdfPath { get; set; }
}

public class ErasmusPageDto : ErasmusPageCreateUpdateDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
