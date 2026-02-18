namespace EduExcellenceV2.Application.DTOs;

public class ErasmusPageImageCreateDto
{
    public int ErasmusPageId { get; set; }
    public string ImageBase64 { get; set; } = string.Empty;
}

public class ErasmusPageImageDto : ErasmusPageImageCreateDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

