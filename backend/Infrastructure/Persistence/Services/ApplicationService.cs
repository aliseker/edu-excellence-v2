using System.Net;
using System.Net.Mail;
using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class ApplicationService : IApplicationService
{
    private readonly IConfiguration _configuration;

    public ApplicationService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SubmitApplicationAsync(ApplicationRequestDto dto)
    {
        if (dto == null)
        {
            throw new ArgumentNullException(nameof(dto));
        }

        var smtpSection = _configuration.GetSection("SmtpSettings");

        var toAddress = smtpSection["AdminNotificationEmail"];
        if (string.IsNullOrWhiteSpace(toAddress))
        {
            throw new InvalidOperationException("SmtpSettings:AdminNotificationEmail is not configured.");
        }

        var host = smtpSection["Host"];
        var portString = smtpSection["Port"];
        var enableSslString = smtpSection["EnableSsl"];
        var username = smtpSection["Username"];
        var password = smtpSection["Password"];
        var fromEmail = smtpSection["FromEmail"];
        var fromName = smtpSection["FromName"];

        if (string.IsNullOrWhiteSpace(password))
            throw new InvalidOperationException("SMTP Password is not configured (SmtpSettings:Password).");
        if (string.IsNullOrWhiteSpace(username))
            throw new InvalidOperationException("SMTP Username is not configured (SmtpSettings:Username).");
        if (string.IsNullOrWhiteSpace(fromEmail))
            throw new InvalidOperationException("SMTP FromEmail is not configured (SmtpSettings:FromEmail).");
        if (string.IsNullOrWhiteSpace(fromName))
            throw new InvalidOperationException("SMTP FromName is not configured (SmtpSettings:FromName).");
        if (string.IsNullOrWhiteSpace(host))
            throw new InvalidOperationException("SMTP Host is not configured (SmtpSettings:Host).");

        var enableSsl = bool.TryParse(enableSslString, out var pSsl) ? pSsl : true;
        var port = int.TryParse(portString, out var pPort) && pPort > 0 ? pPort : 587;

        var bodyLines = new List<string>
        {
            "YENİ BAŞVURU",
            string.Empty,
            $"Program Türü: {dto.ProgramType}",
            $"Ülke: {dto.Country}",
            $"Ad Soyad: {dto.Name}",
            $"E-posta: {dto.Email}",
            $"Eğitim Seviyesi: {dto.EducationLevel}",
            $"Not Ortalaması (GPA): {dto.Gpa}"
        };

        if (!string.IsNullOrWhiteSpace(dto.University))
            bodyLines.Add($"Üniversite/Okul: {dto.University}");
        if (!string.IsNullOrWhiteSpace(dto.Phone))
            bodyLines.Add($"Telefon: {dto.Phone}");
        if (!string.IsNullOrWhiteSpace(dto.BirthDate))
            bodyLines.Add($"Doğum Tarihi: {dto.BirthDate}");
        if (!string.IsNullOrWhiteSpace(dto.LanguageTest))
            bodyLines.Add($"Dil Sınavı: {dto.LanguageTest}");
        if (!string.IsNullOrWhiteSpace(dto.LanguageScore))
            bodyLines.Add($"Dil Skoru: {dto.LanguageScore}");
        if (!string.IsNullOrWhiteSpace(dto.Message))
        {
            bodyLines.Add(string.Empty);
            bodyLines.Add("Mesaj / Ek Bilgiler:");
            bodyLines.Add(dto.Message);
        }

        using var message = new MailMessage();
        message.From = new MailAddress(fromEmail, fromName);
        message.To.Add(new MailAddress(toAddress));
        message.Subject = "Yurtdışı Eğitim Başvurusu - Edu-Excellence";
        message.Body = string.Join(Environment.NewLine, bodyLines);
        message.IsBodyHtml = false;

        using var client = new SmtpClient(host, port)
        {
            EnableSsl = enableSsl,
            Credentials = new NetworkCredential(username, password)
        };

        await client.SendMailAsync(message);
    }
}
