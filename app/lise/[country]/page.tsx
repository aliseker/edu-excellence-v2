'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use } from 'react';

// Mock data - Later this will come from API
const countryData: Record<string, { 
  name: string; 
  flag: string; 
  cities: Array<{ 
    name: string; 
    schools: Array<{ 
      name: string; 
      slug: string; 
      type: string;
      description: string; 
    }> 
  }> 
}> = {
  amerika: {
    name: 'Amerika',
    flag: '🇺🇸',
    cities: [
      {
        name: 'Los Angeles',
        schools: [
          { 
            name: 'Beverly High School', 
            slug: 'beverly-high-school', 
            type: 'Devlet',
            description: 'Los Angeles\'ın prestijli Beverly Hills bölgesinde bulunan, akademik başarılarıyla tanınan devlet lisesi.'
          },
          { 
            name: 'Harvard-Westlake School', 
            slug: 'harvard-westlake-school', 
            type: 'Özel',
            description: 'Üst düzey akademik programlar ve üniversite hazırlık odaklı eğitim sunan özel lise.'
          },
        ]
      },
      {
        name: 'New York',
        schools: [
          { 
            name: 'Stuyvesant High School', 
            slug: 'stuyvesant-high-school', 
            type: 'Devlet',
            description: 'New York\'un en prestijli devlet liselerinden biri, bilim ve teknoloji alanında uzmanlaşmış.'
          },
          { 
            name: 'Trinity School', 
            slug: 'trinity-school', 
            type: 'Özel',
            description: 'New York\'un köklü özel liselerinden biri, üniversiteye hazırlık konusunda mükemmel bir geçmişe sahip.'
          },
        ]
      },
      {
        name: 'Boston',
        schools: [
          { 
            name: 'Phillips Academy Andover', 
            slug: 'phillips-academy-andover', 
            type: 'Özel',
            description: 'Amerika\'nın en prestijli yatılı özel liselerinden biri, üniversite hazırlık konusunda lider.'
          },
          { 
            name: 'Boston Latin School', 
            slug: 'boston-latin-school', 
            type: 'Devlet',
            description: 'Amerika\'nın en eski devlet lisesi, klasik eğitim ve akademik mükemmellik geleneği.'
          },
        ]
      },
    ]
  },
  kanada: {
    name: 'Kanada',
    flag: '🇨🇦',
    cities: [
      {
        name: 'Toronto',
        schools: [
          { 
            name: 'Upper Canada College', 
            slug: 'upper-canada-college', 
            type: 'Özel',
            description: 'Kanada\'nın önde gelen özel erkek liselerinden biri, IB programı sunuyor.'
          },
          { 
            name: 'Bayview Glen School', 
            slug: 'bayview-glen-school', 
            type: 'Özel',
            description: 'Karma eğitim veren özel lise, üniversite hazırlık programları ile tanınır.'
          },
        ]
      },
      {
        name: 'Vancouver',
        schools: [
          { 
            name: 'St. George\'s School', 
            slug: 'st-georges-school-vancouver', 
            type: 'Özel',
            description: 'Vancouver\'ın prestijli özel liselerinden biri, mükemmel akademik ve spor programları.'
          },
          { 
            name: 'Little Flower Academy', 
            slug: 'little-flower-academy', 
            type: 'Özel',
            description: 'Kız liseleri arasında öne çıkan, akademik başarılarıyla tanınan okul.'
          },
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
          { 
            name: 'Eton College', 
            slug: 'eton-college', 
            type: 'Özel',
            description: 'İngiltere\'nin en prestijli özel erkek liselerinden biri, köklü bir eğitim geleneği.'
          },
          { 
            name: 'Westminster School', 
            slug: 'westminster-school', 
            type: 'Özel',
            description: 'Londra\'nın merkezinde, akademik mükemmellik ve üniversite hazırlık konusunda lider.'
          },
        ]
      },
      {
        name: 'Oxford',
        schools: [
          { 
            name: 'Magdalen College School', 
            slug: 'magdalen-college-school', 
            type: 'Özel',
            description: 'Oxford\'un tarihi atmosferinde, klasik eğitim ve modern yaklaşımları birleştiren okul.'
          },
        ]
      },
      {
        name: 'Cambridge',
        schools: [
          { 
            name: 'The Perse School', 
            slug: 'the-perse-school', 
            type: 'Özel',
            description: 'Cambridge\'in köklü okullarından biri, akademik başarılarıyla tanınır.'
          },
        ]
      },
    ]
  },
  irlanda: {
    name: 'İrlanda',
    flag: '🇮🇪',
    cities: [
      {
        name: 'Dublin',
        schools: [
          { 
            name: 'Belvedere College', 
            slug: 'belvedere-college', 
            type: 'Özel',
            description: 'Dublin\'in köklü özel liselerinden biri, akademik başarılarıyla tanınır.'
          },
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
          { 
            name: 'Gymnasium Steglitz', 
            slug: 'gymnasium-steglitz', 
            type: 'Devlet',
            description: 'Berlin\'in önde gelen devlet liselerinden biri, Abitur programı sunuyor.'
          },
        ]
      },
    ]
  },
  italya: {
    name: 'İtalya',
    flag: '🇮🇹',
    cities: [
      {
        name: 'Roma',
        schools: [
          { 
            name: 'Liceo Classico', 
            slug: 'liceo-classico-roma', 
            type: 'Devlet',
            description: 'Roma\'nın klasik eğitim veren devlet liselerinden biri.'
          },
        ]
      },
    ]
  },
  fransa: {
    name: 'Fransa',
    flag: '🇫🇷',
    cities: [
      {
        name: 'Paris',
        schools: [
          { 
            name: 'Lycée Louis-le-Grand', 
            slug: 'lycee-louis-le-grand', 
            type: 'Devlet',
            description: 'Paris\'in en prestijli devlet liselerinden biri, üniversite hazırlık konusunda lider.'
          },
        ]
      },
    ]
  },
  ispanya: {
    name: 'İspanya',
    flag: '🇪🇸',
    cities: [
      {
        name: 'Madrid',
        schools: [
          { 
            name: 'Colegio San Patricio', 
            slug: 'colegio-san-patricio', 
            type: 'Özel',
            description: 'Madrid\'in önde gelen özel liselerinden biri, IB programı sunuyor.'
          },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ülke Bulunamadı</h1>
            <Link href="/lise" className="text-purple-600 hover:text-purple-800 font-semibold">
              Lise sayfasına dön
            </Link>
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







