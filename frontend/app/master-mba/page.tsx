'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiService } from '@/services/api';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export default function MasterMBAPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [countriesRes, fetchedPrograms] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`),
          apiService.getMasterPrograms(),
        ]);
        const fetchedCountries = await countriesRes.json();
        setCountries(fetchedCountries);
        setPrograms(fetchedPrograms);
      } catch (fetchError) {
        console.error('Master/MBA verileri yüklenemedi:', fetchError);
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const availableCountries = useMemo(() => {
    if (!programs.length) {
      return countries;
    }
    const countryIds = new Set(programs.map((program: any) => program.countryId));
    return countries.filter((country: any) => countryIds.has(country.id));
  }, [countries, programs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🎓 Master / MBA</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            NEDEN YURTDIŞINDA
            <br />
            <span>MASTER / MBA?</span>
          </h1>
        </div>
      </section>

      {/* Why Master/MBA Abroad Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-12 mb-12">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">✨ Neden Yurtdışında Master / MBA?</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">
              Yurtdışında yüksek lisans eğitimi, farklı kültürlerdeki akademik programlarda kendinizi geliştirmenizi sağlar. Birçok ülke, özellikle İngilizce konuşulan bölgeler, öğrencilere yüksek kaliteli eğitim ve uluslararası iş imkanları sunmaktadır.
            </p>
            
            <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">
              Yüksek lisans programları, öğrencilerin derinlemesine bilgi sahibi olmalarını sağlayacak araştırma fırsatları ve uygulamalı projelerle zenginleştirilmiştir. Başvuru süreçleri genellikle üniversitenin belirlediği akademik gereksinimlere ve dil yeterlilik sınavlarına dayanır.
            </p>

            <p className="text-gray-800 text-lg leading-relaxed mb-8 font-medium">
              <strong>Yurtdışında master ve MBA okumak</strong> sadece okula gidip eğitim almak olarak algılanmamalı, çok daha geniş bakış açısıyla ele alınmalıdır. Bu tarz eğitimler için yurtdışını tercih etmek her şeyden önce çalıştığınız alan ile ilgili tüm detayları başka bir dilde ve kültürde en ince ayrıntısına kadar öğrenmek demektir. Birçok farklı beynin birçok farklı ülkenin kültürünü, düşünme şeklini, mantığını ve iş dünyasındaki stratejilerini ayağınıza kadar getirmesi ve aynı dilde buluşturmasıdır. Bu; dünya üzerindeki pek çok ülkeyi tek bir odada toplamak gibi bir şeydir.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-4 border-purple-200 p-6 transform hover:-skew-x-1 transition-all duration-200">
            <div className="transform skew-x-1">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Global Perspektif</h3>
              <p className="text-gray-700 font-medium">Farklı kültürler ve sistemlerle tanışarak global bir perspektif kazanın. Dünya çapında bağlantılar kurun.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-4 border-blue-200 p-6 transform hover:-skew-x-1 transition-all duration-200">
            <div className="transform skew-x-1">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Kariyer Avantajı</h3>
              <p className="text-gray-700 font-medium">Binlerce kişiden bir adım öne geçin. Aranan kişi olun ve iş dünyasında fark yaratın.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-4 border-pink-200 p-6 transform hover:-skew-x-1 transition-all duration-200">
            <div className="transform skew-x-1">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Pratik Deneyim</h3>
              <p className="text-gray-700 font-medium">Araştırma fırsatları ve uygulamalı projelerle teorik bilgiyi pratik becerilerle birleştirin.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-200 p-6 transform hover:-skew-x-1 transition-all duration-200">
            <div className="transform skew-x-1">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Uluslararası İş İmkanları</h3>
              <p className="text-gray-700 font-medium">Program bitimini takip eden 1-2 yıl boyunca bulunduğunuz ülkede çalışma hakkı kazanın.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-4 border-yellow-200 p-6 transform hover:-skew-x-1 transition-all duration-200">
            <div className="transform skew-x-1">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Çeşitli Program Seçenekleri</h3>
              <p className="text-gray-700 font-medium">Hemen her alanda master ve MBA programları mevcuttur. Size en uygun programı bulun.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-4 border-indigo-200 p-6 transform hover:-skew-x-1 transition-all duration-200">
            <div className="transform skew-x-1">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Uygun Fiyat Seçenekleri</h3>
              <p className="text-gray-700 font-medium">Almanya'da ücretsiz, Avusturya'da düşük ücretli programlar. Her bütçeye uygun seçenekler.</p>
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-12 mb-12">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">📋 Başvuru Şartları</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 font-black text-xl">✓</span>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Lisans Not Ortalaması (GPA)</h4>
                  <p className="text-gray-700 font-medium">Alınmış olunan not ortalaması ve ders içeriklerinin programa uygunluğu</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 font-black text-xl">✓</span>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Dil Yeterliliği</h4>
                  <p className="text-gray-700 font-medium">TOEFL ve IELTS sınav sonuçları (okul tarafından belirtilen minimum seviye)</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 font-black text-xl">✓</span>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">GMAT / GRE</h4>
                  <p className="text-gray-700 font-medium">Bölümlerin içeriklerine göre alınacak GMAT ve GRE sınav sonuçları</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 font-black text-xl">✓</span>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">İş Tecrübesi</h4>
                  <p className="text-gray-700 font-medium">Kazanılmış başarılar ve iş tecrübesi (özellikle MBA için önemli)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 font-black text-xl">✓</span>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Belgeler</h4>
                  <p className="text-gray-700 font-medium">Referans mektubu, niyet mektubu, özgeçmiş ve akademik transkriptler</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 font-black text-xl">✓</span>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Sponsor Desteği</h4>
                  <p className="text-gray-700 font-medium">Eğitim maliyetini karşılayacak sponsor desteği ve finansal belgeler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
          <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🌍 ÜLKELER</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Yükleniyor...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : availableCountries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="font-semibold">Henüz program eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {availableCountries.map((country: any) => (
              <Link
                key={country.id}
                href={`/master-mba/${country.slug}`}
                className="group relative bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] p-6 transform hover:-skew-x-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] transition-all duration-200"
              >
                <div className="transform group-hover:skew-x-1">
                  <div className="text-4xl mb-3">{country.flagEmoji || '🌍'}</div>
                  <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">{country.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Hemen Başvuru Yapın</h2>
          <p className="text-xl text-purple-100 mb-8 font-medium max-w-2xl mx-auto">
            Edu-Excellence olarak tüm öğrencilerimize ücretsiz danışmanlık hizmeti sunuyoruz. Başvurularınızdan kalacak yer ayarlamanıza kadar tüm işlemleriniz bizim tarafımızdan ücretsiz yapılmaktadır.
          </p>
          <Link
            href="/basvuru"
            className="inline-block px-10 py-5 bg-white text-purple-600 font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-purple-50 transition-all duration-200 transform hover:-skew-x-1"
          >
            <span className="transform skew-x-1 block">BAŞVURU YAP</span>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
