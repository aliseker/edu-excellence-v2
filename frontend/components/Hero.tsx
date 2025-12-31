'use client';

import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden border-b-4 border-purple-600">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ornekfoto4.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30"></div>
      </div>

      {/* Geometric Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05] z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-10 lg:py-12 z-20">
        <div className="max-w-5xl">
          {/* Content - Animated from right */}
          <div className="space-y-4 sm:space-y-5 animate-slide-in-right">
            {/* Badge - Geometric Style */}
            <div className="inline-flex items-center px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 bg-purple-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border-2 sm:border-4 border-purple-800 transform -skew-x-12 shadow-lg">
              <span className="transform skew-x-12">✨ 2010'dan Beri Güvenilir</span>
            </div>
            
            {/* Title - More Geometric, Bold */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] sm:leading-[0.9] tracking-tight drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] sm:drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
              HAYALİNİZDEKİ
              <br />
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-purple-600 transform -skew-x-12 -z-10 opacity-80"></span>
                <span className="relative text-purple-300">EĞİTİMİ</span>
              </span>
              <br />
              <span className="text-white">BULUN</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-2xl font-medium border-l-2 sm:border-l-4 border-purple-400 pl-3 sm:pl-5 drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)] sm:drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              Dünyanın dört bir yanındaki en iyi üniversiteler ve dil okulları ile 
              kariyerinize yön verin. Profesyonel danışmanlık hizmetimizle yanınızdayız.
            </p>

            {/* Buttons - Geometric, Bold Style */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/universite"
                className="group relative px-6 sm:px-8 lg:px-9 py-3 sm:py-4 bg-purple-600 text-white font-black text-sm sm:text-base uppercase tracking-wider border-2 sm:border-4 border-purple-800 hover:bg-purple-700 hover:border-purple-900 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] sm:shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] sm:hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 flex items-center justify-center"
              >
                <span>Üniversite Keşfet</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/basvuru"
                className="px-6 sm:px-8 lg:px-9 py-3 sm:py-4 bg-white text-purple-600 font-black text-sm sm:text-base uppercase tracking-wider border-2 sm:border-4 border-purple-600 hover:bg-purple-50 transition-all duration-200 shadow-[4px_4px_0_0_rgba(147,51,234,0.3)] sm:shadow-[8px_8px_0_0_rgba(147,51,234,0.3)] hover:shadow-[2px_2px_0_0_rgba(147,51,234,0.3)] sm:hover:shadow-[4px_4px_0_0_rgba(147,51,234,0.3)] hover:translate-x-1 hover:translate-y-1 text-center"
              >
                Hemen Başvur
              </Link>
            </div>

            {/* Trust Indicators - Geometric Boxes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 pt-4 sm:pt-5">
              <div className="bg-purple-600 text-white p-3 sm:p-4 lg:p-5 border-2 sm:border-4 border-purple-800 shadow-lg transform -skew-x-3">
                <div className="transform skew-x-3">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black mb-0.5 sm:mb-1">15+</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-tight">Yıllık Deneyim</div>
                </div>
              </div>
              <div className="bg-violet-600 text-white p-3 sm:p-4 lg:p-5 border-2 sm:border-4 border-violet-800 shadow-lg transform -skew-x-3">
                <div className="transform skew-x-3">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black mb-0.5 sm:mb-1">300+</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-tight">Anlaşmalı Okul</div>
                </div>
              </div>
              <div className="bg-pink-600 text-white p-3 sm:p-4 lg:p-5 border-2 sm:border-4 border-pink-800 shadow-lg transform -skew-x-3">
                <div className="transform skew-x-3">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black mb-0.5 sm:mb-1">30+</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-tight">Ülke</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
