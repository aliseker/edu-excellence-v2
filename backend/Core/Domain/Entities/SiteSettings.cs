namespace EduExcellenceV2.Domain.Entities;

public class SiteSettings : BaseEntity
{
    public string? FacebookUrl { get; set; }
    public string? TwitterUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? WhatsAppPhoneNumber { get; set; }
    public string? WhatsAppMessageText { get; set; }
}
