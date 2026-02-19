using System.Text.RegularExpressions;

namespace EduExcellenceV2.Application.Utils;

/// <summary>
/// Sanitizes user input to prevent XSS-style payloads.
/// </summary>
public static class InputSanitizer
{
    private static readonly Regex ScriptTagRegex = new(@"<script\b[^<]*(?:(?!</script>)<[^<]*)*</script>", RegexOptions.IgnoreCase | RegexOptions.Compiled);
    private static readonly Regex EventHandlerRegex = new(@"on\w+\s*=", RegexOptions.IgnoreCase | RegexOptions.Compiled);

    /// <summary>
    /// Sanitizes a string input by removing potentially dangerous characters and patterns.
    /// </summary>
    public static string Sanitize(string? input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return string.Empty;

        var result = input.Trim();

        // Remove script tags
        result = ScriptTagRegex.Replace(result, string.Empty);

        // Remove event handlers (onclick, onerror, etc.)
        result = EventHandlerRegex.Replace(result, string.Empty);

        // Remove dangerous protocols
        result = Regex.Replace(result, @"javascript:", string.Empty, RegexOptions.IgnoreCase);
        result = Regex.Replace(result, @"vbscript:", string.Empty, RegexOptions.IgnoreCase);
        result = Regex.Replace(result, @"data:text/html", string.Empty, RegexOptions.IgnoreCase);

        // Remove HTML tag characters
        result = result.Replace("<", string.Empty).Replace(">", string.Empty);

        // Remove null bytes
        result = result.Replace("\0", string.Empty);

        // Normalize whitespace
        result = Regex.Replace(result, @"\s+", " ");

        return result.Trim();
    }
}
