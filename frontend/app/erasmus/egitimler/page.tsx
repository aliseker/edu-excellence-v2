'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';

export default function ErasmusEgitimlerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🎓 KA1 - Bireylerin Öğrenme Hareketliliği</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            ERASMUS+ EĞİTİMLER
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">ÖĞRENME HAREKETLİLİĞİ</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl">
            Yükseköğretim öğrencileri ve personeli için yurt dışında eğitim, öğretim veya staj yapma fırsatları.
          </p>
        </div>
      </section>

      {/* Program Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Hareketlilik Türleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-blue-50 border-4 border-blue-300">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Öğrenci Hareketliliği</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Yurt dışındaki bir yükseköğretim kurumunda eğitim almak için hareketlilik programı.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">⏱️</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Süre:</p>
                    <p className="text-gray-700 font-medium">3-12 ay</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">📋</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Kapsam:</p>
                    <p className="text-gray-700 font-medium">Ders alma, akademik çalışmalar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-indigo-50 border-4 border-indigo-300">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Staj Hareketliliği</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Yurt dışında bir işletmede, kuruluşta veya eğitim kurumunda staj yapmak için hareketlilik programı.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">⏱️</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Süre:</p>
                    <p className="text-gray-700 font-medium">2-12 ay</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">📋</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Kapsam:</p>
                    <p className="text-gray-700 font-medium">İş deneyimi, pratik beceriler</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-purple-50 border-4 border-purple-300">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Personel Hareketliliği</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Akademik veya idari personelin yurt dışında eğitim veya öğretim faaliyetlerinde bulunması.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">⏱️</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Süre:</p>
                    <p className="text-gray-700 font-medium">2 gün - 2 ay</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">📋</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Kapsam:</p>
                    <p className="text-gray-700 font-medium">Eğitim, öğretim, ders verme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📋 Başvuru Gereksinimleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 border-4 border-blue-200">
              <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Öğrenciler İçin:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Tam zamanlı öğrenci olmak</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Minimum 2.20/4.00 GNO (Genel Not Ortalaması)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Yeterli yabancı dil seviyesi (B1 seviyesi ve üzeri)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Ön lisans, lisans, yüksek lisans veya doktora öğrencisi olmak</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200">
              <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">Personel İçin:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Üniversitede fiilen görev yapıyor olmak</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Akademik veya idari personel olmak</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Eğitim veya öğretim faaliyetlerinde bulunacak olmak</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Ortak üniversite ile anlaşma olması</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ Avantajlar</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Hibe Desteği</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Seyahat, harcırah ve bireysel destek için aylık hibe desteği.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kültürel Deneyim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Farklı kültürleri tanıma ve uluslararası arkadaşlıklar kurma.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Dil Gelişimi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Yabancı dil becerilerini geliştirme ve pratik yapma imkanı.
                </p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Akademik Kredi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Yurt dışında alınan derslerin üniversitede kredi olarak tanınması.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kariyer</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  CV'ye değer katan uluslararası deneyim ve kariyer fırsatları.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Ağ Oluşturma</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Uluslararası akademik ve profesyonel ağlar kurma imkanı.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Başvuru Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Erasmus+ eğitim programları hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
          </p>
          <Link
            href="/iletisim"
            className="inline-block px-10 py-4 bg-white text-blue-600 font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
          >
            İLETİŞİME GEÇ
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
