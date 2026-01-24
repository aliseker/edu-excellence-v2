'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use } from 'react';
import { apiService } from '@/services/api';

type VisaType = {
  name: string;
  description: string;
  processingTime: string;
  requirements: string[];
};

type CountryData = {
  id: number;
  countryName: string;
  countrySlug: string;
  flag: string;
  generalInfo: string;
  status: string;
  visaTypes: VisaType[];
  process: string[];
  documents: string[];
  importantNotes: string[];
};

const getCountryEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function CountryVizePage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = use(params);
  const [data, setData] = useState<CountryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadCountryData();
  }, [country]);

  const loadCountryData = async () => {
    try {
      setIsLoading(true);
      const allCountries = await apiService.getVisaServices();
      const countryData = (allCountries as CountryData[]).find(
        (c) => c.countrySlug.toLowerCase() === country.toLowerCase()
      );
      
      if (countryData) {
        setData(countryData);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Vize verisi yüklenirken hata oluştu:', error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Yükleniyor...</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ülke Bulunamadı</h1>
            <Link href="/vize" className="text-red-600 hover:text-red-800 font-semibold">
              Vize sayfasına dön
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="relative bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">{getCountryEmoji(data.flag)} {data.countryName} Vizesi</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.countryName.toUpperCase()}
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">VİZE DANİŞMANLIĞI</span>
            </span>
          </h1>
        </div>
      </section>

      {/* General Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">ℹ️ Genel Bilgiler</h2>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            {data.generalInfo}
          </p>
        </div>

        {/* Visa Types */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📋 Vize Türleri</h2>
          </div>
          
          <div className="space-y-6">
            {data.visaTypes.map((visaType, index) => (
              <div key={index} className="p-6 bg-pink-50 border-4 border-pink-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-wider">{visaType.name}</h3>
                    <p className="text-gray-700 font-medium text-lg">{visaType.description}</p>
                  </div>
                  <div className="px-4 py-2 bg-pink-600 text-white border-4 border-pink-800">
                    <p className="text-sm font-black uppercase tracking-wider">⏱️ {visaType.processingTime}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-wider">Gereksinimler:</h4>
                  <ul className="space-y-2">
                    {visaType.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-pink-600 font-black text-xl mr-3">✓</span>
                        <span className="text-gray-800 font-medium">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-rose-600 text-white border-4 border-rose-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🔄 Başvuru Süreci</h2>
          </div>
          
          <div className="space-y-4">
            {data.process.map((step, index) => (
              <div key={index} className="flex items-start p-6 bg-rose-50 border-4 border-rose-200">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 border-4 border-rose-800 font-black text-lg">
                  {index + 1}
                </div>
                <p className="text-gray-800 font-bold text-lg flex-1 pt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10 mb-12">
          <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-8">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📄 Gerekli Belgeler</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.documents.map((doc, index) => (
              <div key={index} className="p-4 bg-red-50 border-4 border-red-200">
                <p className="text-gray-800 font-bold text-sm uppercase tracking-wide">{doc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        {data.importantNotes && data.importantNotes.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-400 shadow-[8px_8px_0_0_rgba(234,179,8,0.3)] p-8 md:p-10 mb-12">
            <div className="inline-block px-5 py-2.5 bg-yellow-600 text-white border-4 border-yellow-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">⚠️ Önemli Notlar</h2>
            </div>
            
            <ul className="space-y-4">
              {data.importantNotes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-600 font-black text-2xl mr-4">⚠</span>
                  <p className="text-gray-800 font-bold text-lg flex-1">{note}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-10 md:p-12 text-white text-center">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-2xl font-black uppercase tracking-wider">🚀 Vize Başvurunuzu Yapın</h2>
          </div>
          <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
            {data.countryName} vizesi hakkında detaylı bilgi almak ve başvuru sürecinizi başlatmak için bizimle iletişime geçin!
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
