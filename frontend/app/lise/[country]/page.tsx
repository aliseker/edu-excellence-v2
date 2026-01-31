'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export default function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = use(params);
  const countryKey = country.toLowerCase();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [apiData, setApiData] = useState<{
    name: string;
    flag: string;
    cities: Array<{
      name: string;
      schools: Array<{
        name: string;
        slug: string;
        type: string;
        description: string;
      }>;
    }>;
  } | null>(null);

  const flagEmojiBySlug: Record<string, string> = useMemo(() => ({
    amerika: '🇺🇸',
    kanada: '🇨🇦',
    ingiltere: '🇬🇧',
    irlanda: '🇮🇪',
    almanya: '🇩🇪',
    italya: '🇮🇹',
    fransa: '🇫🇷',
    ispanya: '🇪🇸',
  }), []);

  useEffect(() => {
    const fetchCountryHighSchools = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        // 1) Resolve countryId by slug from locations/countries
        const countriesRes = await fetch(`${API_BASE_URL}${API_ENDPOINTS.locationCountries}`);
        if (!countriesRes.ok) {
          throw new Error('Ülkeler yüklenemedi.');
        }
        const countries = await countriesRes.json();
        const match = (Array.isArray(countries) ? countries : []).find((c: any) =>
          String(c.value ?? '').toLowerCase() === countryKey
        );

        if (!match) {
          setApiData(null);
          return;
        }

        // 2) Fetch high schools by countryId
        const schoolsRes = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.highSchools}?countryId=${Number(match.id)}&status=active`
        );
        if (!schoolsRes.ok) {
          throw new Error('Liseler yüklenemedi.');
        }
        const schools = await schoolsRes.json();

        const cityMap = new Map<string, Array<{ name: string; slug: string; type: string; description: string }>>();
        (Array.isArray(schools) ? schools : []).forEach((s: any) => {
          const cityName = String(s.cityName ?? '').trim() || 'Diğer';
          const list = cityMap.get(cityName) ?? [];
          list.push({
            name: String(s.name ?? ''),
            // Detail route will accept numeric id too
            slug: String(s.id),
            // Backend currently doesn't store type; keep existing UI badge with a safe default
            type: 'Devlet',
            description: String(s.description ?? ''),
          });
          cityMap.set(cityName, list);
        });

        const cities = Array.from(cityMap.entries())
          .sort((a, b) => a[0].localeCompare(b[0], 'tr'))
          .map(([name, schools]) => ({
            name,
            schools: schools.filter(x => x.name.trim() !== ''),
          }))
          .filter(c => c.schools.length > 0);

        setApiData({
          name: String(match.label ?? match.name ?? match.value ?? ''),
          flag: flagEmojiBySlug[countryKey] ?? '🌍',
          cities,
        });
      } catch (error) {
        console.error('Lise ülke sayfası yüklenemedi:', error);
        setApiError('Lise verileri yüklenirken bir hata oluştu.');
        setApiData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryHighSchools();
  }, [countryKey, flagEmojiBySlug]);

  const data = apiData;

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ülke Bulunamadı</h1>
            <Link href="/lise" className="text-purple-600 hover:text-purple-800 font-semibold">
              Lise sayfasına dön
            </Link>
            {isLoading && (
              <p className="mt-4 text-gray-600 font-medium">Yükleniyor...</p>
            )}
            {apiError && (
              <p className="mt-2 text-red-600 font-semibold">{apiError}</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.flag} {data.name}'da Lise</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}'DA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">LİSE EĞİTİMİ</span>
            </span>
          </h1>
        </div>
      </section>

      {/* Schools by City */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading && (
          <div className="text-center text-gray-600 font-semibold">
            Yükleniyor...
          </div>
        )}
        {apiError && (
          <div className="text-center text-red-600 font-semibold">
            {apiError}
          </div>
        )}
        {data.cities.map((city, cityIndex) => (
          <div key={city.name} className={cityIndex > 0 ? 'mt-16' : ''}>
            <div className="mb-8">
              <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-4">
                <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">
                  📍 {city.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.schools.map((school) => (
                <Link
                  key={school.slug}
                  href={`/lise/${countryKey}/${school.slug}`}
                  className="group bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0_0_rgba(34,197,94,0.3)] p-6 transition-all duration-200 transform hover:-translate-y-2 hover:-translate-x-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-green-600 transition-colors uppercase tracking-tight flex-1">
                      {school.name}
                    </h3>
                    <span className={`ml-3 px-3 py-1 text-xs font-black uppercase tracking-wider border-2 ${
                      school.type === 'Özel' 
                        ? 'bg-purple-100 text-purple-800 border-purple-600' 
                        : 'bg-green-100 text-green-800 border-green-600'
                    }`}>
                      {school.type}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed mb-4">
                    {school.description}
                  </p>
                  <div className="flex items-center text-green-600 font-black text-sm uppercase tracking-wider group-hover:text-green-700">
                    Detaylı Bilgi
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Başvuru Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            {data.name}'da lise eğitimi hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-4 bg-white text-green-600 font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
          >
            HEMEN BAŞVUR
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}





