'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { slugify } from '@/utils/format';

export default function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = use(params);
  const [countryName, setCountryName] = useState('');
  const [countryFlag, setCountryFlag] = useState('🌍');
  const [regions, setRegions] = useState<Array<{ name: string; schools: Array<{ id: number; name: string; description: string }> }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.languageSchools}`);
        const data = await res.json();
        const slug = country.toLowerCase();
        const filtered = data.filter((school: any) => {
          const schoolCountrySlug = school.countrySlug || slugify(school.countryName || '');
          return schoolCountrySlug === slug;
        });

        if (filtered.length === 0) {
          setNotFound(true);
          setRegions([]);
          return;
        }

        setCountryName(filtered[0].countryName || slug);
        setCountryFlag(filtered[0].flag || '🌍');

        const regionMap = new Map<string, Array<{ id: number; name: string; description: string }>>();
        filtered.forEach((school: any) => {
          const region = school.cityName || 'Diğer';
          if (!regionMap.has(region)) {
            regionMap.set(region, []);
          }
          regionMap.get(region)!.push({
            id: school.id,
            name: school.name,
            description: school.description || ''
          });
        });

        const regionList = Array.from(regionMap.entries()).map(([name, schools]) => ({
          name,
          schools
        }));
        setRegions(regionList);
      } catch (error) {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, [country]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-600 font-bold">Yükleniyor...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Ülke Bulunamadı</h1>
          <Link href="/dil-okulu" className="text-purple-600 font-bold hover:underline">
            Dil Okulları sayfasına dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Link href="/dil-okulu" className="inline-block mb-4 text-purple-100 hover:text-white font-bold transition-colors">
            ← Dil Okulları
          </Link>
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{countryFlag} {countryName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {countryName.toUpperCase()}'DA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">DİL OKULLARI</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 font-medium max-w-2xl">
            {countryName}'daki tüm dil okullarımızı bölgelere göre keşfedin.
          </p>
        </div>
      </section>

      {/* Regions & Schools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {regions.map((region, regionIndex) => (
            <div key={regionIndex} className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
              {/* Region Header */}
              <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
                <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">
                  📍 {region.name}
                </h2>
              </div>

              {/* Schools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {region.schools.map((school, schoolIndex) => (
                  <Link
                    key={schoolIndex}
                    href={`/dil-okulu/${country}/${school.id}`}
                    className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-purple-600 transition-all duration-200 transform hover:-skew-x-1 hover:shadow-lg"
                  >
                    <div className="transform group-hover:skew-x-1">
                      <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
                        {school.name}
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed mb-4">
                        {school.description}
                      </p>
                      <div className="flex items-center text-purple-600 font-bold group-hover:text-purple-700">
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
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            {countryName}'da Dil Eğitimi Alın
          </h2>
          <p className="text-xl text-purple-100 mb-8 font-medium">
            Size en uygun okulu seçin ve başvurunuzu yapın
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-5 bg-white text-purple-600 font-black text-lg uppercase tracking-wider border-4 border-purple-800 hover:bg-purple-50 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
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





