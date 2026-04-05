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
            VİZYON, MİSYON
            <br />
            <span>VE UZMANLIK ALANLARIMIZ</span>
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
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                Eğitimde uluslararasılaşmayı destekleyen, yenilikçi, kapsayıcı ve sürdürülebilir projeler geliştiren; bireylerin ve kurumların küresel yetkinliklerini artıran öncü bir kuruluş olmak.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="inline-block px-5 py-2.5 bg-emerald-600 text-white border-4 border-emerald-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎯 MİSYONUMUZ</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <ul className="text-gray-800 text-lg leading-relaxed font-medium space-y-4 list-none pl-0 m-0">
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-black shrink-0">•</span>
                  <span>Kurumları ve bireyleri uluslararası fırsatlarla buluşturmak</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-black shrink-0">•</span>
                  <span>Erasmus+ ve diğer hibe programlarında yüksek başarı oranları yakalamak</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-black shrink-0">•</span>
                  <span>Eğitimde kaliteyi artıran, uygulanabilir ve etkili projeler üretmek</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-black shrink-0">•</span>
                  <span>Uluslararası hareketlilik programlarını erişilebilir ve etkili hale getirmek</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-teal-600 text-white border-4 border-teal-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ UZMANLIK ALANLARIMIZ</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              Edu Excellence, her yıl gerçekleştirdiği Yerel ve Uluslararası faaliyetler, Yurtdışı imkânı sağladığı kişi sayısı, kendisi ile iş ortaklığı yaptığı kurumların aldığı hibe sayısı ve proje başarıları ile Türkiye&apos;nin ve Avrupa&apos;nın en başarılı kurumları arasında yer almaktadır.
            </p>
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





