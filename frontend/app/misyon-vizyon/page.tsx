'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';

export default function MisyonVizyonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🎯 Kurumsal</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            MİSYON & VİZYON
            <br />
            <span>DEĞERLERİMİZ</span>
          </h1>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">👁️ VİZYONUMUZ</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
                Türkiye'nin en güvenilir ve başarılı yurtdışı eğitim danışmanlık firması olmak, öğrencilerimizin hayallerini gerçekleştirmelerine yardımcı olmak.
              </p>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                Uluslararası eğitim ve Erasmus programları alanında öncü bir kurum olarak, kaliteli hizmet sunmayı ve sürekli gelişimi hedefliyoruz. Öğrencilerimize ve ortaklarımıza en iyi deneyimi sunmak için çalışıyoruz.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="inline-block px-5 py-2.5 bg-emerald-600 text-white border-4 border-emerald-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎯 MİSYONUMUZ</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
                Öğrencilerimize en kaliteli eğitim fırsatlarını sunmak, profesyonel danışmanlık hizmeti vererek onların en doğru kararları almalarını sağlamak.
              </p>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                Disiplinli çalışma sistemimiz ve kaliteye olan bağlılığımızla, uluslararası proje faaliyetleri, öğretmen eğitimi ve kapsamlı eğitim hizmetleri sunarak mükemmelliği yakalıyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-teal-600 text-white border-4 border-teal-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ DEĞERLERİMİZ</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-green-50 border-4 border-green-300 text-center transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Güvenilirlik</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  15+ yıllık deneyimimizle güvenilir hizmet sunuyoruz. Öğrencilerimizin ve ortaklarımızın güvenini kazanmak önceliğimizdir.
                </p>
              </div>
            </div>

            <div className="p-8 bg-emerald-50 border-4 border-emerald-300 text-center transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Hız</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Hızlı ve etkili çözümler sunuyoruz. Başvurudan kabul sürecine kadar hızlı destek sağlıyoruz.
                </p>
              </div>
            </div>

            <div className="p-8 bg-teal-50 border-4 border-teal-300 text-center transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Uzmanlık</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Deneyimli ve sertifikalı danışman ekibimizle profesyonel hizmet veriyoruz. Her alanda uzman desteği.
                </p>
              </div>
            </div>

            <div className="p-8 bg-green-50 border-4 border-green-300 text-center transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Uluslararası Deneyim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  7 ülkede faaliyet gösteriyoruz. Geniş uluslararası ağımızla en iyi hizmeti sunuyoruz.
                </p>
              </div>
            </div>

            <div className="p-8 bg-emerald-50 border-4 border-emerald-300 text-center transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Kalite</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Disiplinli çalışma sistemimiz ve kaliteye olan bağlılığımızla mükemmelliği yakalıyoruz.
                </p>
              </div>
            </div>

            <div className="p-8 bg-teal-50 border-4 border-teal-300 text-center transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">İşbirliği</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Doğru kişiler ve kuruluşlarla işbirliği yaparak başarılı projeler gerçekleştiriyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Working Principles */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⚙️ ÇALIŞMA PRENSİPLERİMİZ</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 border-4 border-green-200">
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Disiplinli Çalışma Sistemi</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Organize ve sistematik bir çalışma anlayışıyla her projeyi titizlikle yönetiyoruz. Süreçlerimiz şeffaf ve takip edilebilirdir.
              </p>
            </div>

            <div className="p-6 bg-emerald-50 border-4 border-emerald-200">
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kaliteye Bağlılık</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Hizmetlerimizin her aşamasında kalite standartlarını koruyoruz. Mükemmellik için sürekli gelişim sağlıyoruz.
              </p>
            </div>

            <div className="p-6 bg-teal-50 border-4 border-teal-200">
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Müşteri Odaklılık</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Öğrencilerimizin ve ortaklarımızın ihtiyaçlarına odaklanıyoruz. Her adımda onların başarısı için çalışıyoruz.
              </p>
            </div>

            <div className="p-6 bg-green-50 border-4 border-green-200">
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">İnovasyon</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Eğitim sektöründeki yenilikleri takip ediyor, modern çözümler geliştiriyoruz. Teknolojiyi etkin kullanıyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 BİZİMLE ÇALIŞIN</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Misyonumuz ve vizyonumuz hakkında daha fazla bilgi almak veya projelerinizde birlikte çalışmak için bizimle iletişime geçin!
          </p>
          <a
            href="/iletisim"
            className="inline-block px-10 py-4 bg-white text-green-600 font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
          >
            İLETİŞİME GEÇ
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}





