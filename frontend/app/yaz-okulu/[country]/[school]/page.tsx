'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiService } from '@/services/api';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface Country {
  id: number;
  name: string;
  slug: string;
  flagEmoji: string;
}

interface City {
  id: number;
  name: string;
}

interface SummerSchool {
  id: number;
  name: string;
  countryId: number;
  cityId?: number | null;
  description?: string;
  ageRange?: string;
  duration?: string;
  location?: string;
  website?: string;
  status: string;
  imageBase64?: string;
  features: string[];
  program: {
    lessons: string;
    activities: string[];
    excursions: string[];
  };
  accommodation: Array<{ type: string; description: string; meals: string }>;
  included: string[];
  dates: string[];
}

export default function YazOkuluDetayPage() {
  const params = useParams();
  const countrySlug = params.country as string;
  const schoolId = Number(params.school);

  const [schoolData, setSchoolData] = useState<SummerSchool | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!schoolId) {
          setError('Yaz okulu bulunamadı.');
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.summerSchoolById(schoolId)}`);
        if (!res.ok) {
          throw new Error('Yaz okulu bulunamadı.');
        }
        const fetchedSchool: SummerSchool = await res.json();
        setSchoolData(fetchedSchool);

        const countriesRes = await fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`);
        if (!countriesRes.ok) {
          throw new Error('Ülkeler yüklenemedi.');
        }
        const allCountries: Country[] = await countriesRes.json();
        const matchedCountry = allCountries.find(c => c.id === fetchedSchool.countryId);
        if (matchedCountry) {
          setCountry(matchedCountry);
          const fetchedCities = await apiService.getCities(matchedCountry.id);
          const matchedCity = fetchedSchool.cityId
            ? fetchedCities.find(c => c.id === fetchedSchool.cityId)
            : null;
          setCity(matchedCity || null);
        }
      } catch (err) {
        setError('Yaz okulu detayları yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchoolData();
  }, [schoolId]);

  if (isLoading) return <div className="text-center py-8">Yükleniyor...</div>;
  if (error || !schoolData || !country) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Yaz Okulu Bulunamadı</h1>
          <Link href={`/yaz-okulu/${countrySlug}`} className="text-orange-600 font-bold hover:underline">
            yaz okulları sayfasına dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const features = schoolData.features ?? [];
  const program = schoolData.program ?? { lessons: '', activities: [], excursions: [] };
  const accommodation = schoolData.accommodation ?? [];
  const included = schoolData.included ?? [];
  const dates = schoolData.dates ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b-4 border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600">
            <Link href="/yaz-okulu" className="hover:text-orange-600 transition-colors">Yaz Okulları</Link>
            <span>/</span>
            <Link href={`/yaz-okulu/${countrySlug}`} className="hover:text-orange-600 transition-colors">{country.name || countrySlug}</Link>
            <span>/</span>
            <span className="text-gray-900">{schoolData.name}</span>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 z-10">
          <Link href={`/yaz-okulu/${countrySlug}`} className="inline-block mb-4 text-orange-100 hover:text-white font-bold transition-colors">
            ← Yaz Okulları
          </Link>
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">
              {country.flagEmoji} {city?.name || ''} {country.name ? `, ${country.name}` : ''}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {schoolData.name.toUpperCase()}
          </h1>
          <p className="text-lg md:text-xl text-orange-100 font-medium max-w-3xl leading-relaxed">
            {schoolData.description}
          </p>
          {(schoolData.ageRange || schoolData.duration) && (
            <div className="flex flex-wrap gap-4 mt-6">
              {schoolData.ageRange && (
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                  <div className="text-sm font-bold text-orange-100">Yaş Aralığı</div>
                  <div className="text-lg font-black">{schoolData.ageRange}</div>
                </div>
              )}
              {schoolData.duration && (
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                  <div className="text-sm font-bold text-orange-100">Program Süresi</div>
                  <div className="text-lg font-black">{schoolData.duration}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Quick Info - Dates */}
      {dates.length > 0 && (
        <section className="bg-white border-b-4 border-gray-900 py-6">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
            <div className="text-center">
              <div className="text-2xl font-black text-orange-600 mb-2">Program Tarihleri</div>
              <div className="space-y-2">
                {dates.map((date, index) => (
                  <div key={index} className="text-lg font-bold text-gray-700">{date}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6 mb-6">
            <div className="inline-block px-5 py-2.5 bg-orange-600 text-white border-4 border-orange-800 transform -skew-x-12 mb-4">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">✨ Program Özellikleri</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="p-4 bg-orange-50 border-4 border-orange-200 transform hover:-skew-x-1 transition-all duration-200">
                  <div className="transform skew-x-1">
                    <div className="flex items-start">
                      <span className="text-orange-600 mr-3 font-black text-xl">✓</span>
                      <span className="font-bold text-gray-900">{feature}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Program Details */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lessons & Activities */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6">
            <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Eğitim Programı</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase">{program.lessons}</h3>
              <p className="text-gray-700 font-medium">Modern metodlarla, interaktif ve eğlenceli dersler.</p>
            </div>
            <div>
              <h4 className="font-black text-red-600 mb-4 uppercase tracking-wider">Günlük Aktiviteler</h4>
              <div className="space-y-3">
                {program.activities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-red-600 mr-2 font-black">•</span>
                    <span className="font-bold text-gray-900">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Excursions */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6">
            <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🚌 Geziler</h2>
            </div>
            
            <div className="space-y-3">
              {program.excursions.map((excursion, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-pink-600 mr-2 font-black">•</span>
                  <span className="font-bold text-gray-900">{excursion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      {accommodation.length > 0 && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6 mb-6">
            <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏠 Konaklama Seçenekleri</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accommodation.map((acc, index) => (
                <div key={index} className="p-5 bg-gray-50 border-4 border-gray-300 transform hover:-skew-x-1 transition-all duration-200">
                  <div className="transform skew-x-1">
                    <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">{acc.type}</h3>
                    <p className="text-gray-700 font-medium leading-relaxed mb-4">{acc.description}</p>
                    <div className="text-sm text-gray-600 font-bold">{acc.meals}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Included */}
      {included.length > 0 && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6 mb-6">
            <div className="inline-block px-5 py-2.5 bg-yellow-600 text-white border-4 border-yellow-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📦 Dahil Olan Hizmetler</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {included.map((item, index) => (
                <div key={index} className="p-4 bg-yellow-50 border-2 border-yellow-200">
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-2 font-black">✓</span>
                    <span className="font-bold text-gray-900 text-sm">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location */}
      {schoolData.location && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6">
            <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📍 Lokasyon</h2>
            </div>
            <p className="text-gray-700 font-bold text-lg leading-relaxed">{schoolData.location}</p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            Unutulmaz Bir Yaz Deneyimi İçin Başvurun
          </h2>
          <p className="text-xl text-orange-100 mb-8 font-medium">
            Profesyonel danışmanlarımız size en uygun programı bulmanızda yardımcı olacak
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-5 bg-white text-orange-600 font-black text-lg uppercase tracking-wider border-4 border-orange-800 hover:bg-orange-50 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
          >
            Hemen Başvur
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
