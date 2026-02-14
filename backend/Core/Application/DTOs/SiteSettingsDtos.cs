namespace EduExcellenceV2.Application.DTOs;

public class SiteSettingsDto
{
    public int Id { get; set; }
    public string? FacebookUrl { get; set; }
    public string? TwitterUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? WhatsAppPhoneNumber { get; set; }
    public string? WhatsAppMessageText { get; set; }
}

public class SiteSettingsUpdateDto
{
    public string? FacebookUrl { get; set; }
    public string? TwitterUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? WhatsAppPhoneNumber { get; set; }
    public string? WhatsAppMessageText { get; set; }
}
