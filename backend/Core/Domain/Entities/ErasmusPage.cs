namespace EduExcellenceV2.Domain.Entities;

public class ErasmusPage : BaseEntity
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    /// <summary>HTML içerik (zengin metin editöründen).</summary>
    public string HtmlContent { get; set; } = string.Empty;
    /// <summary>PDF sayfaları için dosya yolu (örn: ekler/programme-rehberi.pdf).</summary>
    public string? PdfPath { get; set; }

    public ICollection<ErasmusPageImage> Images { get; set; } = new List<ErasmusPageImage>();
}
