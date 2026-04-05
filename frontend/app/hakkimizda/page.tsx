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
            <span className="text-3xl md:text-4xl lg:text-5xl">2021&apos;DEN BERİ ANTALYA MERKEZLİ</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl">
            Eğitim, uluslararası hareketlilik ve proje danışmanlığında güvenilir ortağınız
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Edu Excellence Hakkında</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-base leading-relaxed font-medium mb-4">
              <strong>Edu Excellence Uluslararası Eğitim Proje Danışmanlık Ltd. Şti.</strong>
              <span className="block mt-1 italic text-gray-500">
                (Edu Excellence International Training Project and Consultancy)
              </span>
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              <strong>Edu Excellence</strong>, 2021 yılından bu yana Antalya merkezli olarak faaliyet gösteren, eğitim, uluslararası hareketlilik ve proje danışmanlığı alanlarında uzmanlaşmış yenilikçi bir kurumdur. &ldquo;Edu Excellence&rdquo; küresel marka unvanı ile hizmet veren şirketimiz, uluslararası standartlarda kaliteyi esas alarak eğitim kurumlarına, öğretmenlere, gençlere ve profesyonellere yönelik sürdürülebilir ve etkili çözümler üretmektedir.
            </p>
          </div>
        </div>

        {/* Broşür */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-emerald-600 text-white border-4 border-emerald-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📄 Broşür</h2>
          </div>

          <p className="text-gray-700 font-medium mb-6">
            Daha detaylı bilgi için broşürümüzü indirerek inceleyebilirsiniz.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/brosur/edu-excellence-brosur.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white font-bold border-2 border-blue-800 hover:bg-blue-700 transition-colors"
            >
              Broşürü Aç
            </a>

            <a
              href="/brosur/edu-excellence-brosur.pdf"
              download
              className="px-6 py-3 bg-gray-900 text-white font-bold border-2 border-black hover:bg-gray-800 transition-colors"
            >
              Broşürü İndir
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-7 md:p-8 text-white text-center transform hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 min-w-0">
            <div className="text-4xl font-black mb-3">2021</div>
            <div className="text-lg font-black uppercase tracking-wide leading-snug px-1">Faaliyete Başlangıç</div>
            <div className="text-xs sm:text-sm font-medium mt-2 opacity-90">Antalya merkezli</div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-7 md:p-8 text-white text-center transform hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 min-w-0">
            <div className="text-4xl font-black mb-3">KA1 &amp; KA2</div>
            <div className="text-base sm:text-lg font-black uppercase tracking-wide leading-tight px-2">Erasmus+ Danışmanlık</div>
            <div className="text-xs sm:text-sm font-medium mt-2 opacity-90">Proje ve hareketlilik</div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-7 md:p-8 text-white text-center transform hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 min-w-0">
            <div className="text-4xl font-black mb-3">🌍</div>
            <div className="text-lg font-black uppercase tracking-wide leading-snug px-1">Uluslararası Ağ</div>
            <div className="text-xs sm:text-sm font-medium mt-2 opacity-90">Ortaklık ve programlar</div>
          </div>
        </div>

        {/* Service areas */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">💼 Hizmet Alanlarımız</h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Erasmus+ Proje Danışmanlığı (KA1 & KA2)',
              'Ulusal ve Uluslararası Hibe Danışmanlığı',
              'Uluslararası Eğitim Programları',
              'Yurtdışı Lise Değişim Programları',
              'Yurtdışı Üniversite Danışmanlığı',
              'Yabancı Dil Eğitimleri ve Yaz Okulları',
              'Öğretmen Eğitimleri ve Mesleki Gelişim',
              'İşbaşı Gözlem (Job Shadowing) Programları',
              'Eğitsel ve Kültürel Yurtdışı Ziyaretleri',
              'Uluslararası Ortaklık ve Ağ Geliştirme',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 bg-purple-50 border-4 border-purple-200">
                <span className="text-purple-600 font-black text-xl shrink-0">✓</span>
                <span className="text-gray-800 font-bold text-sm md:text-base leading-snug">{item}</span>
              </li>
            ))}
          </ul>
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
