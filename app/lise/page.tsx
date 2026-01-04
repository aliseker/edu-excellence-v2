'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import Image from 'next/image';

export default function LisePage() {
  const countries = [
    { name: 'Amerika', flag: '🇺🇸', slug: 'amerika', countryCode: 'us' },
    { name: 'Kanada', flag: '🇨🇦', slug: 'kanada', countryCode: 'ca' },
    { name: 'İngiltere', flag: '🇬🇧', slug: 'ingiltere', countryCode: 'gb' },
    { name: 'İrlanda', flag: '🇮🇪', slug: 'irlanda', countryCode: 'ie' },
    { name: 'Almanya', flag: '🇩🇪', slug: 'almanya', countryCode: 'de' },
    { name: 'İtalya', flag: '🇮🇹', slug: 'italya', countryCode: 'it' },
    { name: 'Fransa', flag: '🇫🇷', slug: 'fransa', countryCode: 'fr' },
    { name: 'İspanya', flag: '🇪🇸', slug: 'ispanya', countryCode: 'es' },
  ];

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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🎓 Lise Eğitimi</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            NEDEN YURTDIŞINDA
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">LİSE EĞİTİMİ?</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 font-medium max-w-2xl">
            Milli Eğitim Bakanlığı onaylı programlar ile yurtdışında lise eğitimi. Geleceğinize en iyi yatırımı yapın.
          </p>
        </div>
      </section>

      {/* Yurtdışında Lise Hakkında */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Yurtdışında Lise Programları</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              <strong>Yurtdışında Lise Programları</strong>, Milli Eğitim Bakanlığı'ndan onaylı bir program olup, Türk öğrencilerine yurtdışındaki bir lise bünyesinde 1 yıl, 2 yıl, 3 yıl ya da 4 yıl eğitim alma şansını sunmaktadır.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              Lise Değişim programları, ağırlıklı olarak 14-18 yaş aralığındaki lise öğrencilerine sene kaybetmeden yurtdışında değişim öğrencisi olarak 1 yıl okuma imkânı sunmaktadır. Lise Değişim Programı sayesinde Türk öğrenciler, yurtdışı lise değişim eğitimi amacıyla gittikleri ülkelerin eğitim bakanlıklarından uluslararası öğrenci kabul etme yetkisine sahip olan seçkin liselerde eğitim almakta, tercih edilen ülkedeki ana dili konuşan ailelerin yanında ya da öğrenci yurtlarında konaklamakta, bu sayede hem yabancı dil seviyelerini ve vizyonlarını geliştirip hem de farklı kültürleri yakından tanıma imkânına sahip olmaktadırlar.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              Ayrıca Milli Eğitim Bakanlığı Denklik Yönetmeliği'ne göre yurtdışındaki lise eğitimi denk kabul edildiğinden, öğrenciler döndüklerinde sene kaybetmeden eğitimlerini tamamlayıp mezun olabilmektedirler. Lise Değişim Programı'na 1 yıl süreyle katılınabileceği gibi, gidilen ülkeye göre değişkenlik göstermek suretiyle lise programlarına daha kısa ya da uzun süreli (6 ay, 2 yıl, 3 yıl, 4 yıl) olarak da katılınabilmektedir.
            </p>
          </div>
        </div>

        {/* Lise Programlarına Katılma Amaçları */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-teal-600 text-white border-4 border-teal-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎯 Lise Programlarına Katılma Amaçları</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 border-4 border-green-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Dil Gelişimi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Yurtdışında lise değişim programına katılıp, İngilizce ya da tercih edilen ülkenin ana dilinde dil seviyesini geliştirmek, uluslararası bir deneyime sahip olmak ve sonrasında Türkiye'ye geri dönerek lise eğitimini Türkiye'de tamamlamak.
                </p>
              </div>
            </div>

            <div className="p-6 bg-emerald-50 border-4 border-emerald-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Yurtdışında Diploma</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Lise son sınıfı yurtdışında okuyarak yabancı bir liseden mezun olmak, bu liseden diploma almak ve ilgili ülkede lisans eğitimine devam etmek.
                </p>
              </div>
            </div>

            <div className="p-6 bg-teal-50 border-4 border-teal-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Kültürel Deneyim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Tercih edilen konaklama tipine göre aile yanında ya da yurtta konaklayarak, farklı kültürlerden insanlarla aynı çatı altında yaşayarak kişisel gelişimlerini aynı atmosferde dil pratiğiyle harmanlamak.
                </p>
              </div>
            </div>

            <div className="p-6 bg-cyan-50 border-4 border-cyan-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Üniversite Avantajı</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Lisenin son 2 senesini okuyarak, üst düzey üniversitelere başvuru yapmak ya da ortalama seviyelerdeki yurtdışı üniversitelerde burslu eğitim alabilme adına avantajlı hale gelmek.
                </p>
              </div>
            </div>

            <div className="p-6 bg-green-50 border-4 border-green-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-3xl mb-3">✈️</div>
                <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">12+1 Programı</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Türkiye'de lise eğitimini tamamlayıp, bir üniversiteye yerleştikten sonra, üniversiteye başlamayıp 12+1 olarak adlandırılan programa katılarak üniversite öncesi uluslararası bir deneyim elde etmek.
                </p>
              </div>
            </div>

            <div className="p-6 bg-emerald-50 border-4 border-emerald-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">4 Yıllık Eğitim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Yurtdışında 4 yıllık lise eğitimi aldıktan sonra Türkiye'deki üniversitelere sınavsız yerleşmek ya da yurtdışında bir üniversiteye yerleşmek.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Avantajlar */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-emerald-600 text-white border-4 border-emerald-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ Türk Öğrencilerinin Avantajları</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-green-300 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wider">Dil Seviyesi</h3>
              <p className="text-gray-700 font-medium text-sm">
                Çok iyi düzeyde İngilizce ya da tercih edilen ülkenin ana dilinin seviyesine sahip olma
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-teal-100 to-cyan-100 border-4 border-teal-300 text-center">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wider">Kültürel Deneyim</h3>
              <p className="text-gray-700 font-medium text-sm">
                Tercih edilen ülkenin kültürü ve yaşam tarzını yakından tanıma
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-100 to-teal-100 border-4 border-green-300 text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wider">Çok Uluslu Yapı</h3>
              <p className="text-gray-700 font-medium text-sm">
                Diğer değişim öğrencileri ile beraber eğitim alıp çok uluslu bir yapıyı görme
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-emerald-100 to-green-100 border-4 border-emerald-300 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wider">Yaşam Deneyimi</h3>
              <p className="text-gray-700 font-medium text-sm">
                Ailelerinden uzakta yaşayarak yurtdışı yaşam tarzına adapte olma ve unutulmaz bir deneyim
              </p>
            </div>
          </div>
        </div>

        {/* Konaklama */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-teal-600 text-white border-4 border-teal-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏠 Konaklama Seçenekleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-green-50 border-4 border-green-300">
              <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Aile Yanı Konaklama</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                En fazla tercih edilen konaklama tipidir. Yurtdışında lise eğitimi esnasında öğrenciler, okulların genelde uzun yıllardır çalıştığı ve konaklama konusunda deneyimli aileler tarafından konaklama hizmetlerini ücret karşılığında alabilmektedirler.
              </p>
              <ul className="space-y-2 text-gray-700 font-medium">
                <li className="flex items-start">
                  <span className="text-green-600 font-black mr-2">✓</span>
                  <span>Yerel ailelerle yaşama fırsatı</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-black mr-2">✓</span>
                  <span>Kültürel entegrasyon</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-black mr-2">✓</span>
                  <span>Dil pratiği için ideal ortam</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-black mr-2">✓</span>
                  <span>Okullar tarafından düzenlenen aileler</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-teal-50 border-4 border-teal-300">
              <div className="text-5xl mb-4">🏫</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Yatılı Okul (Yurt)</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Bazı okullar yatılı yurt tipi konaklama sunmaktadır. Öğrenciler kampüs içinde veya kampüs yakınında yurtlarda konaklayabilirler. Yatılı okul seçeneği özellikle özel liselerde yaygındır.
              </p>
              <ul className="space-y-2 text-gray-700 font-medium">
                <li className="flex items-start">
                  <span className="text-teal-600 font-black mr-2">✓</span>
                  <span>Kampüs içi ya da yakını konaklama</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-black mr-2">✓</span>
                  <span>Diğer uluslararası öğrencilerle birlikte yaşama</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-black mr-2">✓</span>
                  <span>Bağımsız yaşam deneyimi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-black mr-2">✓</span>
                  <span>24 saat gözetim ve güvenlik</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ülkeler */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🌍 Lise Eğitimi Sunan Ülkeler</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/lise/${country.slug}`}
                className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-300 hover:border-green-600 transition-all duration-200 transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(34,197,94,0.3)]"
              >
                <div className="relative w-20 h-14 mx-auto mb-4">
                  <Image
                    src={`https://flagcdn.com/w80/${country.countryCode}.png`}
                    alt={`${country.name} bayrağı`}
                    fill
                    className="object-cover rounded-md border border-gray-200"
                  />
                </div>
                <h3 className="text-xl font-black text-gray-900 text-center uppercase tracking-wider group-hover:text-green-600 transition-colors">
                  {country.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Hayalinizdeki Lise Eğitimi İçin</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Yurtdışında lise eğitimi hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-4 bg-white text-green-600 font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
          >
            HEMEN BAŞVUR
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
