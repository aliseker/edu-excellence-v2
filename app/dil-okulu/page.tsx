'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import Image from 'next/image';

export default function DilOkuluPage() {
  const countries = [
    { name: 'İngiltere', flag: '🇬🇧', slug: 'ingiltere', countryCode: 'gb' },
    { name: 'Amerika', flag: '🇺🇸', slug: 'amerika', countryCode: 'us' },
    { name: 'Kanada', flag: '🇨🇦', slug: 'kanada', countryCode: 'ca' },
    { name: 'İrlanda', flag: '🇮🇪', slug: 'irlanda', countryCode: 'ie' },
    { name: 'Malta', flag: '🇲🇹', slug: 'malta', countryCode: 'mt' },
    { name: 'Avustralya', flag: '🇦🇺', slug: 'avustralya', countryCode: 'au' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 text-white py-8 border-b-4 border-gray-900 overflow-hidden">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🌍 Dil Eğitimi</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            NEDEN DİL
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">EĞİTİMİ?</span>
            </span>
          </h1>
          <p className="text-base md:text-lg text-purple-100 font-medium max-w-2xl">
            Yurtdışında dil öğrenerek kariyerinize yön verin. Profesyonel danışmanlık hizmetimizle yanınızdayız.
          </p>
        </div>
      </section>

      {/* Why Language Education */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-10">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 md:p-7 mb-8">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">💡 Neden Yurtdışında Dil Eğitimi?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Tam İmmersiyon</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Günlük hayatta sürekli pratik yaparak dil öğrenin. Sadece sınıfta değil, her yerde İngilizce konuşun.
                </p>
              </div>
            </div>

            <div className="p-6 bg-violet-50 border-4 border-violet-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kültürel Deneyim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Sadece dil değil, farklı kültürleri de keşfedin. Yeni arkadaşlıklar kurun ve dünya görüşünüzü genişletin.
                </p>
              </div>
            </div>

            <div className="p-6 bg-pink-50 border-4 border-pink-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kariyer Fırsatları</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Uluslararası şirketlerde çalışma fırsatları. Yurtdışı deneyiminiz CV'nize değer katar.
                </p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Akreditasyonlu Okullar</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Dünya çapında tanınan, akreditasyonlu dil okulları. Kaliteli eğitim garantisi.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Uluslararası Sınıflar</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Dünyanın dört bir yanından gelen öğrencilerle birlikte öğrenin. Çeşitlilik içinde büyüyün.
                </p>
              </div>
            </div>

            <div className="p-6 bg-teal-50 border-4 border-teal-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Hızlı İlerleme</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Yoğun programlarla kısa sürede büyük ilerleme kaydedin. Her seviyede eğitim imkanı.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Options */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-10">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 md:p-7 mb-8">
          <div className="inline-block px-5 py-2.5 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📖 Kurs Seçenekleri</h2>
          </div>

          <div className="space-y-8">
            {/* Genel İngilizce */}
            <div className="p-6 bg-gray-50 border-4 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Genel İngilizce</h3>
              <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                Okullarımızın sundukları eğitimler başlıca haftada 20 ders ve haftada 30 ders olmak üzere ikiye ayrılır.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border-2 border-purple-300">
                  <h4 className="font-black text-purple-600 mb-2 uppercase">Genel Eğitim</h4>
                  <p className="text-sm text-gray-600">Haftada 20 ders yabancı dil eğitimi</p>
                </div>
                <div className="p-4 bg-white border-2 border-violet-300">
                  <h4 className="font-black text-violet-600 mb-2 uppercase">Yoğun Eğitim</h4>
                  <p className="text-sm text-gray-600">Haftada 30 ders yabancı dil eğitimi</p>
                </div>
              </div>
            </div>

            {/* Sınav Hazırlık */}
            <div className="p-6 bg-gray-50 border-4 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Sınav Hazırlık Kursları</h3>
              <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                Özellikle yurtdışında lisans ve yüksek lisans yapmayı hedefleyen öğrenciler için hazırlanmış programlardır.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white border-2 border-blue-300">
                  <h4 className="font-black text-blue-600 mb-2">TOEFL</h4>
                  <p className="text-xs text-gray-600">Kuzey Amerika İngilizcesi için en bilinen sınav</p>
                </div>
                <div className="p-4 bg-white border-2 border-red-300">
                  <h4 className="font-black text-red-600 mb-2">IELTS</h4>
                  <p className="text-xs text-gray-600">İngiltere, İrlanda, Avustralya üniversiteleri için</p>
                </div>
                <div className="p-4 bg-white border-2 border-green-300">
                  <h4 className="font-black text-green-600 mb-2">CAMBRIDGE</h4>
                  <p className="text-xs text-gray-600">FCE, CAE, CPE sertifikaları</p>
                </div>
                <div className="p-4 bg-white border-2 border-purple-300">
                  <h4 className="font-black text-purple-600 mb-2">GMAT/GRE</h4>
                  <p className="text-xs text-gray-600">Yüksek lisans ve doktora için</p>
                </div>
              </div>
            </div>

            {/* Öğretmen Eğitimi */}
            <div className="p-6 bg-gray-50 border-4 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Öğretmen Eğitimi</h3>
              <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                İngilizce öğretmenliği ile alakalı olarak yurtdışında kısa veya uzun süreli İngilizce öğretmenliği sertifika programları. 
                Kurslar genelde 2-12 hafta aralığındadır.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white border-2 border-teal-300">
                  <h4 className="font-black text-teal-600 mb-2">TEFL</h4>
                  <p className="text-xs text-gray-600">Teaching English as a Foreign Language</p>
                </div>
                <div className="p-4 bg-white border-2 border-indigo-300">
                  <h4 className="font-black text-indigo-600 mb-2">TESOL</h4>
                  <p className="text-xs text-gray-600">Teaching English to Speakers of Other Languages</p>
                </div>
                <div className="p-4 bg-white border-2 border-orange-300">
                  <h4 className="font-black text-orange-600 mb-2">CELTA</h4>
                  <p className="text-xs text-gray-600">Cambridge sertifikasyonu</p>
                </div>
                <div className="p-4 bg-white border-2 border-pink-300">
                  <h4 className="font-black text-pink-600 mb-2">DELTA</h4>
                  <p className="text-xs text-gray-600">Diploma in English Language Teaching</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-10">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 md:p-7 mb-8">
          <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏠 Konaklama Olanakları</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white border-4 border-gray-900 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🏡</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Aile Yanı</h3>
                <p className="text-gray-700 font-medium leading-relaxed mb-4">
                  Yerel bir ailenin yanında kalarak hem dil pratiği yapın hem de kültürü yakından tanıyın.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Kahvaltı ve akşam yemeği dahil</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Tek veya çift kişilik oda seçenekleri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Okula yakın mesafeler</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white border-4 border-gray-900 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Öğrenci Yurdu</h3>
                <p className="text-gray-700 font-medium leading-relaxed mb-4">
                  Uluslararası öğrencilerle birlikte kalarak sosyalleşin ve bağımsızlığınızı geliştirin.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">✓</span>
                    <span>Ortak kullanım alanları</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">✓</span>
                    <span>Kendi yemeğinizi yapma imkanı</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 mr-2">✓</span>
                    <span>Okula yürüme mesafesi veya toplu taşıma</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white border-4 border-gray-900 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🏨</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Apartman / Stüdyo</h3>
                <p className="text-gray-700 font-medium leading-relaxed mb-4">
                  Tamamen bağımsız bir yaşam alanı. Daha fazla özgürlük ve rahatlık.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span>Kendi mutfağınız ve banyonuz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span>Tek veya çift kişilik seçenekler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">✓</span>
                    <span>Şehir merkezine yakın lokasyonlar</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">Ülkelere Göre Dil Okulları</h2>
          <p className="text-lg text-gray-600 font-medium">Size en uygun ülkeyi seçin</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/dil-okulu/${country.slug}`}
              className="group p-6 bg-white border-4 border-gray-900 hover:border-purple-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.1)]"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="relative w-20 h-14 mx-auto mb-3">
                  <Image
                    src={`https://flagcdn.com/w80/${country.countryCode}.png`}
                    alt={`${country.name} bayrağı`}
                    fill
                    className="object-cover rounded-md border border-gray-200"
                  />
                </div>
                <div className="text-lg font-black text-gray-900 uppercase tracking-wider group-hover:text-purple-600 transition-colors">
                  {country.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-10">
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            Hayalinizdeki Dil Eğitimine Başlayın
          </h2>
          <p className="text-xl text-purple-100 mb-8 font-medium">
            Profesyonel danışmanlarımız size en uygun programı bulmanızda yardımcı olacak
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-5 bg-white text-purple-600 font-black text-lg uppercase tracking-wider border-4 border-purple-800 hover:bg-purple-50 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
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
