'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';

export default function HakkimizdaPage() {
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🏢 Kurumsal</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            HAKKIMIZDA
            <br />
            <span>15+ YILLIK DENEYİM</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl">
            Uluslararası eğitim ve Erasmus programlarında güvenilir ortağınız
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Edu-Excellence Hakkında</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              <strong>Edu-Excellence</strong>, uluslararası proje faaliyetleri, öğretmen eğitimi, AB fonlu projeler ve kapsamlı eğitim hizmetleri alanında önde gelen bir KOBİ'dir. 15 yılı aşkın kanıtlanmış deneyimimizle, disiplinli çalışma sistemimiz ve kaliteye olan bağlılığımız sayesinde mükemmelliği sunmaya kararlıyız.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              <strong>Antalya, İstanbul, Düsseldorf, Dortmund, Granada, Paris ve Mykonos</strong> dahil olmak üzere birden fazla uluslararası lokasyonda faaliyet göstererek, Erasmus+ Program KA2 İşbirliği Ortaklıkları konusunda güvenilir ortağınız olarak hizmet veriyoruz.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              Kapsamlı desteğimiz, proje yazımı, ortaklık kurulması, uygulama ve rapor hazırlığını içerir. Ayrıca <strong>öğretmen gelişimi için KA1 kursları</strong> sunuyoruz ve konaklama, ulaşım ve kültürel aktiviteler için tam destek sağlıyoruz.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-8 text-white text-center transform hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.3)] transition-all duration-200">
            <div className="text-6xl font-black mb-4">15+</div>
            <div className="text-xl font-black uppercase tracking-wider">Yıllık Deneyim</div>
            <div className="text-sm font-medium mt-2 opacity-90">2010'dan beri</div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-8 text-white text-center transform hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.3)] transition-all duration-200">
            <div className="text-6xl font-black mb-4">7</div>
            <div className="text-xl font-black uppercase tracking-wider">Ülke</div>
            <div className="text-sm font-medium mt-2 opacity-90">Uluslararası lokasyonlar</div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-8 text-white text-center transform hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.3)] transition-all duration-200">
            <div className="text-6xl font-black mb-4">500+</div>
            <div className="text-xl font-black uppercase tracking-wider">Proje</div>
            <div className="text-sm font-medium mt-2 opacity-90">Başarıyla tamamlanan</div>
          </div>
        </div>

        {/* Locations */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🌍 Lokasyonlarımız</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { name: 'Antalya', flag: '🇹🇷' },
              { name: 'İstanbul', flag: '🇹🇷' },
              { name: 'Düsseldorf', flag: '🇩🇪' },
              { name: 'Dortmund', flag: '🇩🇪' },
              { name: 'Granada', flag: '🇪🇸' },
              { name: 'Paris', flag: '🇫🇷' },
              { name: 'Mykonos', flag: '🇬🇷' },
            ].map((location, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-300 text-center transform hover:-skew-x-2 hover:shadow-[6px_6px_0_0_rgba(37,99,235,0.3)] transition-all duration-200">
                <div className="text-4xl mb-3">{location.flag}</div>
                <div className="text-lg font-black text-gray-900 uppercase tracking-wider">{location.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">💼 Hizmetlerimiz</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-purple-50 border-4 border-purple-300">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">KA2 Proje Desteği</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Erasmus+ Program KA2 İşbirliği Ortaklıkları için kapsamlı destek. Proje yazımı, ortaklık kurulması, uygulama ve rapor hazırlığı.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Proje yazımı ve planlama</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Ortaklık kurulması</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Proje uygulama desteği</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Rapor hazırlığı</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-blue-50 border-4 border-blue-300">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">KA1 Öğretmen Eğitimi</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Öğretmen gelişimi için KA1 kursları. Konaklama, ulaşım ve kültürel aktiviteler için tam destek.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Öğretmen gelişim kursları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Konaklama düzenlemesi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Ulaşım desteği</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Kültürel aktiviteler</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Motto */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">💡 Motto'muz</h2>
          </div>
          <p className="text-2xl md:text-3xl font-black leading-relaxed max-w-4xl mx-auto">
            Doğru Kişiler ve Kuruluşlarla İşbirliği Yapın ve Erasmus'tan Keyif Alın
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
