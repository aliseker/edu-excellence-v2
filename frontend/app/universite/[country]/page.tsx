'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import { API_BASE_URL, API_ENDPOINTS, BACKEND_BASE_URL } from '@/config/api';

interface Country {
  id: number;
  name: string;
  slug: string;
  flagEmoji?: string;
  flagImageUrl?: string | null;
}

interface City {
  id: number;
  name: string;
}

interface University {
  id: number;
  name: string;
  description?: string;
  countryId: number;
  cityId?: number | null;
}

export default function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = use(params);
  const countrySlug = resolvedParams.country;

  const [country, setCountry] = useState<Country | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const countriesRes = await fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`);
        const allCountries: Country[] = await countriesRes.json();
        const currentCountry = allCountries.find(c => c.slug === countrySlug);
        if (!currentCountry) {
          setError('Ülke bulunamadı.');
          setIsLoading(false);
          return;
        }
        setCountry(currentCountry);

        const fetchedCities = (await apiService.getCities(currentCountry.id)) as City[];
        setCities(fetchedCities);

        const allUniversities = (await apiService.getUniversities()) as University[];
        const filteredUniversities = allUniversities.filter(uni => uni.countryId === currentCountry.id);
        setUniversities(filteredUniversities);
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [countrySlug]);

  if (isLoading) return <div className="text-center py-8">Yükleniyor...</div>;
  if (error || !country) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Ülke Bulunamadı</h1>
          <p className="text-gray-600 mb-4">{error || 'Ülke bulunamadı.'}</p>
          <Link href="/universite" className="text-blue-600 font-bold hover:underline">
            Üniversiteler sayfasına dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const universitiesGroupedByCity = cities.reduce((acc, city) => {
    const universitiesInCity = universities.filter(uni => uni.cityId === city.id);
    if (universitiesInCity.length > 0) {
      acc.push({ city: city.name, universities: universitiesInCity });
    }
    return acc;
  }, [] as { city: string; universities: University[] }[]);

  const universitiesWithoutCity = universities.filter(
    uni => !uni.cityId || !cities.find(city => city.id === uni.cityId)
  );
  if (universitiesWithoutCity.length > 0) {
    universitiesGroupedByCity.push({ city: 'Diğer', universities: universitiesWithoutCity });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Link href="/universite" className="inline-block mb-4 text-blue-100 hover:text-white font-bold transition-colors">
            ← Üniversiteler
          </Link>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 flex items-center gap-2 text-sm font-black uppercase tracking-wider">
              {country.flagImageUrl ? (
                <img src={`${BACKEND_BASE_URL}${country.flagImageUrl}`} alt={country.name} className="h-6 w-auto object-contain" />
              ) : (
                <span>{country.flagEmoji || '🌍'}</span>
              )}
              {country.name}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {country.name.toUpperCase()}'DA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">ÜNİVERSİTELER</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl">
            {country.name}'daki tüm üniversitelerimizi şehirlere göre keşfedin.
          </p>
        </div>
      </section>

      {/* Cities & Universities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {universitiesGroupedByCity.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">😔</div>
              <p className="font-semibold">Bu ülkede henüz üniversite bulunmamaktadır.</p>
            </div>
          ) : (
            universitiesGroupedByCity.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
                {/* City Header */}
                <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
                  <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">
                    📍 {group.city}
                  </h2>
                </div>

                {/* Universities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.universities.map((university) => (
                    <Link
                      key={university.id}
                      href={`/universite/${countrySlug}/${university.id}`}
                      className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-blue-600 transition-all duration-200 transform hover:-skew-x-1 hover:shadow-lg"
                    >
                      <div className="transform group-hover:skew-x-1">
                        <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                          {university.name}
                        </h3>
                        <p className="text-gray-700 font-medium leading-relaxed mb-4">
                          {university.description || 'Detaylı bilgi için tıklayın.'}
                        </p>
                        <div className="flex items-center text-blue-600 font-bold group-hover:text-blue-700">
                          <span>Detaylı Bilgi</span>
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            {country.name}'da Üniversite Eğitimi
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-medium">
            Size en uygun üniversiteyi seçin ve başvurunuzu yapın
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-5 bg-white text-blue-600 font-black text-lg uppercase tracking-wider border-4 border-blue-800 hover:bg-blue-50 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
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
