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
  intro?: string;
  videoUrl?: string; // YouTube video URL
  established?: string;
  students?: string;
  ranking?: string;
  features: string[];
  programs: Array<{ name: string; type: string; duration: string; description: string; concentrations?: string[] }>;
  requirements: {
    language: string[];
    academic: string[];
    documents: string[];
  };
  location: string;
  campus?: string[];
  careerServices?: string[];
  accreditation?: string[];
}>> = {
  amerika: {
    'berkeley-college': {
      name: 'Berkeley College',
      country: 'Amerika',
      city: 'New York',
      flag: '🇺🇸',
      description: 'Pratik odaklı eğitim, güçlü iş dünyası bağlantıları ve kariyer desteği ile öne çıkan prestijli bir yüksek öğretim kurumudur.',
      intro: 'Berkeley College, 1931\'den beri öğrencilerine pratik odaklı eğitim sunan, New York City ve New Jersey\'de kampüsleri bulunan prestijli bir yüksek öğretim kurumudur. Özellikle işletme, moda, iç mimarlık ve sağlık yönetimi alanlarında güçlü programları ile tanınır. Geniş işveren bağlantıları ve kariyer hizmetleri sayesinde mezunlarının %90\'ından fazlası 6 ay içinde iş bulur. Esnek eğitim seçenekleri (kampüs veya online) ile çalışan profesyonellere de uygun programlar sunar.',
      established: '1931',
      students: '4,000+',
      ranking: 'Regional University',
      features: [
        'Pratik odaklı eğitim yaklaşımı',
        'Güçlü işveren bağlantıları',
        'Kapsamlı kariyer hizmetleri',
        'Esnek program seçenekleri (kampüs/online)',
        'Küçük sınıf mevcutları',
        'Deneyimli öğretim kadrosu',
      ],
      programs: [
        {
          name: 'MBA - Master of Business Administration',
          type: 'MBA',
          duration: '24 ay (hızlandırılmış)',
          description: 'Pratik odaklı MBA programı, çeşitli konsantrasyon alanları ile kariyer hedeflerinize uygun uzmanlık kazanın.',
          concentrations: [
            'Muhasebe',
            'Finansal Yönetim',
            'Sağlık Yönetimi',
            'İnsan Kaynakları Yönetimi',
            'Hukuk Uygulama Yöneticiliği',
            'Pazarlama Yönetimi',
            'Tedarik Zinciri Yönetimi',
          ]
        },
        {
          name: 'Master in Management',
          type: 'Master',
          duration: '18-24 ay',
          description: 'Yönetim alanında derinlemesine bilgi ve pratik beceriler kazandıran kapsamlı master programı.',
        },
      ],
      requirements: {
        language: ['TOEFL: 80+', 'IELTS: 6.0+'],
        academic: ['Lisans diploması', 'Minimum GPA: 2.5', 'GMAT veya GRE (isteğe bağlı)'],
        documents: ['Akademik transkriptler', 'Referans mektupları', 'Niyet mektubu', 'Özgeçmiş'],
      },
      location: 'New York City, New York & Woodland Park, New Jersey',
      campus: ['New York City Campus', 'Woodland Park Campus', 'Online'],
      careerServices: [
        'Kariyer danışmanlığı',
        'İş arama desteği',
        'Staj yerleştirme hizmetleri',
        'İşveren etkinlikleri',
        'Mezun ağı',
        'Özgeçmiş ve mülakat hazırlık desteği',
      ],
      accreditation: ['Middle States Commission on Higher Education'],
    },
    'nyu': {
      name: 'New York University (NYU)',
      country: 'Amerika',
      city: 'New York',
      flag: '🇺🇸',
      description: 'Manhattan merkezinde, dünya çapında tanınan prestijli üniversite. Güçlü MBA programları ve mezun ağı ile öne çıkar.',
      intro: 'New York University (NYU), dünyanın en prestijli üniversitelerinden biri olarak, özellikle işletme, sanat ve teknoloji alanlarında güçlü programlar sunar. Stern School of Business, dünyanın en iyi MBA programlarından birine sahiptir. Manhattan\'ın kalbinde yer alan kampüs, öğrencilere hem akademik hem de profesyonel gelişim için eşsiz fırsatlar sunar. Güçlü mezun ağı ve iş dünyası bağlantıları ile NYU mezunları, global iş piyasasında aranan profesyoneller olarak kariyerlerine başlar.',
      established: '1831',
      students: '50,000+',
      ranking: 'US Top 30, Global Top 50',
      features: [
        'Dünya çapında tanınan MBA programı',
        'Güçlü mezun ağı',
        'Manhattan merkezi konum',
        'Prestijli öğretim kadrosu',
        'Çeşitli konsantrasyon alanları',
        'Global iş fırsatları',
      ],
      programs: [
        {
          name: 'Full-Time MBA',
          type: 'MBA',
          duration: '2 yıl',
          description: 'Kapsamlı full-time MBA programı, iş dünyasında liderlik pozisyonları için hazırlar.',
        },
        {
          name: 'Part-Time MBA',
          type: 'MBA',
          duration: '2-4 yıl',
          description: 'Çalışan profesyoneller için esnek part-time MBA programı.',
        },
        {
          name: 'Executive MBA',
          type: 'MBA',
          duration: '22 ay',
          description: 'Deneyimli yöneticiler için tasarlanmış executive MBA programı.',
        },
      ],
      requirements: {
        language: ['TOEFL: 100+', 'IELTS: 7.0+'],
        academic: ['Lisans diploması', 'GMAT veya GRE', 'Minimum iş tecrübesi (MBA için)'],
        documents: ['Akademik transkriptler', 'Referans mektupları', 'Niyet mektubu', 'Özgeçmiş', 'İş tecrübesi belgeleri'],
      },
      location: 'Manhattan, New York City',
      campus: ['Manhattan Campus'],
      accreditation: ['AACSB', 'Middle States Commission'],
    },
  },
  ingiltere: {
    'london-business-school': {
      name: 'London Business School',
      country: 'İngiltere',
      city: 'Londra',
      flag: '🇬🇧',
      description: 'Avrupa\'nın en prestijli işletme okullarından biri. Dünya çapında tanınan MBA programları ve güçlü kariyer desteği.',
      intro: 'London Business School, Avrupa\'nın en prestijli işletme okullarından biri olarak, dünya çapında tanınan MBA programları sunar. Financial Times tarafından düzenli olarak dünyanın en iyi MBA programları arasında gösterilir. Regent\'s Park yakınında yer alan kampüs, öğrencilere hem akademik hem de profesyonel gelişim için eşsiz fırsatlar sunar. Güçlü mezun ağı ve iş dünyası bağlantıları ile mezunlar, global şirketlerde liderlik pozisyonlarında çalışırlar.',
      established: '1964',
      students: '2,000+',
      ranking: 'Global MBA Top 10',
      features: [
        'Dünya çapında prestijli MBA',
        'Güçlü mezun ağı',
        'Londra merkezi konum',
        'Global kariyer fırsatları',
        'Çeşitli konsantrasyonlar',
        'Yüksek mezun maaşları',
      ],
      programs: [
        {
          name: 'Full-Time MBA',
          type: 'MBA',
          duration: '15-21 ay',
          description: 'Kapsamlı full-time MBA programı, global liderler yetiştirir.',
        },
        {
          name: 'Executive MBA',
          type: 'MBA',
          duration: '20 ay',
          description: 'Deneyimli profesyoneller için tasarlanmış executive MBA.',
        },
        {
          name: 'Masters in Finance',
          type: 'Master',
          duration: '10-16 ay',
          description: 'Finans alanında uzmanlaşmak için master programı.',
        },
      ],
      requirements: {
        language: ['TOEFL: 110+', 'IELTS: 7.5+'],
        academic: ['Lisans diploması', 'GMAT: 600+', 'Minimum 2-3 yıl iş tecrübesi'],
        documents: ['Akademik transkriptler', 'Referans mektupları', 'Niyet mektubu', 'Özgeçmiş'],
      },
      location: 'Regent\'s Park, Londra',
      campus: ['London Campus'],
      accreditation: ['AACSB', 'EQUIS', 'AMBA'],
    },
  },
};

export default function MasterMBADetailPage({ params }: { params: Promise<{ country: string; school: string }> }) {
  const resolvedParams = use(params);
  const country = resolvedParams.country;
  const school = resolvedParams.school;
  const countryKey = country.toLowerCase();
  const schoolKey = school.toLowerCase();
  const data = schoolData[countryKey]?.[schoolKey];

  // School data for sidebar
  const masterMBACountries = {
    amerika: [
      { title: 'Berkeley College', href: '/master-mba/amerika/berkeley-college', slug: 'berkeley-college' },
      { title: 'New York University (NYU)', href: '/master-mba/amerika/nyu', slug: 'nyu' },
    ],
    ingiltere: [
      { title: 'London Business School', href: '/master-mba/ingiltere/london-business-school', slug: 'london-business-school' },
      { title: 'Imperial College Business School', href: '/master-mba/ingiltere/imperial-college-business', slug: 'imperial-college-business' },
      { title: 'Cambridge Judge Business School', href: '/master-mba/ingiltere/cambridge-judge-business', slug: 'cambridge-judge-business' },
    ],
    italya: [
      { title: 'Bocconi University', href: '/master-mba/italya/bocconi-university', slug: 'bocconi-university' },
      { title: 'Sapienza University of Rome', href: '/master-mba/italya/sapienza-university-rome', slug: 'sapienza-university-rome' },
    ],
    almanya: [
      { title: 'Humboldt University of Berlin', href: '/master-mba/almanya/humboldt-university-berlin', slug: 'humboldt-university-berlin' },
      { title: 'Technical University of Munich', href: '/master-mba/almanya/technical-university-munich', slug: 'technical-university-munich' },
    ],
  };

  const currentCountrySchools = masterMBACountries[countryKey as keyof typeof masterMBACountries] || [];
  const otherSchools = currentCountrySchools.filter(s => s.slug !== schoolKey);
  const otherCountries = Object.entries(masterMBACountries).filter(([key]) => key !== countryKey);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Okul Bulunamadı</h1>
          <Link href={`/master-mba/${country}`} className="text-blue-600 font-bold hover:underline">
            {country} master/MBA sayfasına dön
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
            <Link href={`/master-mba/${country}`} className="hover:text-blue-600 transition-colors">{data.country}</Link>
            <span>/</span>
            <span className="text-gray-900">{data.name}</span>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 text-white py-6 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-3">
            <span className="transform skew-x-12 text-xs font-black uppercase tracking-wider">{data.flag} {data.city}, {data.country}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}
          </h1>
          <p className="text-base md:text-lg text-purple-100 font-medium max-w-3xl leading-relaxed mb-4">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {data.established && (
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <div className="text-sm font-bold text-purple-100">Kuruluş</div>
                <div className="text-lg font-black">{data.established}</div>
              </div>
            )}
            {data.students && (
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <div className="text-sm font-bold text-purple-100">Öğrenci</div>
                <div className="text-lg font-black">{data.students}</div>
              </div>
            )}
            {data.ranking && (
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <div className="text-sm font-bold text-purple-100">Sıralama</div>
                <div className="text-lg font-black">{data.ranking}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Video Section - Hero'dan hemen sonra */}
            {data.videoUrl && (
              <section className="py-6">
                <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 md:p-8">
                  <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-6">
                    <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎥 Tanıtım Videosu</h2>
                  </div>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full border-4 border-gray-900"
                      src={data.videoUrl.replace('watch?v=', 'embed/')}
                      title={`${data.name} Tanıtım Videosu`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </section>
            )}

            {/* Intro Section */}
            {data.intro && (
              <section className="py-6">
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-4 border-purple-200 shadow-[8px_8px_0_0_rgba(147,51,234,0.2)] p-8 md:p-12">
                  <div className="max-w-4xl mx-auto">
                    <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
                      <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎓 Neden Bu Okul?</h2>
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
            <section className="py-6">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-8">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
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

            {/* Programs */}
            <section className="py-6">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-8">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Programlar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.programs.map((program, index) => (
              <div key={index} className="p-6 bg-gray-50 border-4 border-gray-300 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{program.name}</h3>
                    <span className="px-3 py-1 bg-indigo-100 border-2 border-indigo-300 text-sm font-black text-gray-900">
                      {program.type}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed mb-3">{program.description}</p>
                  <div className="px-3 py-1 bg-indigo-100 border-2 border-indigo-300 inline-block mb-3">
                    <span className="text-sm font-black text-gray-900">Süre: {program.duration}</span>
                  </div>
                  {program.concentrations && program.concentrations.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-black text-gray-900 mb-2 text-sm uppercase">Konsantrasyon Alanları:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.concentrations.map((conc, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-100 border-2 border-purple-300 text-xs font-bold text-gray-900">
                            {conc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Requirements */}
            <section className="py-6">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-8">
          <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📋 Başvuru Şartları</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-black text-gray-900 mb-4 text-lg uppercase border-b-4 border-red-200 pb-2">Dil Yeterliliği</h3>
              <ul className="space-y-2">
                {data.requirements.language.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2 font-black">•</span>
                    <span className="font-medium text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-black text-gray-900 mb-4 text-lg uppercase border-b-4 border-red-200 pb-2">Akademik Şartlar</h3>
              <ul className="space-y-2">
                {data.requirements.academic.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2 font-black">•</span>
                    <span className="font-medium text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-black text-gray-900 mb-4 text-lg uppercase border-b-4 border-red-200 pb-2">Gerekli Belgeler</h3>
              <ul className="space-y-2">
                {data.requirements.documents.map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2 font-black">•</span>
                    <span className="font-medium text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

            {/* Career Services */}
            {data.careerServices && data.careerServices.length > 0 && (
              <section className="py-6">
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-8">
            <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">💼 Kariyer Hizmetleri</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.careerServices.map((service, index) => (
                <div key={index} className="p-4 bg-green-50 border-4 border-green-200 transform hover:-skew-x-1 transition-all duration-200">
                  <div className="transform skew-x-1">
                    <div className="flex items-start">
                      <span className="text-green-600 mr-3 font-black text-xl">✓</span>
                      <span className="font-bold text-gray-900">{service}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

            {/* Location & Campus */}
            <section className="py-6">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-8">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📍 Konum & Kampüs</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-black text-gray-900 mb-2 text-lg">Konum</h3>
              <p className="text-gray-700 font-medium">{data.location}</p>
            </div>
            {data.campus && data.campus.length > 0 && (
              <div>
                <h3 className="font-black text-gray-900 mb-2 text-lg">Kampüsler</h3>
                <div className="flex flex-wrap gap-2">
                  {data.campus.map((campus, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-100 border-2 border-blue-300 font-bold text-gray-900">
                      {campus}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

            {/* Accreditation */}
            {data.accreditation && data.accreditation.length > 0 && (
              <section className="py-6">
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-8">
            <div className="inline-block px-5 py-2.5 bg-yellow-600 text-white border-4 border-yellow-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏆 Akreditasyon</h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {data.accreditation.map((acc, index) => (
                <div key={index} className="px-6 py-3 bg-yellow-100 border-4 border-yellow-300 font-black text-gray-900">
                  {acc}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

            {/* CTA */}
            <section className="py-6">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Hemen Başvuru Yapın</h2>
          <p className="text-xl text-purple-100 mb-8 font-medium max-w-2xl mx-auto">
            {data.name}'da master veya MBA eğitimi için hemen başvuru yapın. Tüm işlemleriniz ücretsiz!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/basvuru"
              className="inline-block px-10 py-5 bg-white text-purple-600 font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-purple-50 transition-all duration-200 transform hover:-skew-x-1"
            >
              <span className="transform skew-x-1 block">BAŞVURU YAP</span>
            </Link>
            <Link
              href={`/master-mba/${country}`}
              className="inline-block px-10 py-5 bg-transparent text-white font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-white/10 transition-all duration-200"
            >
              Diğer Okulları Gör
            </Link>
          </div>
            </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Same Country Schools */}
              {otherSchools.length > 0 && (
                <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6">
                  <div className="inline-block px-4 py-2 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-4">
                    <h3 className="transform skew-x-12 text-sm font-black uppercase tracking-wider">
                      {data.country}'deki Diğer Okullar
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {otherSchools.map((school, index) => (
                      <li key={index}>
                        <Link
                          href={school.href}
                          className="block p-3 bg-purple-50 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-100 transition-all duration-200 transform hover:-translate-x-1"
                        >
                          <span className="font-bold text-sm text-gray-900">{school.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/master-mba/${country}`}
                    className="block mt-4 text-center px-4 py-2 bg-purple-600 text-white font-black text-sm uppercase border-2 border-purple-800 hover:bg-purple-700 transition-colors"
                  >
                    Tümünü Gör
                  </Link>
                </div>
              )}

              {/* Other Countries */}
              <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6">
                <div className="inline-block px-4 py-2 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-4">
                  <h3 className="transform skew-x-12 text-sm font-black uppercase tracking-wider">
                    Diğer Ülkeler
                  </h3>
                </div>
                <div className="space-y-4">
                  {otherCountries.map(([countryKey, schools]) => {
                    const countryName = schools[0]?.href.split('/')[2] || countryKey;
                    return (
                      <div key={countryKey}>
                        <Link
                          href={`/master-mba/${countryKey}`}
                          className="block px-3 py-2 bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-100 transition-all duration-200 mb-2"
                        >
                          <span className="font-black text-sm text-gray-900 uppercase">
                            {countryName.charAt(0).toUpperCase() + countryName.slice(1)}
                          </span>
                        </Link>
                        <ul className="ml-4 space-y-1">
                          {schools.slice(0, 3).map((school, index) => (
                            <li key={index}>
                              <Link
                                href={school.href}
                                className="block p-2 bg-gray-50 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 text-xs font-bold text-gray-700"
                              >
                                {school.title.length > 40 ? `${school.title.substring(0, 40)}...` : school.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}

