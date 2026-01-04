'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';

// Ülke kodları mapping
const countryCodes: Record<string, string> = {
  ingiltere: 'gb',
  amerika: 'us',
  kanada: 'ca',
  almanya: 'de',
  italya: 'it',
  fransa: 'fr',
  polonya: 'pl',
  macaristan: 'hu',
  avusturya: 'at',
  litvanya: 'lt',
  hollanda: 'nl',
  avustralya: 'au',
  irlanda: 'ie',
  malta: 'mt',
  ispanya: 'es',
  isvicre: 'ch',
};

// Mock data - Later this will come from API
const countryData: Record<string, { name: string; cities: Array<{ name: string; schools: Array<{ name: string; slug: string; description: string; ageRange: string; duration: string }> }> }> = {
  almanya: {
    name: 'Almanya',
    cities: [
      {
        name: 'Berlin',
        schools: [
          { name: 'Berlin Mitte Yaz Okulu', slug: 'berlin-mitte', description: 'Berlin şehir merkezinde, modern tesisler ve deneyimli eğitmenlerle Almanca öğrenin.', ageRange: '12-17', duration: '2-4 hafta' },
          { name: 'Berlin Sprachcaffe', slug: 'berlin-sprachcaffe', description: 'Gençler için eğlenceli Almanca programı, sosyal aktiviteler ve şehir gezileri.', ageRange: '14-17', duration: '2-3 hafta' },
        ]
      },
      {
        name: 'Münih',
        schools: [
          { name: 'Münih Yaz Okulu', slug: 'munih-yaz-okulu', description: 'Bavyera\'nın başkentinde, kültürel aktiviteler ve dil eğitimi.', ageRange: '13-17', duration: '2-4 hafta' },
        ]
      },
    ]
  },
  ingiltere: {
    name: 'İngiltere',
    cities: [
      {
        name: 'Londra',
        schools: [
          { name: 'Kings London Central', slug: 'kings-london-central', description: 'London South Bank University kampüsünde, merkezi konum ve modern tesisler.', ageRange: '13-17', duration: '2-4 hafta' },
          { name: 'EC English London', slug: 'ec-english-london', description: 'Covent Garden yakınında, İngiliz kültürünü keşfedin.', ageRange: '12-17', duration: '2-3 hafta' },
        ]
      },
      {
        name: 'Cambridge',
        schools: [
          { name: 'Cambridge Yaz Okulu', slug: 'cambridge-yaz-okulu', description: 'Üniversite şehri atmosferinde akademik odaklı program.', ageRange: '15-17', duration: '3-4 hafta' },
        ]
      },
      {
        name: 'Brighton',
        schools: [
          { name: 'Brighton Yaz Okulu', slug: 'brighton-yaz-okulu', description: 'Sahil kenti, plaj aktiviteleri ve rahat atmosfer.', ageRange: '10-17', duration: '2-3 hafta' },
        ]
      },
    ]
  },
  amerika: {
    name: 'Amerika',
    cities: [
      {
        name: 'New York',
        schools: [
          { name: 'New York Yaz Okulu', slug: 'new-york-yaz-okulu', description: 'Manhattan merkezinde, unutulmaz bir yaz deneyimi.', ageRange: '13-17', duration: '3-6 hafta' },
        ]
      },
      {
        name: 'Los Angeles',
        schools: [
          { name: 'Los Angeles Yaz Okulu', slug: 'los-angeles-yaz-okulu', description: 'Hollywood yakınında, güneşli iklim ve eğlenceli aktiviteler.', ageRange: '12-17', duration: '2-4 hafta' },
        ]
      },
    ]
  },
  kanada: {
    name: 'Kanada',
    cities: [
      {
        name: 'Toronto',
        schools: [
          { name: 'Toronto Yaz Okulu', slug: 'toronto-yaz-okulu', description: 'Çok kültürlü şehir, güvenli ortam ve kaliteli eğitim.', ageRange: '10-17', duration: '2-4 hafta' },
        ]
      },
      {
        name: 'Vancouver',
        schools: [
          { name: 'Vancouver Yaz Okulu', slug: 'vancouver-yaz-okulu', description: 'Doğal güzellikler ve modern şehir yaşamı.', ageRange: '12-17', duration: '2-3 hafta' },
        ]
      },
    ]
  },
  malta: {
    name: 'Malta',
    cities: [
      {
        name: 'St. Julian\'s',
        schools: [
          { name: 'Malta Yaz Okulu', slug: 'malta-yaz-okulu', description: 'Akdeniz iklimi, plaj aktiviteleri ve İngilizce eğitimi.', ageRange: '8-16', duration: '1-3 hafta' },
        ]
      },
    ]
  },
  fransa: {
    name: 'Fransa',
    cities: [
      {
        name: 'Paris',
        schools: [
          { name: 'Paris Yaz Okulu', slug: 'paris-yaz-okulu', description: 'Şehrin ışıkları arasında Fransızca öğrenin.', ageRange: '12-18', duration: '2-3 hafta' },
        ]
      },
      {
        name: 'Nice',
        schools: [
          { name: 'Nice Yaz Okulu', slug: 'nice-yaz-okulu', description: 'Riviera\'da, plaj ve kültür bir arada.', ageRange: '10-17', duration: '2-3 hafta' },
        ]
      },
    ]
  },
  ispanya: {
    name: 'İspanya',
    cities: [
      {
        name: 'Barcelona',
        schools: [
          { name: 'Barcelona Yaz Okulu', slug: 'barcelona-yaz-okulu', description: 'Katalonya\'nın başkentinde İspanyolca ve kültür.', ageRange: '12-17', duration: '2-4 hafta' },
        ]
      },
      {
        name: 'Madrid',
        schools: [
          { name: 'Madrid Yaz Okulu', slug: 'madrid-yaz-okulu', description: 'İspanya\'nın başkentinde yoğun İspanyolca programı.', ageRange: '13-17', duration: '2-3 hafta' },
        ]
      },
    ]
  },
  italya: {
    name: 'İtalya',
    cities: [
      {
        name: 'Roma',
        schools: [
          { name: 'Roma Yaz Okulu', slug: 'roma-yaz-okulu', description: 'Tarihi şehir merkezinde İtalyanca öğrenin.', ageRange: '12-17', duration: '2-3 hafta' },
        ]
      },
    ]
  },
  isvicre: {
    name: 'İsviçre',
    cities: [
      {
        name: 'Zürih',
        schools: [
          { name: 'Zürih Yaz Okulu', slug: 'zurih-yaz-okulu', description: 'Alp manzaralı, çok dilli ortam.', ageRange: '13-17', duration: '2-4 hafta' },
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
          <Link href="/yaz-okulu" className="text-orange-600 font-bold hover:underline">
            Yaz Okulları sayfasına dön
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
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Link href="/yaz-okulu" className="inline-block mb-4 text-orange-100 hover:text-white font-bold transition-colors">
            ← Yaz Okulları
          </Link>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <div className="transform skew-x-12 relative w-8 h-6 border border-white/50 rounded overflow-hidden flex-shrink-0">
              <Image
                src={`https://flagcdn.com/w80/${countryCodes[countryKey] || 'gb'}.png`}
                alt={data.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}'DA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">YAZ OKULLARI</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-orange-100 font-medium max-w-2xl">
            {data.name}'daki tüm yaz okullarımızı şehirlere göre keşfedin.
          </p>
        </div>
      </section>

      {/* Cities & Schools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {data.cities.map((city, cityIndex) => (
            <div key={cityIndex} className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
              {/* City Header */}
              <div className="inline-block px-5 py-2.5 bg-orange-600 text-white border-4 border-orange-800 transform -skew-x-12 mb-6">
                <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">
                  📍 {city.name}
                </h2>
              </div>

              {/* Schools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {city.schools.map((school, schoolIndex) => (
                  <Link
                    key={schoolIndex}
                    href={`/yaz-okulu/${country}/${school.slug}`}
                    className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-orange-600 transition-all duration-200 transform hover:-skew-x-1 hover:shadow-lg"
                  >
                    <div className="transform group-hover:skew-x-1">
                      <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                        {school.name}
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed mb-4">
                        {school.description}
                      </p>
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <span className="font-bold mr-2">Yaş:</span>
                          <span>{school.ageRange}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-bold mr-2">Süre:</span>
                          <span>{school.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-orange-600 font-bold group-hover:text-orange-700">
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
        <div className="bg-gradient-to-r from-orange-500 to-red-500 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            {data.name}'da Yaz Okulu Deneyimi
          </h2>
          <p className="text-xl text-orange-100 mb-8 font-medium">
            Size en uygun programı seçin ve başvurunuzu yapın
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







