'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';

export default function UniversitiesPage() {
  const countries = [
    { name: 'İngiltere', flag: '🇬🇧', slug: 'ingiltere' },
    { name: 'Amerika', flag: '🇺🇸', slug: 'amerika' },
    { name: 'Kanada', flag: '🇨🇦', slug: 'kanada' },
    { name: 'Almanya', flag: '🇩🇪', slug: 'almanya' },
    { name: 'İtalya', flag: '🇮🇹', slug: 'italya' },
    { name: 'Fransa', flag: '🇫🇷', slug: 'fransa' },
    { name: 'Polonya', flag: '🇵🇱', slug: 'polonya' },
    { name: 'Macaristan', flag: '🇭🇺', slug: 'macaristan' },
    { name: 'Avusturya', flag: '🇦🇹', slug: 'avusturya' },
    { name: 'Litvanya', flag: '🇱🇹', slug: 'litvanya' },
    { name: 'Hollanda', flag: '🇳🇱', slug: 'hollanda' },
    { name: 'Avustralya', flag: '🇦🇺', slug: 'avustralya' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🎓 Üniversite</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            NEDEN YURTDIŞINDA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">ÜNİVERSİTE?</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl">
            Dünyanın en prestijli üniversitelerinde eğitim alın. Kariyerinize yön verin.
          </p>
        </div>
      </section>

      {/* Why Study Abroad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🌟 Neden Yurtdışında Üniversite?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Yabancı Dil + Eğitim Kalitesi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Hem yabancı dilinizi geliştirin hem de dünya standartlarında kaliteli eğitim alın.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kültür Değişimi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Farklı kültürlerin parçası olun, dünya görüşünüzü genişletin ve global bir network kurun.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kişisel Gelişim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Kendi ayaklarınızın üstünde durmayı öğrenin. Bağımsızlık ve sorumluluk duygusu kazanın.
                </p>
              </div>
            </div>

            <div className="p-6 bg-pink-50 border-4 border-pink-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kariyer Fırsatları</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Uluslararası şirketlerde çalışma fırsatları. CV'nize değer katan bir deneyim.
                </p>
              </div>
            </div>

            <div className="p-6 bg-violet-50 border-4 border-violet-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Prestijli Üniversiteler</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Dünya üniversite sıralamalarında üst seviyede üniversitelerde eğitim alın.
                </p>
              </div>
            </div>

            <div className="p-6 bg-teal-50 border-4 border-teal-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Geniş Program Seçenekleri</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  İstediğiniz alanda, istediğiniz seviyede eğitim programları bulun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Need to Know */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📖 Bilmeniz Gerekenler</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/universite/bilmeniz-gerekenler/a-level"
              className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-blue-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-lg"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-4">📘</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                  A Level Nedir?
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  İngiltere'de üniversite eğitimi için gerekli sınav sistemi
                </p>
              </div>
            </Link>

            <Link
              href="/universite/bilmeniz-gerekenler/ib"
              className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-indigo-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-lg"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                  IB Nedir?
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  International Baccalaureate programı hakkında bilgiler
                </p>
              </div>
            </Link>

            <Link
              href="/universite/bilmeniz-gerekenler/ap"
              className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-purple-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-lg"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
                  AP Nedir?
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Advanced Placement programı ve avantajları
                </p>
              </div>
            </Link>

            <Link
              href="/universite/bilmeniz-gerekenler/sinavlar"
              className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-pink-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-lg"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-pink-600 transition-colors">
                  Gerekli Sınavlar
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Yurtdışında eğitim için gerekli tüm sınavlar
                </p>
              </div>
            </Link>

            <Link
              href="/universite/bilmeniz-gerekenler/tv-medya"
              className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-red-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-lg"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-4">📺</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                  TV Medya Bölümleri
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Yurtdışında TV ve medya eğitimi seçenekleri
                </p>
              </div>
            </Link>

            <Link
              href="/universite/bilmeniz-gerekenler/sanat-muzik"
              className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-orange-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-lg"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-4">🎵</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                  Sanat Müzik
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Yurtdışında sanat ve müzik eğitimi programları
                </p>
              </div>
            </Link>

            <Link
              href="/universite/bilmeniz-gerekenler/turizm-ascilik"
              className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-yellow-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-lg"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-4">🍽️</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-yellow-600 transition-colors">
                  Turizm Aşçılık
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Yurtdışında turizm ve aşçılık eğitimi fırsatları
                </p>
              </div>
            </Link>

            <Link
              href="/universite/bilmeniz-gerekenler/tasarim-moda"
              className="group p-6 bg-gray-50 border-4 border-gray-300 hover:border-pink-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-lg"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-4">👗</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-pink-600 transition-colors">
                  Tasarım Moda
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Yurtdışında tasarım ve moda eğitimi seçenekleri
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">Ülkelere Göre Üniversiteler</h2>
          <p className="text-lg text-gray-600 font-medium">Size en uygun ülkeyi seçin</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/universite/${country.slug}`}
              className="group p-6 bg-white border-4 border-gray-900 hover:border-blue-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.1)]"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-3">{country.flag}</div>
                <div className="text-lg font-black text-gray-900 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                  {country.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            Yurtdışında Üniversite Eğitimine Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-medium">
            Profesyonel danışmanlarımız size en uygun üniversiteyi bulmanızda yardımcı olacak
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
