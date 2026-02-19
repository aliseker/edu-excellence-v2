'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { apiService } from '@/services/api';
import { API_BASE_URL, API_ENDPOINTS, BACKEND_BASE_URL } from '@/config/api';

type VisaCountry = {
  id: number;
  countrySlug: string;
  countryName: string;
  flag: string;
  status: string;
};

type CountryWithFlag = VisaCountry & { flagImageUrl?: string | null };

const getCountryEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function VizePage() {
  const [countries, setCountries] = useState<CountryWithFlag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setIsLoading(true);
      const [visaData, countriesRes] = await Promise.all([
        apiService.getVisaServices(),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`),
      ]);
      const visaCountries = (visaData as VisaCountry[]).filter(c => c.status === 'active');
      const countriesList: Array<{ slug: string; flagImageUrl?: string | null }> = await countriesRes.json();
      const slugToFlag = new Map(countriesList.map(c => [c.slug, c.flagImageUrl ?? null]));

      const withFlags: CountryWithFlag[] = visaCountries.map(v => ({
        ...v,
        flagImageUrl: slugToFlag.get(v.countrySlug.toLowerCase()) ?? slugToFlag.get(v.countrySlug) ?? null,
      }));
      setCountries(withFlags);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">✈️ Vize Danışmanlığı</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            PROFESYONEL VİZE
            <br />
            <span>DANİŞMANLIĞI</span>
          </h1>
          <p className="text-lg md:text-xl text-pink-100 font-medium max-w-2xl">
            Vize başvuru süreçlerinizde yanınızdayız. Uzman ekibimizle başvurularınızı eksiksiz ve doğru şekilde hazırlıyoruz.
          </p>
        </div>
      </section>

      {/* Why Visa Consultation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📋 Neden Vize Danışmanlığı?</h2>
          </div>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              Vize başvuru işlemleri, <strong>%100 özen gerektiren, telafisi kolay olmayan hassas bir süreçtir.</strong> Vize başvurularında red kararlarının nedenleri çoğunlukla; eksik ya da yanlış evrak hazırlamak, vize mülakatlarında sorulara istenen cevapları verememek gibi nedenlerden kaynaklanmaktadır.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
              Vize başvuruları ciddi bir ön hazırlık gerektirir. Konsolosluklar sıklıkla vize işlemleri ile ilgili prosedürlerini değiştirmekle birlikte, hemen her yıl yeni uygulamalar getirmektedir. Pasaportunuzdaki bir vize reddi damgası size geri dönüşü olmayan şeylere mal olabilir ve bundan geri dönmek parayla bile mümkün olmayabilir.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              <strong>Hüsrana uğramamak için profesyonel bir yardım almak size büyük avantajlar sağlayacaktır.</strong> Tüm riskleri en aza indirmek ve olabilecek her şeyi lehinize çevirmek için Edu-Excellence olarak hizmetinizdeyiz.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⭐ Avantajlarımız</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-red-50 border-4 border-red-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Doğru Evrak Hazırlığı</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Eksiksiz ve doğru belgelerin hazırlanması konusunda uzman desteği. Her ülkenin özel gereksinimlerine göre dosyanızı hazırlıyoruz.
                </p>
              </div>
            </div>

            <div className="p-6 bg-pink-50 border-4 border-pink-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Mülakat Hazırlığı</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Vize mülakatlarına hazırlık ve pratik. Konsolosluk mülakatlarında başarılı olmanız için kapsamlı hazırlık desteği.
                </p>
              </div>
            </div>

            <div className="p-6 bg-rose-50 border-4 border-rose-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Form Doldurma</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  DS-160, online vize formları ve diğer tüm başvuru formlarının doğru ve eksiksiz doldurulması.
                </p>
              </div>
            </div>

            <div className="p-6 bg-red-50 border-4 border-red-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">⏱️</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Zaman Tasarrufu</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Süreçleri takip ediyor, randevu alıyor ve işlemlerinizi hızlandırıyoruz. Zamanınızı verimli kullanın.
                </p>
              </div>
            </div>

            <div className="p-6 bg-pink-50 border-4 border-pink-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Güvenilirlik</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Yılların deneyimi ve başarılı başvuru geçmişimiz. Vize reddi riskini minimuma indiriyoruz.
                </p>
              </div>
            </div>

            <div className="p-6 bg-rose-50 border-4 border-rose-200 transform hover:-skew-x-2 transition-all duration-200">
              <div className="transform skew-x-2">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Özel Danışmanlık</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Her ülkenin vize sistemi farklıdır. Size özel strateji geliştiriyor, bireysel danışmanlık sunuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-rose-600 text-white border-4 border-rose-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🔄 Vize Başvuru Süreci</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-red-100 to-pink-100 border-4 border-red-300 text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border-4 border-red-800">
                1
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">İlk Görüşme</h3>
              <p className="text-gray-700 font-medium text-sm">
                Vize amacınız ve durumunuz hakkında detaylı görüşme
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-pink-100 to-rose-100 border-4 border-pink-300 text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border-4 border-pink-800">
                2
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Belge Hazırlığı</h3>
              <p className="text-gray-700 font-medium text-sm">
                Gerekli evrakların listesi ve hazırlık süreci
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-rose-100 to-red-100 border-4 border-rose-300 text-center">
              <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border-4 border-rose-800">
                3
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Başvuru</h3>
              <p className="text-gray-700 font-medium text-sm">
                Form doldurma, randevu alma ve başvuru teslimi
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-red-100 to-pink-100 border-4 border-red-300 text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black border-4 border-red-800">
                4
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Takip</h3>
              <p className="text-gray-700 font-medium text-sm">
                Başvurunuzun takibi ve sonuçlandırılması
              </p>
            </div>
          </div>
        </div>

        {/* Countries */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🌍 Vize Danışmanlığı Sunan Ülkeler</h2>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-xl font-semibold text-gray-700">Ülkeler yükleniyor...</p>
            </div>
          ) : countries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌍</div>
              <p className="text-xl font-semibold text-gray-700">Henüz ülke eklenmemiş</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {countries.map((country) => (
                <Link
                  key={country.countrySlug}
                  href={`/vize/${country.countrySlug}`}
                  className="group p-6 bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-300 hover:border-red-600 transition-all duration-200 transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(220,38,38,0.3)]"
                >
                  <div className="flex justify-center mb-4 min-h-[3rem] items-center">
                    {country.flagImageUrl ? (
                      <img
                        src={`${BACKEND_BASE_URL}${country.flagImageUrl}`}
                        alt={country.countryName}
                        className="h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-5xl">{getCountryEmoji(country.flag)}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 text-center uppercase tracking-wider group-hover:text-red-600 transition-colors">
                    {country.countryName}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Vize Başvurunuzu Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            Vize danışmanlığı hizmetimiz hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
          </p>
          <Link
            href="/iletisim"
            className="inline-block px-10 py-4 bg-white text-red-600 font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
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
