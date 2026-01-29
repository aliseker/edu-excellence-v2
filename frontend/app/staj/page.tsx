'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS, BACKEND_BASE_URL } from '@/config/api';
import { slugify } from '@/utils/format';

export default function StajPage() {
  const [countries, setCountries] = useState<Array<{ id: number; name: string; slug: string; flagEmoji?: string; flagImageUrl?: string | null }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [programsRes, countriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.internshipPrograms}`),
          fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`)
        ]);
        const programs = await programsRes.json();
        const allCountries = await countriesRes.json();

        const countryIdsWithPrograms = new Set<number>(
          (programs || []).map((program: any) => program.countryId)
        );

        const availableCountries = (allCountries || [])
          .filter((country: any) => countryIdsWithPrograms.has(country.id))
          .map((country: any) => ({
            id: country.id,
            name: country.name,
            slug: country.slug || slugify(country.name || ''),
            flagEmoji: country.flagEmoji || '🌍',
            flagImageUrl: country.flagImageUrl ?? null,
          }))
          .filter((country: any) => country.slug);

        setCountries(availableCountries);
      } catch (fetchError) {
        console.error('Staj ülkeleri yüklenemedi:', fetchError);
        setError('Ülkeler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">💼 Yurtdışı Staj</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            YURTDIŞINDA STAJ
            <br />
            <span>KARİYERİNİZE DEĞER KATIN</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 font-medium max-w-2xl">
            Yurtdışında profesyonel staj deneyimi kazanın. Uluslararası iş tecrübesi ile kariyerinize yön verin.
          </p>
        </div>
      </section>

      {/* Why Internship Abroad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🌟 Neden Yurtdışında Staj?</h2>
          </div>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              Yurtdışı staj programları, Amerika Birleşik Devletleri ve diğer ülkeler tarafından uluslararası mezun ve profesyonellerin kariyerlerini geliştirme süreçlerinde yurtdışında uluslararası bir iş deneyimi kazanmalarına ve dillerini geliştirmelerine olanak sağlamak amacıyla oluşturulan <strong>kültürel değişim programlarıdır.</strong>
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              Bu programlar sayesinde, uluslararası iş tecrübesi kazanır, profesyonel ağınızı genişletir, yabancı dilinizi geliştirir ve farklı kültürlerle çalışma deneyimi elde edersiniz.
            </p>
          </div>
        </div>

        {/* Program Types */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Program Türleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-violet-50 border-4 border-violet-300">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Internship Programı</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Üniversite öğrencileri ve yeni mezunlar için tasarlanmış staj programı. Mezuniyetinizin üzerinden 12 ay geçmemiş olmalıdır. Mesleki deneyim gerektirmez.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-violet-600 font-black text-xl mr-3">✓</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Süre:</p>
                    <p className="text-gray-700 font-medium">En fazla 12 ay</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-violet-600 font-black text-xl mr-3">✓</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Maaş:</p>
                    <p className="text-gray-700 font-medium">6 ay ve üstü programlarda maaşlı staj imkanı</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-violet-600 font-black text-xl mr-3">✓</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Kimler Katılabilir:</p>
                    <p className="text-gray-700 font-medium">4 yıllık üniversite öğrencileri ve mezunları (mezuniyet üzerinden 12 ay geçmemiş)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-purple-50 border-4 border-purple-300">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-wider">Trainee Programı</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-6">
                Deneyimli profesyoneller için tasarlanmış staj programı. Mezuniyetinizin üzerinden en az 1 yıl geçmiş ve en az 1 yıl iş deneyimine sahip olmalısınız.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Süre:</p>
                    <p className="text-gray-700 font-medium">En fazla 18 ay</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Gereksinim:</p>
                    <p className="text-gray-700 font-medium">En az 1 yıl iş deneyimi (ilgili bölümden mezun değilseniz 5 yıl)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <div>
                    <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">Kimler Katılabilir:</p>
                    <p className="text-gray-700 font-medium">Mezuniyet üzerinden 1+ yıl geçmiş ve iş deneyimi olan adaylar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ Avantajlarımız</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-violet-50 border-4 border-violet-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">İş Yerleştirme</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Uygun staj pozisyonlarını bulmanız ve yerleştirme sürecinizde tam destek.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">CV Hazırlığı</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Etkili ve kabul görecek CV hazırlanması konusunda profesyonel destek.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Konaklama</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Konaklama ayarlama servisi ile staj süresince güvenli ve uygun konaklama.
                </p>
              </div>
            </div>

            <div className="p-6 bg-violet-50 border-4 border-violet-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Vize Desteği</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Vize danışmanlığı ve gerekli belgelerin (DS-2019, DS7002 vb.) hazırlanması.
                </p>
              </div>
            </div>

            <div className="p-6 bg-purple-50 border-4 border-purple-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Sigorta</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Program süresini kapsayacak sağlık ve seyahat sigortası.
                </p>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 border-4 border-indigo-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">7/24 Destek</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Program süresince 7/24 destek hattı ile her zaman yanınızdayız.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Can Apply */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">👥 Kimler Katılabilir?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-violet-50 border-4 border-violet-200">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-violet-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">4 Yıllık üniversite öğrencileri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">4 yıllık üniversite mezunları (mezuniyet üzerinden 12 ay geçmemiş)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">En az 1 yıllık mesleki okul mezunları + 1 yıl iş tecrübesi</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-purple-50 border-4 border-purple-200">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Kendi sektöründe en az 5 yıllık deneyimi olan lise/üniversite mezunları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-black text-xl mr-3">✓</span>
                  <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">Mezuniyet üzerinden 1+ yıl geçmiş + en az 1 yıl iş tecrübesi olan adaylar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Countries */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🌍 Staj Programları Sunan Ülkeler</h2>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">Yükleniyor...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : countries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Henüz staj programı eklenmemiş.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {countries.map((country) => (
              <Link
                key={country.id}
                href={`/staj/${country.slug}`}
                className="group p-6 bg-gradient-to-br from-violet-50 to-purple-50 border-4 border-violet-300 hover:border-violet-600 transition-all duration-200 transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(139,92,246,0.3)]"
              >
                <div className="flex justify-center mb-4 min-h-[3rem] items-center">
                  {country.flagImageUrl ? (
                    <img
                      src={`${BACKEND_BASE_URL}${country.flagImageUrl}`}
                      alt={country.name}
                      className="h-12 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-5xl">{country.flagEmoji || '🌍'}</span>
                  )}
                </div>
                <h3 className="text-xl font-black text-gray-900 text-center uppercase tracking-wider group-hover:text-violet-600 transition-colors">
                  {country.name}
                </h3>
              </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Staj Başvurunuzu Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Yurtdışında staj programları hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-4 bg-white text-violet-600 font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
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
