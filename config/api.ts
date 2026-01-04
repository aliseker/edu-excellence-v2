// API Configuration
// 
// LOCAL DEVELOPMENT için:
// .env.local dosyasında: NEXT_PUBLIC_API_URL=http://localhost:5000/api
// Veya buradaki default değeri kullanır: http://localhost:5000/api
//
// PRODUCTION (Canlı) için:
// VPS'te .env.local dosyasında: NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
// Örnek: NEXT_PUBLIC_API_URL=https://api.edu-excellence.net/api
//
// Elle değiştirmek istersen, aşağıdaki satırı düzenle:
// const LOCAL_API_URL = 'http://localhost:5000/api';
// const PRODUCTION_API_URL = 'https://your-backend-api.com/api';

// Environment variable'dan al, yoksa localhost kullan (development için)
const getApiUrl = (): string => {
  // .env.local dosyasından NEXT_PUBLIC_API_URL değişkenini oku
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Development için default localhost
  // Production'da mutlaka .env.local dosyasında NEXT_PUBLIC_API_URL tanımla!
  return 'http://localhost:5000/api';
};

export const API_BASE_URL = getApiUrl();

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









