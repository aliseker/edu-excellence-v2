'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
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

interface MasterProgram {
  id: number;
  name: string;
  description?: string;
  countryId: number;
  cityId?: number | null;
}

export default function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = use(params);
  const countrySlug = country.toLowerCase();

  const [countryData, setCountryData] = useState<Country | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [programs, setPrograms] = useState<MasterProgram[]>([]);
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
        setCountryData(currentCountry);

        const fetchedCities = await apiService.getCities(currentCountry.id);
        setCities(fetchedCities);

        const allPrograms: MasterProgram[] = await apiService.getMasterPrograms();
        const filteredPrograms = allPrograms.filter(program => program.countryId === currentCountry.id);
        setPrograms(filteredPrograms);
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [countrySlug]);

  if (isLoading) return <div className="text-center py-8">Yükleniyor...</div>;
  if (error || !countryData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Ülke Bulunamadı</h1>
          <p className="text-gray-600 mb-4">{error || 'Ülke bulunamadı.'}</p>
          <Link href="/master-mba" className="text-blue-600 font-bold hover:underline">
            Master / MBA sayfasına dön
          </Link>
        </div>
        <Footer />
        <WhatsAppWidget />
        <ScrollToTop />
      </div>
    );
  }

  const programsGroupedByCity = cities.reduce((acc, city) => {
    const programsInCity = programs.filter(program => program.cityId === city.id);
    if (programsInCity.length > 0) {
      acc.push({ city: city.name, programs: programsInCity });
    }
    return acc;
  }, [] as { city: string; programs: MasterProgram[] }[]);

  const programsWithoutCity = programs.filter(
    program => !program.cityId || !cities.find(city => city.id === program.cityId)
  );
  if (programsWithoutCity.length > 0) {
    programsGroupedByCity.push({ city: 'Diğer', programs: programsWithoutCity });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b-4 border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600">
            <Link href="/master-mba" className="hover:text-blue-600 transition-colors">Master / MBA</Link>
            <span>/</span>
            <span className="text-gray-900">{countryData.name}</span>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 text-white py-16 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{countryData.flagEmoji || '🌍'} {countryData.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {countryData.name.toUpperCase()}'DA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">MASTER / MBA</span>
            </span>
          </h1>
        </div>
      </section>

      {/* Schools by City */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {programsGroupedByCity.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">😔</div>
            <p className="font-semibold">Bu ülkede henüz program bulunmamaktadır.</p>
          </div>
        ) : (
          programsGroupedByCity.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-12">
              <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
                <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📍 {group.city}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.programs.map((program) => (
                  <Link
                    key={program.id}
                    href={`/master-mba/${countrySlug}/${program.id}`}
                    className="group bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] p-6 transform hover:-skew-x-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] transition-all duration-200"
                  >
                    <div className="transform group-hover:skew-x-1">
                      <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{program.name}</h3>
                      <p className="text-gray-700 font-medium leading-relaxed">{program.description || 'Detaylı bilgi için tıklayın.'}</p>
                      <div className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white font-black text-sm uppercase tracking-wider border-2 border-purple-800">
                        Detayları Gör
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Hemen Başvuru Yapın</h2>
          <p className="text-xl text-purple-100 mb-8 font-medium max-w-2xl mx-auto">
            {countryData.name}'da master veya MBA eğitimi için hemen başvuru yapın. Tüm işlemleriniz ücretsiz!
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-5 bg-white text-purple-600 font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-purple-50 transition-all duration-200 transform hover:-skew-x-1"
          >
            <span className="transform skew-x-1 block">BAŞVURU YAP</span>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}





