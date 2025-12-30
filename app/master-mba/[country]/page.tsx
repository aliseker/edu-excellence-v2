'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use } from 'react';

// Mock data - Later this will come from API
const countryData: Record<string, { name: string; flag: string; cities: Array<{ name: string; schools: Array<{ name: string; slug: string; description: string }> }> }> = {
  amerika: {
    name: 'Amerika',
    flag: '🇺🇸',
    cities: [
      {
        name: 'New York',
        schools: [
          { name: 'Berkeley College', slug: 'berkeley-college', description: 'Pratik odaklı eğitim, güçlü iş dünyası bağlantıları ve kariyer desteği.' },
          { name: 'New York University (NYU)', slug: 'nyu', description: 'Prestijli MBA programları ve güçlü mezun ağı.' },
        ]
      },
      {
        name: 'California',
        schools: [
          { name: 'University of California, Berkeley', slug: 'uc-berkeley', description: 'Dünya çapında tanınan MBA ve master programları.' },
        ]
      },
      {
        name: 'Massachusetts',
        schools: [
          { name: 'Harvard Business School', slug: 'harvard-business-school', description: 'Dünyanın en prestijli MBA programlarından biri.' },
        ]
      },
    ]
  },
  ingiltere: {
    name: 'İngiltere',
    flag: '🇬🇧',
    cities: [
      {
        name: 'Londra',
        schools: [
          { name: 'London Business School', slug: 'london-business-school', description: 'Avrupa\'nın en prestijli işletme okullarından biri.' },
          { name: 'Imperial College Business School', slug: 'imperial-college-business', description: 'Teknoloji ve işletme alanında güçlü programlar.' },
        ]
      },
      {
        name: 'Cambridge',
        schools: [
          { name: 'Cambridge Judge Business School', slug: 'cambridge-judge-business', description: 'Prestijli MBA programları ve güçlü araştırma.' },
        ]
      },
    ]
  },
  italya: {
    name: 'İtalya',
    flag: '🇮🇹',
    cities: [
      {
        name: 'Milano',
        schools: [
          { name: 'Bocconi University', slug: 'bocconi-university', description: 'İşletme ve ekonomi alanında Avrupa\'nın lider üniversitesi.' },
        ]
      },
      {
        name: 'Roma',
        schools: [
          { name: 'Sapienza University of Rome', slug: 'sapienza-university-rome', description: 'Çeşitli master programları ve araştırma fırsatları.' },
        ]
      },
    ]
  },
  almanya: {
    name: 'Almanya',
    flag: '🇩🇪',
    cities: [
      {
        name: 'Berlin',
        schools: [
          { name: 'Humboldt University of Berlin', slug: 'humboldt-university-berlin', description: 'Ücretsiz eğitim, güçlü akademik programlar.' },
        ]
      },
      {
        name: 'Münih',
        schools: [
          { name: 'Technical University of Munich', slug: 'technical-university-munich', description: 'Teknik alanlarda master programları.' },
        ]
      },
    ]
  },
};

export default function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = use(params);
  const countryKey = country.toLowerCase();
  const data = countryData[countryKey];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Ülke Bulunamadı</h1>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b-4 border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600">
            <Link href="/master-mba" className="hover:text-blue-600 transition-colors">Master / MBA</Link>
            <span>/</span>
            <span className="text-gray-900">{data.name}</span>
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.flag} {data.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}'DA
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
        {data.cities.map((city, cityIndex) => (
          <div key={cityIndex} className="mb-12">
            <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📍 {city.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.schools.map((school) => (
                <Link
                  key={school.slug}
                  href={`/master-mba/${countryKey}/${school.slug}`}
                  className="group bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] p-6 transform hover:-skew-x-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] transition-all duration-200"
                >
                  <div className="transform group-hover:skew-x-1">
                    <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{school.name}</h3>
                    <p className="text-gray-700 font-medium leading-relaxed">{school.description}</p>
                    <div className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white font-black text-sm uppercase tracking-wider border-2 border-purple-800">
                      Detayları Gör
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Hemen Başvuru Yapın</h2>
          <p className="text-xl text-purple-100 mb-8 font-medium max-w-2xl mx-auto">
            {data.name}'da master veya MBA eğitimi için hemen başvuru yapın. Tüm işlemleriniz ücretsiz!
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





