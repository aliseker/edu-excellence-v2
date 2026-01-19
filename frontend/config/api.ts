// Merkezi API URL konfigürasyonu
// Development için: 'https://localhost:7166/api'
// Production için: 'https://eduexcellence.com.tr/api'

export const API_BASE_URL = 'https://localhost:7166/api';
//export const API_BASE_URL = 'https://eduexcellence.com.tr/api';

// Backend base URL (image URLs için)
export const BACKEND_BASE_URL = 'https://localhost:7166';
//export const BACKEND_BASE_URL = 'https://eduexcellence.com.tr';

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
  
  // Master/MBA
  masterPrograms: '/master-programs',
  masterProgramById: (id: number) => `/master-programs/${id}`,
  
  // Visa
  visaServices: '/visa-services',
  visaServiceById: (id: number) => `/visa-services/${id}`,
  
  // Contact
  contact: '/contact',
  
  // Countries
  countries: '/countries',
  countryById: (id: number) => `/countries/${id}`,

  // Locations
  locationCountries: '/locations/countries',
  locationCities: (countryId: number) => `/locations/cities?countryId=${countryId}`,

  // Cities
  cities: '/cities',
  cityById: (id: number) => `/cities/${id}`,
};









