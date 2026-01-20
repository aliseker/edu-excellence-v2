'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiService } from '@/services/api';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface Country {
  id: number;
  name: string;
  slug: string;
  flagEmoji?: string;
}

interface SummerSchool {
  id: number;
  countryId: number;
}

export default function YazOkuluPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [summerSchools, setSummerSchools] = useState<SummerSchool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [countriesRes, fetchedSummerSchools] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`),
          apiService.getSummerSchools(),
        ]);
        if (!countriesRes.ok) {
          throw new Error('Ülkeler yüklenemedi.');
        }
        const fetchedCountries: Country[] = await countriesRes.json();
        setCountries(fetchedCountries);
        setSummerSchools(fetchedSummerSchools);
      } catch (fetchError) {
        console.error('Yaz okulları verileri yüklenemedi:', fetchError);
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const availableCountries = useMemo(() => {
    if (!summerSchools.length) {
      return countries;
    }
    const countryIds = new Set(summerSchools.map((school) => school.countryId));
    return countries.filter((country) => countryIds.has(country.id));
  }, [countries, summerSchools]);

  if (isLoading) return <div className="text-center py-8">Yükleniyor...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">☀️ Yaz Okulu</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            NEDEN YAZ
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">OKULU?</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-orange-100 font-medium max-w-2xl">
            Çocuklarınız için unutulmaz bir yaz deneyimi. Erken yaşta yurtdışı deneyimi ve dil eğitimi.
          </p>
        </div>
      </section>

      {/* Why Summer School */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-orange-600 text-white border-4 border-orange-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🌟 Neden Yurtdışında Yaz Okulu?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-orange-50 border-4 border-orange-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Erken Yaşta Deneyim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  5-17 yaş aralığındaki öğrenciler erken yaşta yurtdışı deneyimine sahip olur. Farklı kültürleri keşfetmeyi genç yaşta öğrenirler.
                </p>
              </div>
            </div>

            <div className="p-6 bg-red-50 border-4 border-red-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Uluslararası Arkadaşlıklar</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Dünyanın dört bir yanından gelen öğrencilerle arkadaşlık kurun. Farklı ülkelerden gelen öğrencilerle sosyalleşin.
                </p>
              </div>
            </div>

            <div className="p-6 bg-pink-50 border-4 border-pink-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Dil Gelişimi</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Eğlenirken öğrenin. Hem dil eğitimi alın hem de sosyal aktivitelerle pratik yapın.
                </p>
              </div>
            </div>

            <div className="p-6 bg-yellow-50 border-4 border-yellow-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Kişisel Gelişim</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Kişisel sorumluluk duygusu gelişir. Kendine güven artar ve olaylara bakış açısı genişler.
                </p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🏃</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Sosyal Aktiviteler</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Spor, sanat, gezi ve eğlence aktiviteleri. Sadece ders değil, unutulmaz anılar biriktirin.
                </p>
              </div>
            </div>

            <div className="p-6 bg-green-50 border-4 border-green-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Güvenli Ortam</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  7/24 gözetim, güvenli konaklama ve deneyimli eğitmenler. Öğrencilerin güvenliği önceliğimizdir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎓 Program Türleri</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Genel Yaz Okulu */}
            <div className="p-6 bg-gray-50 border-4 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Genel Yaz Okulu</h3>
              <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                5-17 yaş aralığındaki öğrenciler için tasarlanmış programlar. Dil eğitimi ve sosyal aktivitelerin birleştiği eğlenceli programlar.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 font-black">✓</span>
                  <span>Haftada 20 ders dil eğitimi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 font-black">✓</span>
                  <span>Günlük sosyal aktiviteler</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 font-black">✓</span>
                  <span>Hafta sonu gezileri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 font-black">✓</span>
                  <span>Güvenli konaklama seçenekleri</span>
                </li>
              </ul>
            </div>

            {/* Akademik Yaz Okulu */}
            <div className="p-6 bg-gray-50 border-4 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Akademik Yaz Okulu</h3>
              <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                Liseden üniversiteye geçiş sürecinde olan öğrenciler için. Dünya üniversite sıralamalarında üst seviyede üniversitelerin bünyesinde akademik dersler.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-black">✓</span>
                  <span>Üniversite kampüsünde eğitim</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-black">✓</span>
                  <span>Akademik dersler ve projeler</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-black">✓</span>
                  <span>Özel hazırlanmış gezi programları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-black">✓</span>
                  <span>Üniversite hazırlık deneyimi</span>
                </li>
              </ul>
            </div>

            {/* Aile & Çocuk */}
            <div className="p-6 bg-gray-50 border-4 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Aile & Çocuk Programları</h3>
              <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                Ebeveynler ve çocuklar birlikte katılabilir. Hem ebeveynler hem de çocuklar için ayrı programlar.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2 font-black">✓</span>
                  <span>Ebeveyn ve çocuk için ayrı sınıflar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2 font-black">✓</span>
                  <span>Birlikte konaklama imkanı</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2 font-black">✓</span>
                  <span>Ortak aktivite programları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2 font-black">✓</span>
                  <span>Güvenli aile ortamı</span>
                </li>
              </ul>
            </div>

            {/* Grup Programları */}
            <div className="p-6 bg-gray-50 border-4 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Grup Programları</h3>
              <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                Danışmanlarımızın önderliğinde organize edilen grup programları. Türk öğrencilerle birlikte güvenli bir deneyim.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-black">✓</span>
                  <span>Profesyonel danışman eşliği</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-black">✓</span>
                  <span>Grup indirimleri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-black">✓</span>
                  <span>Özel aktivite programları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-black">✓</span>
                  <span>7/24 destek hizmeti</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">👶 Yaş Grupları</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border-4 border-gray-900 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🧒</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">5-10 Yaş</h3>
                <p className="text-gray-700 font-medium leading-relaxed mb-4">
                  Küçük yaş grupları için özel programlar. Oyun tabanlı öğrenme ve eğlenceli aktiviteler.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Oyun tabanlı dil öğrenimi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Kısa süreli programlar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Ebeveyn eşliği seçeneği</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white border-4 border-gray-900 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">👦</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">11-14 Yaş</h3>
                <p className="text-gray-700 font-medium leading-relaxed mb-4">
                  Ortaokul öğrencileri için dengeli programlar. Dil eğitimi ve sosyal aktivitelerin birleşimi.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Yapılandırılmış ders programı</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Çeşitli spor aktiviteleri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Grup aktiviteleri</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white border-4 border-gray-900 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">👨</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">15-17 Yaş</h3>
                <p className="text-gray-700 font-medium leading-relaxed mb-4">
                  Lise öğrencileri için akademik odaklı programlar. Üniversite hazırlık ve dil gelişimi.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">•</span>
                    <span>Akademik içerikli programlar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">•</span>
                    <span>Üniversite hazırlık deneyimi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">•</span>
                    <span>Bağımsızlık geliştirme</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-yellow-600 text-white border-4 border-yellow-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📦 Dahil Olan Hizmetler</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Haftada 20 ders dil eğitimi',
              'Ders kitapları ve eğitim materyalleri',
              'Konaklama (seçtiğiniz tipe göre)',
              'Günde 3 öğün yemek',
              'Havaalanı transferleri',
              'Tüm geziler ve aktiviteler',
              'Sağlık ve seyahat sigortası',
              'Vize danışmanlığı',
              'Kurs katılım sertifikası',
              '7/24 gözetim ve destek',
            ].map((item, index) => (
              <div key={index} className="p-4 bg-yellow-50 border-2 border-yellow-200">
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-black">✓</span>
                  <span className="font-bold text-gray-900 text-sm">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">Ülkelere Göre Yaz Okulları</h2>
          <p className="text-lg text-gray-600 font-medium">Size en uygun ülkeyi seçin</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {availableCountries.map((country) => (
            <Link
              key={country.id}
              href={`/yaz-okulu/${country.slug}`}
              className="group p-6 bg-white border-4 border-gray-900 hover:border-orange-600 transition-all duration-200 transform hover:-skew-x-2 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.1)]"
            >
              <div className="transform group-hover:skew-x-2 text-center">
                <div className="text-5xl mb-3">{country.flagEmoji || '🌍'}</div>
                <div className="text-lg font-black text-gray-900 uppercase tracking-wider group-hover:text-orange-600 transition-colors">
                  {country.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            Unutulmaz Bir Yaz Deneyimi İçin Başvurun
          </h2>
          <p className="text-xl text-orange-100 mb-8 font-medium">
            Profesyonel danışmanlarımız size en uygun programı bulmanızda yardımcı olacak
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-5 bg-white text-orange-600 font-black text-lg uppercase tracking-wider border-4 border-orange-800 hover:bg-orange-50 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
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
