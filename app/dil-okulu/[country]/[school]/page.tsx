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
  description: string;
  image?: string;
  features: string[];
  courses: Array<{ name: string; description: string; hours: string }>;
  accommodation: Array<{ type: string; description: string }>;
  facilities: string[];
  location: string;
  established?: string;
  students?: string;
  accreditation?: string[];
}>> = {
  amerika: {
    'lsi-language-studies-international-boston': {
      name: 'LSI Language Studies International - Boston',
      country: 'Amerika',
      city: 'Boston',
      flag: '🇺🇸',
      description: 'LSI Boston, tarihi şehir merkezinde, üniversite ortamında dil öğrenme imkanı sunan prestijli bir dil okuludur. Modern tesisler, deneyimli öğretmen kadrosu ve çeşitli kurs seçenekleri ile öğrencilerine kapsamlı bir eğitim deneyimi sunar.',
      features: [
        'Merkezi konum - şehir merkezine yürüme mesafesi',
        'Modern teknoloji ile donatılmış sınıflar',
        'Deneyimli ve sertifikalı öğretmen kadrosu',
        'Küçük sınıflar - maksimum 15 öğrenci',
        'Ücretsiz WiFi ve öğrenci salonları',
        'Sosyal aktivite programları',
      ],
      courses: [
        { name: 'Genel İngilizce', description: 'Haftada 20 ders temel İngilizce eğitimi', hours: '20 ders/hafta' },
        { name: 'Yoğun İngilizce', description: 'Haftada 30 ders yoğun program', hours: '30 ders/hafta' },
        { name: 'IELTS Hazırlık', description: 'IELTS sınavına yönelik hazırlık kursu', hours: '20 ders/hafta' },
        { name: 'TOEFL Hazırlık', description: 'TOEFL sınavına yönelik hazırlık kursu', hours: '20 ders/hafta' },
        { name: 'Business English', description: 'İş İngilizcesi programı', hours: '20 ders/hafta' },
      ],
      accommodation: [
        { type: 'Aile Yanı', description: 'Yerel ailelerin yanında konaklama, kahvaltı ve akşam yemeği dahil' },
        { type: 'Öğrenci Yurdu', description: 'Diğer uluslararası öğrencilerle birlikte, ortak mutfak ve salonlar' },
        { type: 'Apartman', description: 'Tek veya çift kişilik stüdyo daireler, tam bağımsız' },
      ],
      facilities: [
        'Bilgisayar laboratuvarı',
        'Kütüphane',
        'Öğrenci salonu',
        'Kafeterya',
        'WiFi',
        'Öğrenci danışmanlık hizmeti',
      ],
      location: 'Boston şehir merkezi, üniversite bölgesi yakını',
      established: '1965',
      students: '200-300',
      accreditation: ['ACCET', 'CEA', 'English USA'],
    },
    'lsi-language-studies-international-new-york': {
      name: 'LSI Language Studies International - New York',
      country: 'Amerika',
      city: 'New York',
      flag: '🇺🇸',
      description: 'Manhattan merkezinde, Empire State Building yakınında konumlanan LSI New York, modern tesisler ve deneyimli öğretmen kadrosu ile İngilizce eğitimi sunar.',
      features: [
        'Manhattan merkezi konum',
        'Empire State Building yakını',
        'Modern sınıflar ve teknoloji',
        'Küçük sınıflar',
        'Geniş kurs seçenekleri',
      ],
      courses: [
        { name: 'Genel İngilizce', description: 'Haftada 20 ders', hours: '20 ders/hafta' },
        { name: 'Yoğun İngilizce', description: 'Haftada 30 ders', hours: '30 ders/hafta' },
        { name: 'IELTS Hazırlık', description: 'IELTS sınav hazırlığı', hours: '20 ders/hafta' },
      ],
      accommodation: [
        { type: 'Aile Yanı', description: 'Kahvaltı ve akşam yemeği dahil' },
        { type: 'Öğrenci Yurdu', description: 'Manhattan\'da öğrenci yurdu' },
      ],
      facilities: [
        'Modern sınıflar',
        'Öğrenci salonu',
        'WiFi',
      ],
      location: 'Manhattan, New York',
      accreditation: ['ACCET', 'CEA'],
    },
  },
  ingiltere: {
    'ec-english-london': {
      name: 'EC English - London',
      country: 'İngiltere',
      city: 'Londra',
      flag: '🇬🇧',
      description: 'Covent Garden merkezinde konumlanan EC English London, İngiliz kültürünü yakından tanıma fırsatı sunan modern bir dil okuludur.',
      features: [
        'Covent Garden merkezi',
        'Tarihi bölge yakını',
        'Modern tesisler',
        'Deneyimli öğretmenler',
      ],
      courses: [
        { name: 'Genel İngilizce', description: 'Haftada 20 ders', hours: '20 ders/hafta' },
        { name: 'Yoğun İngilizce', description: 'Haftada 30 ders', hours: '30 ders/hafta' },
      ],
      accommodation: [
        { type: 'Aile Yanı', description: 'Yerel aile yanında konaklama' },
      ],
      facilities: [
        'Modern sınıflar',
        'WiFi',
      ],
      location: 'Covent Garden, Londra',
      accreditation: ['British Council'],
    },
  },
};

export default function SchoolDetailPage({ params }: { params: Promise<{ country: string; school: string }> }) {
  const { country, school } = use(params);
  const data = schoolData[country.toLowerCase()]?.[school.toLowerCase()];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Dil Okulu Bulunamadı</h1>
          <Link href={`/dil-okulu/${country}`} className="text-purple-600 font-bold hover:underline">
            {country} dil okulları sayfasına dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b-4 border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600">
            <Link href="/dil-okulu" className="hover:text-purple-600 transition-colors">Dil Okulları</Link>
            <span>/</span>
            <Link href={`/dil-okulu/${country}`} className="hover:text-purple-600 transition-colors">{data.country}</Link>
            <span>/</span>
            <span className="text-gray-900">{data.name}</span>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 text-white py-8 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.flag} {data.city}, {data.country}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}
          </h1>
          <p className="text-base md:text-lg text-purple-100 font-medium max-w-3xl leading-relaxed">
            {data.description}
          </p>
        </div>
      </section>

      {/* Quick Info */}
      {data.established && (
        <section className="bg-white border-b-4 border-gray-900 py-5">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.established && (
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-600 mb-2">{data.established}</div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Kuruluş Yılı</div>
                </div>
              )}
              {data.students && (
                <div className="text-center">
                  <div className="text-3xl font-black text-violet-600 mb-2">{data.students}</div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Öğrenci Kapasitesi</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-3xl font-black text-pink-600 mb-2">{data.courses.length}</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Kurs Programı</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-600 mb-2">{data.accommodation.length}</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Konaklama Tipi</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6 mb-6">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-4">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">✨ Okul Özellikleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.map((feature, index) => (
              <div key={index} className="p-4 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-3 font-black text-xl">✓</span>
                    <span className="font-bold text-gray-900">{feature}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6 mb-6">
          <div className="inline-block px-5 py-2.5 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Kurs Programları</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.courses.map((course, index) => (
              <div key={index} className="p-5 bg-gray-50 border-4 border-gray-300 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{course.name}</h3>
                    <span className="px-3 py-1 bg-violet-600 text-white text-xs font-black uppercase">{course.hours}</span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6 mb-6">
          <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏠 Konaklama Seçenekleri</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.accommodation.map((acc, index) => (
              <div key={index} className="p-5 bg-gray-50 border-4 border-gray-300 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{acc.type}</h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{acc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Location */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Facilities */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6">
            <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏢 Tesisler</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {data.facilities.map((facility, index) => (
                <div key={index} className="p-4 bg-blue-50 border-2 border-blue-200">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2 font-black">•</span>
                    <span className="font-bold text-gray-900">{facility}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Accreditation */}
          <div className="space-y-6">
            <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6">
              <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-6">
                <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📍 Lokasyon</h2>
              </div>
              <p className="text-gray-700 font-bold text-lg leading-relaxed">{data.location}</p>
            </div>

            {data.accreditation && data.accreditation.length > 0 && (
              <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5 md:p-6">
                <div className="inline-block px-5 py-2.5 bg-yellow-600 text-white border-4 border-yellow-800 transform -skew-x-12 mb-6">
                  <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏆 Akreditasyonlar</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {data.accreditation.map((acc, index) => (
                    <span key={index} className="px-4 py-2 bg-yellow-50 border-2 border-yellow-300 text-gray-900 font-bold">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            {data.name}'da Eğitim Almaya Hazır mısınız?
          </h2>
          <p className="text-xl text-purple-100 mb-8 font-medium">
            Profesyonel danışmanlarımız size yardımcı olmak için burada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/basvuru"
              className="inline-block px-10 py-5 bg-white text-purple-600 font-black text-lg uppercase tracking-wider border-4 border-purple-800 hover:bg-purple-50 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
            >
              Hemen Başvur
            </Link>
            <Link
              href={`/dil-okulu/${country}`}
              className="inline-block px-10 py-5 bg-transparent text-white font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-white/10 transition-all duration-200"
            >
              Diğer Okulları Gör
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}







