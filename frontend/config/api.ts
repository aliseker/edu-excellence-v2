// Merkezi API URL konfigürasyonu
// Development için: 'https://localhost:7166/api'
// Production için: 'https://eduexcellence.com.tr/api'

//export const API_BASE_URL = 'https://localhost:7166/api';
export const API_BASE_URL = 'https://eduexcellence.com.tr/api';

// Backend base URL (image URLs için)
//export const BACKEND_BASE_URL = 'https://localhost:7166';
export const BACKEND_BASE_URL = 'https://eduexcellence.com.tr';

export const API_ENDPOINTS = {
  // Universities
  universities: '/universities',
  universityById: (id: number) => `/universities/${id}`,
  universitiesByCountry: (country: string) => `/universities/country/${country}`,
  
  // Language Schools
  languageSchools: '/language-schools',
  languageSchoolById: (id: number) => `/language-schools/${id}`,
  
  // Summer Schools
  summerSchools: '/summer-schools',
  summerSchoolById: (id: number) => `/summer-schools/${id}`,
  
  // High Schools
  highSchools: '/high-schools',
  highSchoolById: (id: number) => `/high-schools/${id}`,
  highSchoolCountries: '/high-schools/countries',
  
  // Master/MBA
  masterPrograms: '/master-programs',
  masterProgramById: (id: number) => `/master-programs/${id}`,

  // Internship Programs
  internshipPrograms: '/internship-programs',
  internshipProgramById: (id: number) => `/internship-programs/${id}`,
  
  // Visa
  visaServices: '/visa-services',
  visaServiceById: (id: number) => `/visa-services/${id}`,
  
  // Blog
  blogPosts: '/blog-posts',
  blogPostById: (id: number) => `/blog-posts/${id}`,
  blogPostBySlug: (slug: string) => `/blog-posts/slug/${encodeURIComponent(slug)}`,
  
  // Gallery
  galleryItems: '/gallery',
  galleryItemById: (id: number) => `/gallery/${id}`,
  galleryItemsByCategory: (category: string) => `/gallery/category/${encodeURIComponent(category)}`,
  galleryUploadImage: '/gallery/upload-image',
  
  // Contact
  contact: '/contact',

  // Application (Başvuru)
  application: '/application',

  // Countries
  countries: '/countries',
  countryById: (id: number) => `/countries/${id}`,
  countryFlagUpload: (id: number) => `/countries/${id}/flag`,

  // Locations
  locationCountries: '/locations/countries',
  locationCities: (countryId: number) => `/locations/cities?countryId=${countryId}`,

  // Cities
  cities: '/cities',
  cityById: (id: number) => `/cities/${id}`,

  // Testimonials
  testimonials: '/testimonials',
  testimonialsActive: '/testimonials/active',
  testimonialById: (id: number) => `/testimonials/${id}`,

  // FAQs (Sık Sorulan Sorular)
  faqs: '/faqs',
  faqsActive: '/faqs/active',
  faqById: (id: number) => `/faqs/${id}`,

  // Auth
  authLogin: '/auth/login',
  authValidate: '/auth/validate',

  // Site settings (sosyal medya, WhatsApp)
  siteSettings: '/site-settings',
  siteSettingsById: (id: number) => `/site-settings/${id}`,

  // Erasmus sayfaları (içerik yönetimi)
  erasmusPages: '/erasmus-pages',
  erasmusPageById: (id: number) => `/erasmus-pages/${id}`,
  erasmusPageBySlug: (slug: string) => `/erasmus-pages/slug/${encodeURIComponent(slug)}`,
  erasmusPageUploadPdf: '/erasmus-pages/upload-pdf',
  erasmusPageImagesByPageId: (id: number) => `/erasmus-pages/${id}/images`,
  erasmusPageImageById: (imageId: number) => `/erasmus-pages/images/${imageId}`,
};

/** Admin API istekleri için: Bearer token ekler. json: true ise Content-Type: application/json eklenir (FormData için false kullan). */
export function getAuthHeaders(json = true): HeadersInit {
  const headers: Record<string, string> = {};
  if (json) headers['Content-Type'] = 'application/json';
  if (typeof window !== 'undefined') {
    const t = localStorage.getItem('auth_token');
    if (t) headers['Authorization'] = `Bearer ${t}`;
  }
  return headers;
}









