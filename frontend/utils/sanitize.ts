/**
 * Input sanitization utilities for security
 * Prevents XSS attacks by cleaning user inputs
 */

// Dynamic import for DOMPurify to avoid server-side issues
let DOMPurify: any = null;

async function getDOMPurify() {
  if (typeof window === 'undefined') {
    return null; // Server-side: don't load
  }
  
  // Client-side only
  if (!DOMPurify) {
    try {
      const dompurify = await import('isomorphic-dompurify');
      DOMPurify = dompurify.default;
    } catch (error) {
      console.warn('Failed to load DOMPurify:', error);
      return null;
    }
  }
  return DOMPurify;
}

/**
 * Sanitizes a string input by removing potentially dangerous characters
 * @param input - The input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tag characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers (onclick, onerror, etc.)
    .replace(/data:text\/html/gi, '') // Remove data URIs with HTML
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/\0/g, '') // Remove null bytes
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates phone number (basic validation)
 * @param phone - Phone number to validate
 * @returns true if valid phone format
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Remove common phone number characters
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  
  // Check if it contains only digits and has reasonable length
  return /^\d{10,15}$/.test(cleaned);
}

/**
 * Sanitizes HTML content using DOMPurify (client-side only)
 * This should be used for any HTML content that will be rendered
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export async function sanitizeHTML(html: string): Promise<string> {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Only sanitize on client-side
  if (typeof window === 'undefined') {
    // Server-side: return basic sanitized version
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '');
  }

  const purify = await getDOMPurify();
  if (purify) {
    return purify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
  }

  // Fallback
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
}

