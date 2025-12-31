'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';

export default function ErasmusPage() {
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🌍 Erasmus+</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            ERASMUS+
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">EĞİTİM PROGRAMLARI</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl">
            Avrupa'da eğitim, öğretim, gençlik ve spor alanlarında fırsatlar. Kişisel gelişiminiz için Avrupa Birliği hibe programı.
          </p>
        </div>
      </section>

      {/* What is Erasmus+ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Erasmus+ Nedir?</h2>
          </div>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              <strong>Erasmus+ Programı</strong>, Avrupa Birliği'nin eğitim, gençlik ve spor alanlarındaki hibe programıdır. 2021-2027 yılları arasında uygulanmakta olup, kişilere yaş ve eğitim geçmişlerine bakılmaksızın yeni beceriler kazandırmayı, kişisel gelişimlerini güçlendirmeyi ve istihdam olanaklarını artırmayı hedeflemektedir. Programın toplam bütçesi 28,4 milyar avrodur.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              Erasmus+ Programı, yükseköğretim öğrencilerine ve personeline yurt dışında eğitim, öğretim veya staj yapma fırsatı sunar. Bu program sayesinde katılımcılar, farklı kültürleri tanır, yabancı dil becerilerini geliştirir ve uluslararası iş deneyimi kazanır.
            </p>
          </div>
        </div>

        {/* Program Components */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎯 Program Bileşenleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/erasmus/egitimler"
              className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-300 hover:border-blue-600 transition-all duration-200 transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(37,99,235,0.3)]"
            >
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                KA1 - Bireylerin Öğrenme Hareketliliği
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Öğrenci ve personel hareketliliği projelerini kapsar. Yükseköğretim öğrencileri ve personeli yurt dışında eğitim, öğretim veya staj yapma fırsatı bulurlar.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Öğrenci Hareketliliği (3-12 ay)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Staj Hareketliliği (2-12 ay)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Personel Hareketliliği (2 gün-2 ay)</span>
                </div>
              </div>
            </Link>

            <Link
              href="/erasmus/projeler"
              className="group p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-4 border-indigo-300 hover:border-indigo-600 transition-all duration-200 transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(99,102,241,0.3)]"
            >
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                KA2 - Kurumlar Arası İşbirliği
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Kurumlar arası işbirliği projelerini destekler. Eğitim ve öğretim alanlarında yenilikçi uygulamaların geliştirilmesini ve paylaşılmasını amaçlar.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Stratejik Ortaklıklar</span>
                </div>
                <div className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Yenilikçi Uygulamalar</span>
                </div>
                <div className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Kurumlar Arası Deneyim Paylaşımı</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Who Can Apply */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">👥 Kimler Başvurabilir?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-blue-50 border-4 border-blue-300">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Öğrenciler</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Ön lisans, lisans, yüksek lisans ve doktora öğrencileri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Tam zamanlı öğrenim gören öğrenciler</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Minimum 2.20/4.00 genel not ortalaması (GNO)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Yeterli yabancı dil seviyesi</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-indigo-50 border-4 border-indigo-300">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Personel</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Üniversitelerde fiilen görev yapan akademik personel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Üniversitelerde görev yapan idari personel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Eğitim veya öğretim faaliyetlerinde bulunacak personel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ Program Avantajları</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Hibe Desteği</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Seyahat ve harcırah giderleri için hibe desteği. İmkânı kısıtlı öğrenciler için ilave hibe imkânları.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kültürel Deneyim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Farklı kültürleri tanıma, uluslararası arkadaşlıklar kurma ve global bir bakış açısı kazanma fırsatı.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Dil Gelişimi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Yabancı dil becerilerinizi geliştirme ve pratik yapma imkanı. Günlük hayatta dil kullanımı.
                </p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kariyer Gelişimi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Uluslararası iş deneyimi kazanma, CV'nize değer katma ve kariyer fırsatlarını artırma.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Akademik Kredi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Yurt dışında aldığınız derslerin üniversitenizde kredi olarak tanınması ve diploma ekinde belirtilmesi.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Ağ Oluşturma</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Uluslararası akademik ve profesyonel ağlar kurma, gelecekteki işbirlikleri için temel oluşturma.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🔄 Başvuru Süreci</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-blue-300 text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border-4 border-blue-800">
                1
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Başvuru</h3>
              <p className="text-gray-700 font-medium text-sm">
                Üniversitenizin uluslararası ofisi tarafından duyurulan tarihlerde online başvuru yapın
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-indigo-300 text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border-4 border-indigo-800">
                2
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Değerlendirme</h3>
              <p className="text-gray-700 font-medium text-sm">
                Akademik başarı ve dil yeterliliği kriterlerine göre başvurular değerlendirilir
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-100 to-blue-100 border-4 border-purple-300 text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border-4 border-purple-800">
                3
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Seçim</h3>
              <p className="text-gray-700 font-medium text-sm">
                Seçilen adaylar, belirlenen kontenjanlar dahilinde hareketlilikten faydalanma hakkı kazanır
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-blue-300 text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border-4 border-blue-800">
                4
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Hareketlilik</h3>
              <p className="text-gray-700 font-medium text-sm">
                Yurt dışındaki ortak üniversitede eğitim, öğretim veya staj faaliyetlerine katılım
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🔗 Programlar</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/erasmus/egitimler"
              className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-300 hover:border-blue-600 transition-all duration-200 transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(37,99,235,0.3)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                    KA1 - Eğitimler
                  </h3>
                  <p className="text-gray-700 font-medium">
                    Öğrenci ve personel hareketliliği programları
                  </p>
                </div>
                <svg className="w-8 h-8 text-blue-600 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            <Link
              href="/erasmus/projeler"
              className="group p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-4 border-indigo-300 hover:border-indigo-600 transition-all duration-200 transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(99,102,241,0.3)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                    KA2 - Projeler
                  </h3>
                  <p className="text-gray-700 font-medium">
                    Kurumlar arası işbirliği projeleri
                  </p>
                </div>
                <svg className="w-8 h-8 text-indigo-600 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Erasmus+ Başvurunuzu Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Erasmus+ programları hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
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
