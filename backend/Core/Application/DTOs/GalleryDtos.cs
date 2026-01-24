namespace EduExcellenceV2.Application.DTOs;

public class GalleryItemCreateUpdateDto
{
    public string Category { get; set; } = string.Empty;
    public string ImageBase64 { get; set; } = string.Empty;
}

public class GalleryItemDto : GalleryItemCreateUpdateDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
