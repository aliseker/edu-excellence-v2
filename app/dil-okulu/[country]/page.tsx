'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use } from 'react';

// Mock data - Later this will come from API
const countryData: Record<string, { name: string; flag: string; regions: Array<{ name: string; schools: Array<{ name: string; slug: string; description: string; image?: string }> }> }> = {
  amerika: {
    name: 'Amerika',
    flag: '🇺🇸',
    regions: [
      {
        name: 'New York',
        schools: [
          { name: 'LSI Language Studies International - New York', slug: 'lsi-language-studies-international-new-york', description: 'Manhattan merkezinde, modern tesisler ve deneyimli öğretmen kadrosu ile İngilizce eğitimi.' },
          { name: 'Kaplan International - New York', slug: 'kaplan-international-new-york', description: 'Empire State Building yakınında, yoğun ve genel İngilizce programları.' },
        ]
      },
      {
        name: 'Boston',
        schools: [
          { name: 'LSI Language Studies International - Boston', slug: 'lsi-language-studies-international-boston', description: 'Tarihi şehir merkezinde, üniversite ortamında dil öğrenme imkanı.' },
          { name: 'EC English - Boston', slug: 'ec-english-boston', description: 'Prestijli Back Bay bölgesinde, modern sınıflar ve kültürel aktiviteler.' },
        ]
      },
      {
        name: 'Los Angeles',
        schools: [
          { name: 'Kaplan International - Los Angeles', slug: 'kaplan-international-los-angeles', description: 'Hollywood yakınında, güneşli iklim ve plaj aktiviteleri ile birleşen eğitim.' },
          { name: 'EC English - Los Angeles', slug: 'ec-english-los-angeles', description: 'Santa Monica bölgesinde, eğlence ve eğitimin birleştiği okul.' },
        ]
      },
    ]
  },
  ingiltere: {
    name: 'İngiltere',
    flag: '🇬🇧',
    regions: [
      {
        name: 'Londra',
        schools: [
          { name: 'EC English - London', slug: 'ec-english-london', description: 'Covent Garden merkezinde, İngiliz kültürünü yakından tanıma fırsatı.' },
          { name: 'Kaplan International - London', slug: 'kaplan-international-london', description: 'Trafalgar Square yakınında, şehir merkezi konumu.' },
        ]
      },
      {
        name: 'Cambridge',
        schools: [
          { name: 'EC English - Cambridge', slug: 'ec-english-cambridge', description: 'Üniversite şehri atmosferinde, akademik İngilizce programları.' },
        ]
      },
      {
        name: 'Brighton',
        schools: [
          { name: 'EC English - Brighton', slug: 'ec-english-brighton', description: 'Sahil kenti, rahat atmosfer ve plaj aktiviteleri.' },
        ]
      },
    ]
  },
  kanada: {
    name: 'Kanada',
    flag: '🇨🇦',
    regions: [
      {
        name: 'Toronto',
        schools: [
          { name: 'ILAC - Toronto', slug: 'ilac-toronto', description: 'Dünya standartlarında eğitim, çok kültürlü şehir deneyimi.' },
          { name: 'EC English - Toronto', slug: 'ec-english-toronto', description: 'Downtown konumu, modern tesisler ve profesyonel eğitim.' },
        ]
      },
      {
        name: 'Vancouver',
        schools: [
          { name: 'ILAC - Vancouver', slug: 'ilac-vancouver', description: 'Doğal güzellikler ve modern şehir yaşamının birleştiği okul.' },
          { name: 'Kaplan International - Vancouver', slug: 'kaplan-international-vancouver', description: 'Körfez manzaralı, sıcak atmosfer ve kaliteli eğitim.' },
        ]
      },
    ]
  },
  irlanda: {
    name: 'İrlanda',
    flag: '🇮🇪',
    regions: [
      {
        name: 'Dublin',
        schools: [
          { name: 'EC English - Dublin', slug: 'ec-english-dublin', description: 'Tarihi şehir merkezinde, İrlanda kültürünü keşfedin.' },
        ]
      },
    ]
  },
  malta: {
    name: 'Malta',
    flag: '🇲🇹',
    regions: [
      {
        name: 'St. Julian\'s',
        schools: [
          { name: 'EC English - Malta', slug: 'ec-english-malta', description: 'Akdeniz iklimi, plaj aktiviteleri ve İngilizce eğitimi.' },
        ]
      },
    ]
  },
  avustralya: {
    name: 'Avustralya',
    flag: '🇦🇺',
    regions: [
      {
        name: 'Sydney',
        schools: [
          { name: 'EC English - Sydney', slug: 'ec-english-sydney', description: 'Opera House yakınında, muhteşem liman manzarası.' },
        ]
      },
    ]
  },
};

export default function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = use(params);
  const data = countryData[country.toLowerCase()];

  if (!data) {
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.flag} {data.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}'DA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">DİL OKULLARI</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 font-medium max-w-2xl">
            {data.name}'daki tüm dil okullarımızı bölgelere göre keşfedin.
          </p>
        </div>
      </section>

      {/* Regions & Schools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {data.regions.map((region, regionIndex) => (
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
                    href={`/dil-okulu/${country}/${school.slug}`}
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
            {data.name}'da Dil Eğitimi Alın
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





