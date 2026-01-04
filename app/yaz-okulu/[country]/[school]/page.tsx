'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use } from 'react';

// Mock data - Later this will come from API
const schoolData: Record<string, Record<string, {
  name: string;
  country: string;
  city: string;
  flag: string;
  description: string;
  ageRange: string;
  duration: string;
  features: string[];
  program: {
    lessons: string;
    activities: string[];
    excursions: string[];
  };
  accommodation: Array<{ type: string; description: string; meals: string }>;
  included: string[];
  location: string;
  dates?: string[];
}>> = {
  almanya: {
    'berlin-mitte': {
      name: 'Berlin Mitte Yaz Okulu',
      country: 'Almanya',
      city: 'Berlin',
      flag: '🇩🇪',
      description: 'Berlin şehir merkezinde, modern tesisler ve deneyimli eğitmenlerle Almanca öğrenin. Tarihi ve kültürel zenginliklerle dolu bir şehirde unutulmaz bir yaz deneyimi yaşayın.',
      ageRange: '12-17',
      duration: '2-4 hafta',
      features: [
        'Berlin şehir merkezi konumu',
        'Modern ve güvenli tesisler',
        'Deneyimli ve sertifikalı eğitmenler',
        'Küçük sınıflar - maksimum 15 öğrenci',
        '7/24 gözetim ve destek',
        'Çeşitli sosyal aktiviteler',
      ],
      program: {
        lessons: 'Haftada 20 ders Almanca eğitimi',
        activities: [
          'Şehir turları ve kültürel geziler',
          'Müze ziyaretleri',
          'Spor aktiviteleri',
          'Sanat ve el işi atölyeleri',
          'Akşam eğlence programları',
          'Alman kültürü tanıtım etkinlikleri',
        ],
        excursions: [
          'Brandenburg Kapısı ve Reichstag ziyareti',
          'Berlin Duvarı ve Checkpoint Charlie',
          'Museum Island gezisi',
          'Potsdam gezisi',
          'Hafta sonu şehir dışı geziler',
        ],
      },
      accommodation: [
        { type: 'Öğrenci Yurdu', description: 'Modern öğrenci yurdu, tek veya çift kişilik odalar', meals: 'Günde 3 öğün yemek dahil' },
        { type: 'Aile Yanı', description: 'Yerel Alman ailelerin yanında konaklama', meals: 'Kahvaltı ve akşam yemeği dahil' },
      ],
      included: [
        'Haftada 20 ders Almanca eğitimi',
        'Ders kitapları ve tüm eğitim materyalleri',
        'Konaklama (seçtiğiniz tipe göre)',
        'Günde 3 öğün yemek',
        'Havaalanı transferleri',
        'Program kapsamında tüm geziler ve aktiviteler',
        'Sağlık ve seyahat sigortası',
        'Vize danışmanlığı',
        'Kurs katılım sertifikası',
        '7/24 gözetim ve destek hizmeti',
      ],
      location: 'Berlin Mitte, şehir merkezi',
      dates: ['Temmuz - Ağustos 2026'],
    },
  },
  ingiltere: {
    'kings-london-central': {
      name: 'Kings London Central',
      country: 'İngiltere',
      city: 'Londra',
      flag: '🇬🇧',
      description: 'London South Bank University kampüsünde, merkezi konum ve modern tesisler. İngiliz kültürünü yakından tanıma fırsatı sunan prestijli bir yaz okulu programı.',
      ageRange: '13-17',
      duration: '2-4 hafta',
      features: [
        'University kampüsü konumu',
        'Merkezi Londra lokasyonu',
        'Modern sınıflar ve tesisler',
        'Deneyimli öğretmen kadrosu',
        'Güvenli kampüs ortamı',
        'Kültürel aktivite programları',
      ],
      program: {
        lessons: 'Haftada 20 ders İngilizce eğitimi',
        activities: [
          'Londra şehir turları',
          'Müze ve galeri ziyaretleri',
          'Spor aktiviteleri',
          'Tiyatro ve kültürel etkinlikler',
          'Akşam eğlence programları',
        ],
        excursions: [
          'Big Ben ve Westminster Abbey',
          'Tower Bridge ve Tower of London',
          'British Museum',
          'Oxford veya Cambridge gezisi',
          'Brighton sahil gezisi',
        ],
      },
      accommodation: [
        { type: 'Kampüs Yurdu', description: 'Tek kişilik, banyolu odada konaklama', meals: 'Günde 3 öğün yemek dahil' },
      ],
      included: [
        'Haftada 20 ders',
        'Ders kitapları ve materyaller',
        'Tek kişilik banyolu oda',
        'Günde 3 öğün yemek',
        'THY gidiş-dönüş uçak bileti',
        'Havaalanı transferleri',
        'Tüm geziler ve aktiviteler',
        'Sağlık ve seyahat sigortası',
        'Vize ücreti ve danışmanlık',
        'Kurs katılım sertifikası',
      ],
      location: 'London South Bank University Kampüsü',
      dates: ['01 Temmuz - 15 Temmuz 2026', '29 Temmuz - 12 Ağustos 2026'],
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Yaz Okulu Bulunamadı</h1>
          <Link href={`/yaz-okulu/${country}`} className="text-orange-600 font-bold hover:underline">
            {country} yaz okulları sayfasına dön
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
      <section className="bg-white border-b-4 border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600">
            <Link href="/yaz-okulu" className="hover:text-orange-600 transition-colors">Yaz Okulları</Link>
            <span>/</span>
            <Link href={`/yaz-okulu/${country}`} className="hover:text-orange-600 transition-colors">{data.country}</Link>
            <span>/</span>
            <span className="text-gray-900">{data.name}</span>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-16 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{data.flag} {data.city}, {data.country}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}
          </h1>
          <p className="text-lg md:text-xl text-orange-100 font-medium max-w-3xl leading-relaxed mb-6">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <div className="text-sm font-bold text-orange-100">Yaş Aralığı</div>
              <div className="text-lg font-black">{data.ageRange}</div>
            </div>
            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <div className="text-sm font-bold text-orange-100">Program Süresi</div>
              <div className="text-lg font-black">{data.duration}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      {data.dates && (
        <section className="bg-white border-b-4 border-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-2xl font-black text-orange-600 mb-2">Program Tarihleri</div>
              <div className="space-y-2">
                {data.dates.map((date, index) => (
                  <div key={index} className="text-lg font-bold text-gray-700">{date}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-orange-600 text-white border-4 border-orange-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">✨ Program Özellikleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.map((feature, index) => (
              <div key={index} className="p-4 bg-orange-50 border-4 border-orange-200 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <div className="flex items-start">
                    <span className="text-orange-600 mr-3 font-black text-xl">✓</span>
                    <span className="font-bold text-gray-900">{feature}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lessons & Activities */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Eğitim Programı</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase">{data.program.lessons}</h3>
              <p className="text-gray-700 font-medium">Modern metodlarla, interaktif ve eğlenceli dersler.</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase">Günlük Aktiviteler</h3>
              <ul className="space-y-2">
                {data.program.activities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2 font-black">•</span>
                    <span className="font-bold text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Excursions */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🗺️ Geziler</h2>
            </div>
            
            <ul className="space-y-3">
              {data.program.excursions.map((excursion, index) => (
                <li key={index} className="p-4 bg-pink-50 border-2 border-pink-200">
                  <div className="flex items-start">
                    <span className="text-pink-600 mr-3 font-black text-lg">📍</span>
                    <span className="font-bold text-gray-900">{excursion}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-yellow-600 text-white border-4 border-yellow-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏠 Konaklama Seçenekleri</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.accommodation.map((acc, index) => (
              <div key={index} className="p-6 bg-gray-50 border-4 border-gray-300 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{acc.type}</h3>
                  <p className="text-gray-700 font-medium leading-relaxed mb-3">{acc.description}</p>
                  <div className="px-3 py-2 bg-yellow-100 border-2 border-yellow-300 inline-block">
                    <span className="text-sm font-black text-gray-900">{acc.meals}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📦 Dahil Olan Hizmetler</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.included.map((item, index) => (
              <div key={index} className="p-4 bg-green-50 border-2 border-green-200">
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 font-black text-xl">✓</span>
                  <span className="font-bold text-gray-900">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📍 Lokasyon</h2>
          </div>
          <p className="text-gray-700 font-bold text-lg leading-relaxed">{data.location}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            {data.name}'da Yaz Okuluna Katılmaya Hazır mısınız?
          </h2>
          <p className="text-xl text-orange-100 mb-8 font-medium">
            Profesyonel danışmanlarımız size yardımcı olmak için burada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/basvuru"
              className="inline-block px-10 py-5 bg-white text-orange-600 font-black text-lg uppercase tracking-wider border-4 border-orange-800 hover:bg-orange-50 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
            >
              Hemen Başvur
            </Link>
            <Link
              href={`/yaz-okulu/${country}`}
              className="inline-block px-10 py-5 bg-transparent text-white font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-white/10 transition-all duration-200"
            >
              Diğer Programları Gör
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







