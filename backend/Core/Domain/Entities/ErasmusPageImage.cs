namespace EduExcellenceV2.Domain.Entities;

public class ErasmusPageImage : BaseEntity
{
    public int ErasmusPageId { get; set; }
    public string ImageBase64 { get; set; } = string.Empty;

    public ErasmusPage? ErasmusPage { get; set; }
}

