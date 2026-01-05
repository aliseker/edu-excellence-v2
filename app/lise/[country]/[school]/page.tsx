'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use } from 'react';
import Image from 'next/image';

// Mock data - Later this will come from API
const schoolData: Record<string, Record<string, {
  name: string;
  country: string;
  city: string;
  flag: string;
  type: string;
  description: string;
  intro?: string;
  image?: string;
  features: string[];
  programs: Array<{ name: string; description: string }>;
  accommodation: Array<{ type: string; description: string }>;
  facilities: string[];
  location: string;
  established?: string;
  students?: string;
  accreditation?: string[];
  requirements?: string[];
}>> = {
  amerika: {
    'beverly-high-school': {
      name: 'Beverly High School',
      country: 'Amerika',
      city: 'Los Angeles',
      flag: '🇺🇸',
      type: 'Devlet',
      description: 'Los Angeles\'ın prestijli Beverly Hills bölgesinde bulunan, akademik başarılarıyla tanınan devlet lisesi.',
      intro: 'Beverly High School, Los Angeles\'ın en prestijli bölgelerinden biri olan Beverly Hills\'de konumlanmış, akademik mükemmellik ve kültürel çeşitlilik konusunda öne çıkan bir devlet lisesidir. Okul, öğrencilerine üniversite hazırlık programları, AP (Advanced Placement) dersleri ve geniş bir müfredat seçenekleri sunmaktadır.',
      features: [
        'Prestijli Beverly Hills bölgesinde konum',
        'Güçlü üniversite hazırlık programları',
        'Geniş AP (Advanced Placement) ders seçenekleri',
        'Çeşitli spor ve sanat programları',
        'Modern tesisler ve teknoloji odaklı eğitim',
        'Deneyimli öğretmen kadrosu',
      ],
      programs: [
        { name: '9-12. Sınıf Programı', description: 'Tam lise eğitimi, 4 yıllık diploma programı' },
        { name: '1 Yıllık Değişim Programı', description: 'Kısa süreli değişim öğrencisi olarak eğitim' },
        { name: 'AP Programları', description: 'Üniversite seviyesinde dersler, kredi transferi imkanı' },
        { name: 'Spor Programları', description: 'Atletizm, basketbol, futbol, tenis ve daha fazlası' },
        { name: 'Sanat Programları', description: 'Müzik, tiyatro, görsel sanatlar ve performans sanatları' },
      ],
      accommodation: [
        { type: 'Aile Yanı Konaklama', description: 'Yerel ailelerin yanında konaklama, kahvaltı ve akşam yemeği dahil' },
        { type: 'Öğrenci Yurdu', description: 'Okul tarafından düzenlenen yurt konaklama (sınırlı sayıda)' },
      ],
      facilities: [
        'Modern sınıflar ve laboratuvarlar',
        'Spor salonu ve atletizm sahaları',
        'Kütüphane ve öğrenme merkezi',
        'Bilgisayar laboratuvarları',
        'Sanat stüdyoları ve müzik odaları',
        'Kafeterya ve öğrenci salonları',
      ],
      location: 'Beverly Hills, Los Angeles, California',
      established: '1907',
      students: '2000+',
      accreditation: ['WASC', 'California Department of Education'],
      requirements: [
        '14-18 yaş aralığı',
        'İngilizce yeterlilik (TOEFL veya IELTS)',
        'Ortaöğretim transkripti',
        'Sağlık raporu',
        'Vize başvurusu',
      ],
    },
    'harvard-westlake-school': {
      name: 'Harvard-Westlake School',
      country: 'Amerika',
      city: 'Los Angeles',
      flag: '🇺🇸',
      type: 'Özel',
      description: 'Üst düzey akademik programlar ve üniversite hazırlık odaklı eğitim sunan özel lise.',
      intro: 'Harvard-Westlake School, Los Angeles\'ın en prestijli özel liselerinden biridir. Okul, akademik mükemmellik, üniversite yerleştirme başarısı ve kapsamlı eğitim programları ile tanınmaktadır.',
      features: [
        'Üst düzey akademik programlar',
        'Yüksek üniversite yerleştirme oranı',
        'Geniş AP ve IB ders seçenekleri',
        'Spor ve sanat programları',
        'Küçük sınıf mevcutları',
        'Deneyimli öğretmen kadrosu',
      ],
      programs: [
        { name: '9-12. Sınıf Programı', description: 'Tam lise eğitimi, 4 yıllık diploma programı' },
        { name: 'AP Programları', description: '20+ AP ders seçeneği' },
        { name: 'IB Programı', description: 'International Baccalaureate programı' },
      ],
      accommodation: [
        { type: 'Yatılı Okul', description: 'Kampüs içi yurt konaklama' },
      ],
      facilities: [
        'Modern akademik tesisler',
        'Spor kompleksleri',
        'Sanat merkezleri',
        'Kütüphane',
      ],
      location: 'Los Angeles, California',
      established: '1900',
      accreditation: ['WASC'],
    },
    'stuyvesant-high-school': {
      name: 'Stuyvesant High School',
      country: 'Amerika',
      city: 'New York',
      flag: '🇺🇸',
      type: 'Devlet',
      description: 'New York\'un en prestijli devlet liselerinden biri, bilim ve teknoloji alanında uzmanlaşmış.',
      intro: 'Stuyvesant High School, New York\'un en seçici ve prestijli devlet liselerinden biridir. Okul, bilim, teknoloji, mühendislik ve matematik (STEM) alanlarında uzmanlaşmıştır.',
      features: [
        'STEM odaklı eğitim',
        'Prestijli akademik programlar',
        'Güçlü üniversite yerleştirme',
        'Geniş AP ders seçenekleri',
        'Modern laboratuvarlar',
      ],
      programs: [
        { name: '9-12. Sınıf Programı', description: 'Tam lise eğitimi' },
        { name: 'AP Programları', description: 'STEM alanlarında geniş seçenekler' },
      ],
      accommodation: [
        { type: 'Aile Yanı', description: 'Yerel ailelerin yanında konaklama' },
      ],
      facilities: [
        'Modern laboratuvarlar',
        'Bilgisayar laboratuvarları',
        'Kütüphane',
      ],
      location: 'Manhattan, New York',
      accreditation: ['New York State Education Department'],
    },
  },
  kanada: {
    'upper-canada-college': {
      name: 'Upper Canada College',
      country: 'Kanada',
      city: 'Toronto',
      flag: '🇨🇦',
      type: 'Özel',
      description: 'Kanada\'nın önde gelen özel erkek liselerinden biri, IB programı sunuyor.',
      intro: 'Upper Canada College, Kanada\'nın en prestijli özel liselerinden biridir. Okul, IB programı ve üst düzey akademik eğitim sunmaktadır.',
      features: [
        'IB programı',
        'Küçük sınıflar',
        'Yatılı okul seçeneği',
        'Güçlü spor programları',
      ],
      programs: [
        { name: 'IB Programı', description: 'International Baccalaureate' },
        { name: '9-12. Sınıf', description: 'Tam lise eğitimi' },
      ],
      accommodation: [
        { type: 'Yatılı Okul', description: 'Kampüs içi yurt' },
      ],
      facilities: [
        'Modern tesisler',
        'Spor kompleksleri',
        'Kütüphane',
      ],
      location: 'Toronto, Ontario',
      accreditation: ['CAIS', 'IBO'],
    },
  },
  ingiltere: {
    'eton-college': {
      name: 'Eton College',
      country: 'İngiltere',
      city: 'Londra',
      flag: '🇬🇧',
      type: 'Özel',
      description: 'İngiltere\'nin en prestijli özel erkek liselerinden biri, köklü bir eğitim geleneği.',
      intro: 'Eton College, İngiltere\'nin en prestijli özel liselerinden biridir. 600 yılı aşkın bir geçmişe sahip olan okul, dünya çapında tanınmaktadır.',
      features: [
        'Köklü eğitim geleneği',
        'A-Level programları',
        'Yatılı okul',
        'Prestijli mezunlar',
      ],
      programs: [
        { name: 'A-Level', description: 'İngiliz lise programı' },
        { name: 'GCSE', description: 'Ortaöğretim sertifikası' },
      ],
      accommodation: [
        { type: 'Yatılı Okul', description: 'Kampüs içi yurt' },
      ],
      facilities: [
        'Tarihi binalar',
        'Modern tesisler',
        'Spor alanları',
      ],
      location: 'Windsor, Berkshire',
      established: '1440',
      accreditation: ['Independent Schools Inspectorate'],
    },
  },
};

export default function SchoolDetailPage({ params }: { params: Promise<{ country: string; school: string }> }) {
  const { country, school } = use(params);
  const countryKey = country.toLowerCase();
  const schoolKey = school.toLowerCase();
  const data = schoolData[countryKey]?.[schoolKey];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Okul Bulunamadı</h1>
            <Link href={`/lise/${countryKey}`} className="text-green-600 hover:text-green-800 font-semibold">
              Ülke sayfasına dön
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.flag} {data.country} • {data.city}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative text-2xl md:text-3xl lg:text-4xl">{data.type.toUpperCase()} LİSE</span>
            </span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      {data.intro && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-4 border-green-200 shadow-[8px_8px_0_0_rgba(34,197,94,0.2)] p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-6">
                <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎓 Neden Bu Lise?</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium">
                  {data.intro}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ Okul Özellikleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature, index) => (
              <div key={index} className="p-6 bg-green-50 border-4 border-green-200 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">✓</span>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">{feature}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-emerald-600 text-white border-4 border-emerald-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Program Seçenekleri</h2>
          </div>
          
          <div className="space-y-6">
            {data.programs.map((program, index) => (
              <div key={index} className="p-6 bg-emerald-50 border-4 border-emerald-200">
                <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-wider">{program.name}</h3>
                <p className="text-gray-700 font-medium">{program.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accommodation */}
        {data.accommodation && data.accommodation.length > 0 && (
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
            <div className="inline-block px-5 py-2.5 bg-teal-600 text-white border-4 border-teal-800 transform -skew-x-12 mb-8">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏠 Konaklama Seçenekleri</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.accommodation.map((acc, index) => (
                <div key={index} className="p-6 bg-teal-50 border-4 border-teal-200">
                  <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">{acc.type}</h3>
                  <p className="text-gray-700 font-medium">{acc.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Facilities */}
        {data.facilities && data.facilities.length > 0 && (
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
            <div className="inline-block px-5 py-2.5 bg-cyan-600 text-white border-4 border-cyan-800 transform -skew-x-12 mb-8">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏫 Okul Olanakları</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.facilities.map((facility, index) => (
                <div key={index} className="p-4 bg-cyan-50 border-4 border-cyan-200">
                  <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">{facility}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requirements */}
        {data.requirements && data.requirements.length > 0 && (
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
            <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-8">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📋 Başvuru Gereksinimleri</h2>
            </div>
            
            <div className="space-y-4">
              {data.requirements.map((req, index) => (
                <div key={index} className="flex items-start p-4 bg-green-50 border-4 border-green-200">
                  <span className="text-green-600 font-black text-xl mr-4">{index + 1}.</span>
                  <p className="text-gray-800 font-bold text-sm uppercase tracking-wide flex-1">{req}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {data.location && (
            <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wider">Konum</h3>
              <p className="text-gray-700 font-medium">{data.location}</p>
            </div>
          )}
          {data.established && (
            <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wider">Kuruluş</h3>
              <p className="text-gray-700 font-medium">{data.established}</p>
            </div>
          )}
          {data.students && (
            <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wider">Öğrenci Sayısı</h3>
              <p className="text-gray-700 font-medium">{data.students}</p>
            </div>
          )}
        </div>

        {/* Accreditation */}
        {data.accreditation && data.accreditation.length > 0 && (
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
            <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">✅ Akreditasyon</h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {data.accreditation.map((acc, index) => (
                <div key={index} className="px-6 py-3 bg-purple-100 border-4 border-purple-300">
                  <p className="text-purple-900 font-black text-sm uppercase tracking-wider">{acc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Başvuru Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            {data.name} hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
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








