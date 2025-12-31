'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use } from 'react';

// Mock data - Later this will come from API
const countryData: Record<string, { name: string; flag: string; cities: Array<{ name: string; universities: Array<{ name: string; slug: string; description: string }> }> }> = {
  ingiltere: {
    name: 'İngiltere',
    flag: '🇬🇧',
    cities: [
      {
        name: 'Birmingham',
        universities: [
          { name: 'Birmingham City University', slug: 'birmingham-city-university', description: 'Modern kampüs, güçlü endüstri bağlantıları ve pratik odaklı eğitim.' },
          { name: 'University of Birmingham', slug: 'university-of-birmingham', description: 'Russell Group üyesi, araştırma odaklı prestijli üniversite.' },
        ]
      },
      {
        name: 'Londra',
        universities: [
          { name: 'King\'s College London', slug: 'kings-college-london', description: 'Dünya çapında tanınan, merkezi Londra konumunda prestijli üniversite.' },
          { name: 'University College London (UCL)', slug: 'university-college-london', description: 'QS sıralamasında ilk 10\'da yer alan, araştırma odaklı üniversite.' },
          { name: 'London School of Economics (LSE)', slug: 'london-school-of-economics', description: 'Sosyal bilimler alanında dünya lideri, prestijli üniversite.' },
        ]
      },
      {
        name: 'Manchester',
        universities: [
          { name: 'University of Manchester', slug: 'university-of-manchester', description: 'Russell Group üyesi, güçlü araştırma altyapısı.' },
        ]
      },
    ]
  },
  amerika: {
    name: 'Amerika',
    flag: '🇺🇸',
    cities: [
      {
        name: 'New York',
        universities: [
          { name: 'New York University (NYU)', slug: 'new-york-university', description: 'Manhattan merkezinde, dünya çapında tanınan üniversite.' },
          { name: 'Columbia University', slug: 'columbia-university', description: 'Ivy League üyesi, dünyanın en prestijli üniversitelerinden biri.' },
        ]
      },
      {
        name: 'California',
        universities: [
          { name: 'University of California, Los Angeles (UCLA)', slug: 'ucla', description: 'Sunset Boulevard yakınında, güçlü akademik programlar.' },
          { name: 'Stanford University', slug: 'stanford-university', description: 'Silicon Valley yakınında, teknoloji ve inovasyon merkezi.' },
        ]
      },
      {
        name: 'Massachusetts',
        universities: [
          { name: 'Harvard University', slug: 'harvard-university', description: 'Ivy League üyesi, dünyanın en prestijli üniversitesi.' },
          { name: 'Massachusetts Institute of Technology (MIT)', slug: 'mit', description: 'Teknoloji ve mühendislik alanında dünya lideri.' },
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
        universities: [
          { name: 'Humboldt University of Berlin', slug: 'humboldt-university-berlin', description: 'Tarihi üniversite, güçlü araştırma altyapısı.' },
          { name: 'Free University of Berlin', slug: 'free-university-berlin', description: 'Özgür araştırma geleneği, çeşitli program seçenekleri.' },
        ]
      },
      {
        name: 'Münih',
        universities: [
          { name: 'Technical University of Munich', slug: 'technical-university-munich', description: 'Teknik alanlarda güçlü, endüstri bağlantıları.' },
          { name: 'Ludwig Maximilian University of Munich', slug: 'lmu-munich', description: 'Araştırma odaklı, prestijli üniversite.' },
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
        universities: [
          { name: 'University of Toronto', slug: 'university-of-toronto', description: 'Kanada\'nın en prestijli üniversitesi, dünya çapında tanınan programlar.' },
        ]
      },
      {
        name: 'Vancouver',
        universities: [
          { name: 'University of British Columbia (UBC)', slug: 'ubc', description: 'Körfez manzaralı kampüs, güçlü araştırma programları.' },
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
        universities: [
          { name: 'Sapienza University of Rome', slug: 'sapienza-university-rome', description: 'Avrupa\'nın en büyük üniversitelerinden biri, tarihi şehir merkezi.' },
        ]
      },
      {
        name: 'Milano',
        universities: [
          { name: 'Bocconi University', slug: 'bocconi-university', description: 'İşletme ve ekonomi alanında Avrupa\'nın en prestijli üniversitelerinden biri.' },
        ]
      },
    ]
  },
};

export default function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = use(params);
  const country = resolvedParams.country;
  const countryKey = country.toLowerCase();
  const data = countryData[countryKey];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Ülke Bulunamadı</h1>
          <Link href="/universite" className="text-blue-600 font-bold hover:underline">
            Üniversiteler sayfasına dön
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
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.flag} {data.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}'DA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">ÜNİVERSİTELER</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl">
            {data.name}'daki tüm üniversitelerimizi şehirlere göre keşfedin.
          </p>
        </div>
      </section>

      {/* Cities & Universities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {data.cities.map((city, cityIndex) => (
            <div key={cityIndex} className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
              {/* City Header */}
              <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
                <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">
                  📍 {city.name}
                </h2>
              </div>

              {/* Universities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {city.universities.map((university, universityIndex) => (
                  <Link
                    key={universityIndex}
                    href={`/universite/${country}/${university.slug}`}
                    className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-blue-600 transition-all duration-200 transform hover:-skew-x-1 hover:shadow-lg"
                  >
                    <div className="transform group-hover:skew-x-1">
                      <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                        {university.name}
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed mb-4">
                        {university.description}
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
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            {data.name}'da Üniversite Eğitimi
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
