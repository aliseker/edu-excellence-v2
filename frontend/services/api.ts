import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
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

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      if (!response.ok) {
        // Don't expose detailed error information to prevent information leakage
        const status = response.status;
        if (status >= 500) {
          throw new Error('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.');
        } else if (status === 404) {
          throw new Error('İstenen kaynak bulunamadı.');
        } else if (status === 401 || status === 403) {
          throw new Error('Yetkiniz bulunmamaktadır.');
        } else {
          throw new Error('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      }

      return response.json();
    } catch (error) {
      // Log error for debugging but don't expose details to user
      if (error instanceof Error) {
        console.error('API request failed:', error.message);
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

  // Visa Services
  async getVisaServices(filters?: {
    country?: string;
    type?: string;
  }) {
    return this.request(API_ENDPOINTS.visaServices, {
      params: filters as Record<string, string>,
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
}

export const apiService = new ApiService();
export default apiService;








