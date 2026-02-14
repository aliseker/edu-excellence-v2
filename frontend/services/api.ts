import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export type SiteSettings = {
  id: number;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedInUrl: string | null;
  whatsAppPhoneNumber: string | null;
  whatsAppMessageText: string | null;
  contactAddress: string | null;
  contactPhoneNumber: string | null;
  contactEmail: string | null;
};

export type SiteSettingsUpdatePayload = {
  facebookUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  linkedInUrl?: string | null;
  whatsAppPhoneNumber?: string | null;
  whatsAppMessageText?: string | null;
  contactAddress?: string | null;
  contactPhoneNumber?: string | null;
  contactEmail?: string | null;
};

function toNullableString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function normalizeSiteSettings(raw: any): SiteSettings {
  return {
    id: typeof raw?.id === 'number' ? raw.id : (typeof raw?.Id === 'number' ? raw.Id : 0),
    facebookUrl: toNullableString(raw?.facebookUrl ?? raw?.FacebookUrl),
    twitterUrl: toNullableString(raw?.twitterUrl ?? raw?.TwitterUrl),
    instagramUrl: toNullableString(raw?.instagramUrl ?? raw?.InstagramUrl),
    linkedInUrl: toNullableString(raw?.linkedInUrl ?? raw?.LinkedInUrl),
    whatsAppPhoneNumber: toNullableString(raw?.whatsAppPhoneNumber ?? raw?.WhatsAppPhoneNumber),
    whatsAppMessageText: toNullableString(raw?.whatsAppMessageText ?? raw?.WhatsAppMessageText),
    contactAddress: toNullableString(raw?.contactAddress ?? raw?.ContactAddress),
    contactPhoneNumber: toNullableString(raw?.contactPhoneNumber ?? raw?.ContactPhoneNumber),
    contactEmail: toNullableString(raw?.contactEmail ?? raw?.ContactEmail),
  };
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;

    // Build URL with query parameters
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    // Token'ı localStorage'dan al
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      };

      // Token varsa Authorization header'ına ekle
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        // Don't expose detailed error information to prevent information leakage
        const status = response.status;
        if (status >= 500) {
          throw new Error('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.');
        } else if (status === 404) {
          throw new Error('İstenen kaynak bulunamadı.');
        } else if (status === 429) {
          const rateLimitError = new Error('Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyiniz.');
          (rateLimitError as any).isRateLimitError = true;
          throw rateLimitError;
        } else if (status === 401 || status === 403) {
          // Login endpoint'i için 401 normal bir durum olabilir (yanlış şifre)
          // Bu durumda özel bir hata tipi fırlat
          const error = new Error('Yetkiniz bulunmamaktadır.');
          (error as any).isAuthError = true;
          throw error;
        } else {
          throw new Error('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      }

      // Handle No Content (204) responses
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {} as T;
      }

      return response.json();
    } catch (error) {
      // Ağ hatası: çoğu zaman rate limit (429) CORS yüzünden "Failed to fetch" görünür
      const isNetworkError =
        (error instanceof TypeError && (error.message === 'Failed to fetch' || error.message === 'Load failed')) ||
        (error instanceof Error && (error.message === 'Failed to fetch' || error.message === 'Load failed'));
      if (isNetworkError) {
        // Login endpoint'inde bu hata sıklıkla rate limit (çok deneme) sonucudur
        throw new Error('Giriş yapılamadı. Çok fazla deneme yaptıysanız 15 dakika sonra tekrar deneyiniz. Aksi halde internet bağlantınızı kontrol edin.');
      }
      // Beklenen hataları (auth, rate limit) konsola yazma; kullanıcı zaten mesajı görüyor
      if (error instanceof Error) {
        const isAuthError = (error as any).isAuthError;
        const isRateLimitError = (error as any).isRateLimitError;
        if (!isAuthError && !isRateLimitError) {
          console.error('API request failed:', error.message);
        }
        throw error;
      }
      throw new Error('Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edin.');
    }
  }

  // Universities
  async getUniversities(filters?: {
    country?: string;
    city?: string;
    language?: string;
    search?: string;
  }) {
    return this.request(API_ENDPOINTS.universities, {
      params: filters as Record<string, string>,
    });
  }

  async getUniversityById(id: number) {
    return this.request(API_ENDPOINTS.universityById(id));
  }

  async getUniversitiesByCountry(country: string) {
    return this.request(API_ENDPOINTS.universitiesByCountry(country));
  }

  // Language Schools
  async getLanguageSchools(filters?: {
    country?: string;
    city?: string;
    language?: string;
    search?: string;
  }) {
    return this.request(API_ENDPOINTS.languageSchools, {
      params: filters as Record<string, string>,
    });
  }

  async getLanguageSchoolById(id: number) {
    return this.request(API_ENDPOINTS.languageSchoolById(id));
  }

  // Summer Schools
  async getSummerSchools(filters?: {
    country?: string;
    age?: string;
    search?: string;
  }) {
    return this.request(API_ENDPOINTS.summerSchools, {
      params: filters as Record<string, string>,
    });
  }

  // High Schools
  async getHighSchools(filters?: {
    country?: string;
    type?: string;
    search?: string;
  }) {
    return this.request(API_ENDPOINTS.highSchools, {
      params: filters as Record<string, string>,
    });
  }

  // Master/MBA Programs
  async getMasterPrograms(filters?: {
    country?: string;
    type?: string;
    search?: string;
  }) {
    return this.request(API_ENDPOINTS.masterPrograms, {
      params: filters as Record<string, string>,
    });
  }

  async getMasterProgramById(id: number) {
    return this.request(API_ENDPOINTS.masterProgramById(id));
  }

  // Internship Programs
  async getInternshipPrograms(filters?: {
    country?: string;
    search?: string;
  }) {
    return this.request(API_ENDPOINTS.internshipPrograms, {
      params: filters as Record<string, string>,
    });
  }

  async getInternshipProgramById(id: number) {
    return this.request(API_ENDPOINTS.internshipProgramById(id));
  }

  // Visa Services
  async getVisaServices(filters?: {
    country?: string;
    type?: string;
  }) {
    return this.request(API_ENDPOINTS.visaServices, {
      params: filters as Record<string, string>,
    });
  }

  async createVisaService(data: any) {
    return this.request(API_ENDPOINTS.visaServices, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateVisaService(id: number, data: any) {
    return this.request(API_ENDPOINTS.visaServiceById(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteVisaService(id: number) {
    return this.request(API_ENDPOINTS.visaServiceById(id), {
      method: 'DELETE',
    });
  }

  // Blog Posts
  async getBlogPosts() {
    return this.request(API_ENDPOINTS.blogPosts);
  }

  async getBlogPostById(id: number) {
    return this.request(API_ENDPOINTS.blogPostById(id));
  }

  async getBlogPostBySlug(slug: string) {
    return this.request(API_ENDPOINTS.blogPostBySlug(slug));
  }

  async createBlogPost(data: any) {
    return this.request(API_ENDPOINTS.blogPosts, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlogPost(id: number, data: any) {
    return this.request(API_ENDPOINTS.blogPostById(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBlogPost(id: number) {
    return this.request(API_ENDPOINTS.blogPostById(id), {
      method: 'DELETE',
    });
  }

  // Gallery
  async getGalleryItems() {
    return this.request(API_ENDPOINTS.galleryItems);
  }

  async getGalleryItemById(id: number) {
    return this.request(API_ENDPOINTS.galleryItemById(id));
  }

  async getGalleryItemsByCategory(category: string) {
    return this.request(API_ENDPOINTS.galleryItemsByCategory(category));
  }

  async createGalleryItem(data: { category: string; imageBase64: string }) {
    return this.request(API_ENDPOINTS.galleryItems, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateGalleryItem(id: number, data: { category: string; imageBase64: string }) {
    return this.request(API_ENDPOINTS.galleryItemById(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGalleryItem(id: number) {
    return this.request(API_ENDPOINTS.galleryItemById(id), {
      method: 'DELETE',
    });
  }

  // Contact
  async submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    return this.request(API_ENDPOINTS.contact, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Countries
  async getCountries() {
    return this.request(API_ENDPOINTS.locationCountries);
  }

  // Cities
  async getCities(countryId?: number) {
    if (countryId) {
      return this.request(API_ENDPOINTS.locationCities(countryId));
    }
    return [];
  }

  // Locations
  async getLocationCountries() {
    return this.request(API_ENDPOINTS.locationCountries);
  }

  async getLocationCities(countryId: number) {
    return this.request(API_ENDPOINTS.locationCities(countryId));
  }

  // Testimonials
  async getTestimonials() {
    return this.request(API_ENDPOINTS.testimonials);
  }

  async getActiveTestimonials() {
    return this.request(API_ENDPOINTS.testimonialsActive);
  }

  async getTestimonialById(id: number) {
    return this.request(API_ENDPOINTS.testimonialById(id));
  }

  async createTestimonial(data: {
    name: string;
    title: string;
    description: string;
    universityName: string;
    displayOrder?: number;
    isActive?: boolean;
  }) {
    return this.request(API_ENDPOINTS.testimonials, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: number, data: {
    name: string;
    title: string;
    description: string;
    universityName: string;
    displayOrder?: number;
    isActive?: boolean;
  }) {
    return this.request(API_ENDPOINTS.testimonialById(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: number) {
    return this.request(API_ENDPOINTS.testimonialById(id), {
      method: 'DELETE',
    });
  }

  // Auth
  async login(username: string, password: string) {
    try {
      return await this.request(API_ENDPOINTS.authLogin, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {
      // 401 hatası login için normal bir durum (yanlış şifre)
      // Bu hatayı tekrar fırlatma, sadece null döndür
      if (error instanceof Error && (error as any).isAuthError) {
        return null;
      }
      throw error;
    }
  }

  async validateToken(token: string) {
    return this.request(API_ENDPOINTS.authValidate, {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  // Site Settings
  async getSiteSettings() {
    const raw = await this.request<any>(API_ENDPOINTS.siteSettings, {
      cache: 'no-store',
    });
    return normalizeSiteSettings(raw);
  }

  async updateSiteSettings(id: number, data: SiteSettingsUpdatePayload) {
    const raw = await this.request<any>(API_ENDPOINTS.siteSettingsById(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return normalizeSiteSettings(raw);
  }
}

export const apiService = new ApiService();
export default apiService;








