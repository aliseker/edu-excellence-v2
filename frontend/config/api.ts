// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
  
  // Cities
  cities: '/cities',
  citiesByCountry: (country: string) => `/cities/country/${country}`,
};









