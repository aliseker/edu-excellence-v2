using System.Net;
using System.Net.Mail;
using EduExcellenceV2.Application.DTOs;
using EduExcellenceV2.Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace EduExcellenceV2.Infrastructure.Persistence.Services;

public class ContactService : IContactService
{
    private readonly IConfiguration _configuration;

    public ContactService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendContactEmailAsync(ContactRequestDto dto)
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
        {
            throw new InvalidOperationException("SMTP Password is not configured (SmtpSettings:Password).");
        }

        if (string.IsNullOrWhiteSpace(username))
        {
            throw new InvalidOperationException("SMTP Username is not configured (SmtpSettings:Username).");
        }

        if (string.IsNullOrWhiteSpace(fromEmail))
        {
            throw new InvalidOperationException("SMTP FromEmail is not configured (SmtpSettings:FromEmail).");
        }

        if (string.IsNullOrWhiteSpace(fromName))
        {
            throw new InvalidOperationException("SMTP FromName is not configured (SmtpSettings:FromName).");
        }

        if (string.IsNullOrWhiteSpace(host))
        {
            throw new InvalidOperationException("SMTP Host is not configured (SmtpSettings:Host).");
        }

        var enableSsl = true;
        if (bool.TryParse(enableSslString, out var parsedEnableSsl))
        {
            enableSsl = parsedEnableSsl;
        }

        var port = 587;
        if (int.TryParse(portString, out var parsedPort) && parsedPort > 0)
        {
            port = parsedPort;
        }

        using var message = new MailMessage();
        message.From = new MailAddress(fromEmail, fromName);
        message.To.Add(new MailAddress(toAddress));
        message.Subject = string.IsNullOrWhiteSpace(dto.Subject)
            ? "İletişim Formu - Edu-Excellence"
            : dto.Subject.Trim();

        var bodyLines = new List<string>
        {
            $"Ad Soyad: {dto.Name}",
            $"E-posta: {dto.Email}"
        };

        if (!string.IsNullOrWhiteSpace(dto.Phone))
        {
            bodyLines.Add($"Telefon: {dto.Phone}");
        }

        bodyLines.Add(string.Empty);
        bodyLines.Add("Mesaj:");
        bodyLines.Add(dto.Message);

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

