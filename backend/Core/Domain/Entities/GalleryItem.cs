namespace EduExcellenceV2.Domain.Entities;

public class GalleryItem : BaseEntity
{
    public string Category { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ImagePath { get; set; } = string.Empty;
}
