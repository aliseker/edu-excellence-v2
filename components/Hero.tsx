'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Yurtdışında Eğitim Fırsatlarını
            <span className="block text-yellow-400 mt-2">Keşfedin</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            30'dan fazla ülkede en prestijli dil okulları ve üniversiteler ile çalışıyor, 
            öğrencilerimizin hayallerini gerçekleştirmelerine yardımcı oluyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/universite"
              className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              2025 Yurtdışı Üniversite Fiyatları
            </Link>
            <Link
              href="/dil-okulu"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-200 border-2 border-white/30"
            >
              Güncel Dil Okulu Promosyonları
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

