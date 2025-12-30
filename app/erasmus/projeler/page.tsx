'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';

export default function ErasmusProjelerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🤝 KA2 - Kurumlar Arası İşbirliği</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            ERASMUS+ PROJELER
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">KURUMLAR ARASI İŞBİRLİĞİ</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 font-medium max-w-2xl">
            Eğitim kurumları arasında stratejik ortaklıklar ve yenilikçi uygulamaların geliştirilmesi.
          </p>
        </div>
      </section>

      {/* What is KA2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 KA2 Projeler Nedir?</h2>
          </div>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              <strong>KA2 - Kurumlar Arası İşbirliği</strong> projeleri, eğitim kurumları ve diğer kuruluşlar arasında stratejik ortaklıklar kurarak yenilikçi uygulamaların geliştirilmesini ve paylaşılmasını amaçlar. Bu projeler, eğitim ve öğretim alanlarında iyi uygulamaların değişimini, deneyimlerin paylaşılmasını ve ortak çalışmaların yürütülmesini destekler.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              KA2 projeleri sayesinde kurumlar, uluslararası işbirliği yaparak eğitim kalitesini artırabilir, yenilikçi metodolojiler geliştirebilir ve öğrenci deneyimlerini zenginleştirebilirler.
            </p>
          </div>
        </div>

        {/* Project Types */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎯 Proje Türleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-indigo-50 border-4 border-indigo-300">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Stratejik Ortaklıklar</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Farklı ülkelerden eğitim kurumlarının bir araya gelerek ortak projeler geliştirmesi. Yenilikçi eğitim metodolojilerinin oluşturulması ve uygulanması.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Eğitim metodolojileri geliştirme</span>
                </div>
                <div className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Müfredat geliştirme</span>
                </div>
                <div className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">İyi uygulamaların paylaşımı</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-purple-50 border-4 border-purple-300">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Yenilikçi Uygulamalar</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Eğitim ve öğretim alanında yenilikçi yaklaşımların geliştirilmesi, test edilmesi ve yaygınlaştırılması. Dijital öğrenme, öğretmen eğitimi gibi konular.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Dijital öğrenme araçları</span>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Öğretmen eğitimi programları</span>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Eğitim materyalleri geliştirme</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ Proje Avantajları</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Uluslararası İşbirliği</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Farklı ülkelerden kurumlarla işbirliği yapma ve deneyim paylaşımı.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Yenilikçilik</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Eğitim alanında yenilikçi uygulamalar geliştirme ve uygulama imkanı.
                </p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Eğitim Kalitesi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Eğitim kalitesini artırma ve öğrenci deneyimlerini zenginleştirme.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Hibe Desteği</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Proje faaliyetleri için hibe desteği ve finansal katkı.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Ağ Oluşturma</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Uluslararası eğitim ağlarına katılma ve gelecekteki işbirlikleri için temel oluşturma.
                </p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Deneyim Paylaşımı</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  İyi uygulamaların paylaşılması ve öğrenme fırsatları.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🔄 Proje Başvuru Süreci</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start p-6 bg-indigo-50 border-4 border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 border-4 border-indigo-800 font-black text-lg">
                1
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-gray-800 font-bold text-lg mb-2 uppercase tracking-wider">Ortaklık Kurma</h3>
                <p className="text-gray-700 font-medium">Farklı ülkelerden ortak kurumlar bulma ve işbirliği anlaşmaları yapma</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-purple-50 border-4 border-purple-200">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 border-4 border-purple-800 font-black text-lg">
                2
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-gray-800 font-bold text-lg mb-2 uppercase tracking-wider">Proje Hazırlama</h3>
                <p className="text-gray-700 font-medium">Proje önerisi hazırlama, hedefler belirleme ve faaliyet planı oluşturma</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-blue-50 border-4 border-blue-200">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 border-4 border-blue-800 font-black text-lg">
                3
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-gray-800 font-bold text-lg mb-2 uppercase tracking-wider">Başvuru</h3>
                <p className="text-gray-700 font-medium">Belirlenen tarihlerde Türkiye Ulusal Ajansı'na online başvuru yapma</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-indigo-50 border-4 border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 border-4 border-indigo-800 font-black text-lg">
                4
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-gray-800 font-bold text-lg mb-2 uppercase tracking-wider">Değerlendirme</h3>
                <p className="text-gray-700 font-medium">Başvuruların değerlendirilmesi ve hibe kararı</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-purple-50 border-4 border-purple-200">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 border-4 border-purple-800 font-black text-lg">
                5
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-gray-800 font-bold text-lg mb-2 uppercase tracking-wider">Proje Uygulama</h3>
                <p className="text-gray-700 font-medium">Onaylanan projenin uygulanması, faaliyetlerin gerçekleştirilmesi ve raporlama</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Proje Başvurunuzu Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Erasmus+ KA2 projeleri hakkında detaylı bilgi almak ve proje başvuru sürecinizi başlatmak için bizimle iletişime geçin!
          </p>
          <Link
            href="/iletisim"
            className="inline-block px-10 py-4 bg-white text-indigo-600 font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
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
