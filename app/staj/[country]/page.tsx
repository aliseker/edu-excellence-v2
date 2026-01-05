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
  generalInfo: string;
  programs: Array<{
    name: string;
    type: 'Internship' | 'Trainee';
    description: string;
    duration: string;
    requirements: string[];
    fields: string[];
  }>;
  benefits: string[];
  process: string[];
  documents: string[];
}> = {
  amerika: {
    name: 'Amerika',
    flag: '🇺🇸',
    generalInfo: 'Amerika\'da staj programları, J-1 Programı kapsamında yürütülen kültürel değişim programlarıdır. Amerika Birleşik Devletleri tarafından uluslararası mezun ve profesyonellerin kariyerlerini geliştirme süreçlerinde ABD\'de uluslararası bir iş deneyimi kazanmalarına ve dillerini geliştirmelerine olanak sağlar.',
    programs: [
      {
        name: 'Turizm Stajı',
        type: 'Internship',
        description: 'Otel, restoran ve turizm sektöründe uluslararası iş deneyimi kazanın. Müşteri hizmetleri, rezervasyon, etkinlik yönetimi gibi alanlarda staj yapabilirsiniz.',
        duration: '6-12 ay (Internship), 18 ay (Trainee)',
        requirements: [
          '4 yıllık üniversite öğrencisi veya mezunu (mezuniyet üzerinden 12 ay geçmemiş) - Internship için',
          'Mezuniyet üzerinden 1+ yıl geçmiş + en az 1 yıl iş deneyimi - Trainee için',
          'Turizm/Hotelcilik bölümlerinden mezun olmak avantajlıdır',
          'Temel İngilizce bilgisi',
        ],
        fields: [
          'Otel Yönetimi',
          'Restoran İşletmeciliği',
          'Müşteri Hizmetleri',
          'Etkinlik Yönetimi',
          'Rezervasyon Sistemleri',
        ],
      },
      {
        name: 'Aşçılık Stajı',
        type: 'Internship',
        description: 'Amerika\'nın önde gelen restoranlarında aşçılık deneyimi kazanın. Farklı mutfak kültürleri ve modern teknikler öğrenin.',
        duration: '6-12 ay (Internship), 18 ay (Trainee)',
        requirements: [
          '4 yıllık üniversite öğrencisi veya mezunu (mezuniyet üzerinden 12 ay geçmemiş) - Internship için',
          'Mezuniyet üzerinden 1+ yıl geçmiş + en az 1 yıl iş deneyimi - Trainee için',
          'Aşçılık/Mutfak Sanatları bölümlerinden mezun olmak veya ilgili alanda deneyim',
          'Temel İngilizce bilgisi',
        ],
        fields: [
          'Gurme Mutfak',
          'Pastacılık',
          'Restoran Yönetimi',
          'Menü Planlama',
          'Gıda Güvenliği',
        ],
      },
    ],
    benefits: [
      'Maaşlı staj imkanı (6 ay ve üstü programlar için)',
      'J-1 vize desteği (DS-2019 ve DS7002 belgeleri)',
      'Konaklama ayarlama servisi',
      'Havaalanı transfer hizmeti',
      'Program süresince sağlık ve seyahat sigortası',
      '7/24 destek hattı',
      'Sosyal güvenlik kartı alımı konusunda yardım',
      'Program katılım sertifikası',
      'Ücretsiz Amerika sim kartı',
    ],
    process: [
      'Program hakkında bilgilendirme ve başvuru',
      'CV hazırlama ve iş seçeneklerinin sunulması',
      'İşe yerleştirme süreci',
      'J-1 vize belgelerinin hazırlanması (DS-2019, DS7002)',
      'Vize başvurusu ve danışmanlık',
      'Oryantasyon (Türkiye ve Amerika\'da)',
      'Program başlangıcı ve destek',
    ],
    documents: [
      'Pasaport (en az 6 ay geçerli)',
      'CV (İngilizce)',
      'Diploma veya öğrenci belgesi',
      'İş deneyimi belgeleri (Trainee için)',
      'İngilizce yeterlilik belgesi (opsiyonel)',
      'Sağlık raporu',
      'Finansal belgeler',
    ],
  },
  kanada: {
    name: 'Kanada',
    flag: '🇨🇦',
    generalInfo: 'Kanada\'da staj programları, uluslararası öğrenciler ve genç profesyonellere Kanada\'da iş deneyimi kazandırmayı amaçlar. Çeşitli sektörlerde staj imkanları sunulmaktadır.',
    programs: [
      {
        name: 'Genel Staj Programı',
        type: 'Internship',
        description: 'Kanada\'nın çeşitli sektörlerinde staj imkanı. Teknoloji, işletme, pazarlama, mühendislik gibi alanlarda deneyim kazanın.',
        duration: '6-12 ay',
        requirements: [
          'Üniversite öğrencisi veya mezunu',
          'İngilizce veya Fransızca yeterlilik',
          'İlgili alanda temel bilgi',
        ],
        fields: [
          'Teknoloji',
          'İşletme',
          'Pazarlama',
          'Mühendislik',
          'Tasarım',
        ],
      },
    ],
    benefits: [
      'Work Permit desteği',
      'Konaklama desteği',
      'Sigorta',
      '7/24 destek',
    ],
    process: [
      'Başvuru ve değerlendirme',
      'İş yerleştirme',
      'Work Permit başvurusu',
      'Program başlangıcı',
    ],
    documents: [
      'Pasaport',
      'CV',
      'Diploma/Öğrenci belgesi',
      'İngilizce/Fransızca yeterlilik',
    ],
  },
  ingiltere: {
    name: 'İngiltere',
    flag: '🇬🇧',
    generalInfo: 'İngiltere\'de staj programları, uluslararası öğrenciler ve genç profesyonellere İngiltere\'de iş deneyimi kazandırmayı amaçlar.',
    programs: [
      {
        name: 'Genel Staj Programı',
        type: 'Internship',
        description: 'İngiltere\'nin çeşitli sektörlerinde staj imkanı.',
        duration: '6-12 ay',
        requirements: [
          'Üniversite öğrencisi veya mezunu',
          'İngilizce yeterlilik',
        ],
        fields: [
          'İşletme',
          'Finans',
          'Pazarlama',
          'Teknoloji',
        ],
      },
    ],
    benefits: [
      'Tier 5 vize desteği',
      'Konaklama desteği',
      'Sigorta',
      '7/24 destek',
    ],
    process: [
      'Başvuru',
      'İş yerleştirme',
      'Vize başvurusu',
      'Program başlangıcı',
    ],
    documents: [
      'Pasaport',
      'CV',
      'Diploma',
      'İngilizce yeterlilik',
    ],
  },
};

export default function CountryStajPage({ params }: { params: Promise<{ country: string }> }) {
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
            <Link href="/staj" className="text-violet-600 hover:text-violet-800 font-semibold">
              Staj sayfasına dön
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
      <section className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.flag} {data.name}'da Staj</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}'DA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">STAJ PROGRAMLARI</span>
            </span>
          </h1>
        </div>
      </section>

      {/* General Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">ℹ️ Genel Bilgiler</h2>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            {data.generalInfo}
          </p>
        </div>

        {/* Programs */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Staj Programları</h2>
          </div>
          
          <div className="space-y-8">
            {data.programs.map((program, index) => (
              <div key={index} className="p-8 bg-purple-50 border-4 border-purple-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 mb-3 uppercase tracking-wider">{program.name}</h3>
                    <div className="inline-block px-4 py-2 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-4">
                      <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{program.type} Programı</span>
                    </div>
                    <p className="text-gray-700 font-medium text-lg leading-relaxed">{program.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">⏱️ Süre:</h4>
                    <p className="text-gray-800 font-bold">{program.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">🎯 Alanlar:</h4>
                    <ul className="space-y-2">
                      {program.fields.map((field, fieldIndex) => (
                        <li key={fieldIndex} className="flex items-center">
                          <span className="text-purple-600 font-black mr-2">•</span>
                          <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">{field}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-wider">📋 Gereksinimler:</h4>
                  <ul className="space-y-3">
                    {program.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                        <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ Program Avantajları</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="p-4 bg-indigo-50 border-4 border-indigo-200">
                <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🔄 Başvuru Süreci</h2>
          </div>
          
          <div className="space-y-4">
            {data.process.map((step, index) => (
              <div key={index} className="flex items-start p-6 bg-violet-50 border-4 border-violet-200">
                <div className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 border-4 border-violet-800 font-black text-lg">
                  {index + 1}
                </div>
                <p className="text-gray-800 font-bold text-lg flex-1 pt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📄 Gerekli Belgeler</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.documents.map((doc, index) => (
              <div key={index} className="p-4 bg-purple-50 border-4 border-purple-200">
                <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">{doc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Staj Başvurunuzu Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            {data.name}'da staj programları hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-4 bg-white text-violet-600 font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
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








