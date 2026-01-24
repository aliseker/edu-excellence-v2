namespace EduExcellenceV2.Domain.Entities;

public class GalleryItem : BaseEntity
{
    public string Category { get; set; } = string.Empty;
    public string ImageBase64 { get; set; } = string.Empty;
}
