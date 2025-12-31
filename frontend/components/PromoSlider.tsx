'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PromoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Yurtdışında Burslu Eğitim Fırsatlarını Kaçırmayın!',
      description: 'Amerika, İngiltere ve Avrupa\'da lisans ve yüksek lisans programlarına özel burs imkanlarıyla hemen başvuru yapın. Akademik başarılarınız ve yetenekleriniz doğrultusunda size en uygun burs programlarını bulmanızda yardımcı oluyoruz. Eğitim hayatınızı finansal kaygılar olmadan sürdürün.',
      countryCode: 'us',
      country: 'Amerika',
      href: '/basvuru',
      bgImage: '/images/ornekfoto1.jpg',
      bgGradient: 'from-purple-600/40 via-violet-600/40 to-pink-600/40',
    },
    {
      title: 'İngiltere\'nin En Prestijli Üniversitelerinde Eğitim Alın',
      description: 'Oxford, Cambridge ve diğer dünya çapında tanınmış İngiliz üniversitelerinde eğitim alma fırsatı. IELTS hazırlık desteği, başvuru süreçleri ve vize danışmanlığı ile yanınızdayız. Kariyerinize yön verecek bir eğitim deneyimi için hemen başvurun.',
      countryCode: 'gb',
      country: 'İngiltere',
      href: '/universite?country=ingiltere',
      bgImage: '/images/ornekfoto2.jpg',
      bgGradient: 'from-blue-600/40 via-indigo-600/40 to-purple-600/40',
    },
    {
      title: 'Kanada\'da Göçmenlik Fırsatları ile Eğitim',
      description: 'Kanada\'nın kaliteli eğitim sistemi ve mezuniyet sonrası göçmenlik fırsatları ile geleceğinize yatırım yapın. Toronto, Vancouver ve Montreal\'deki prestijli üniversitelerde eğitim alın. Post-Graduation Work Permit (PGWP) ile mezuniyet sonrası çalışma ve kalıcı oturum izni fırsatları.',
      countryCode: 'ca',
      country: 'Kanada',
      href: '/universite?country=kanada',
      bgImage: '/images/ornekfoto3.jpg',
      bgGradient: 'from-red-600/40 via-rose-600/40 to-pink-600/40',
    },
    {
      title: 'Avustralya\'da Yüksek Yaşam Kalitesi ile Eğitim',
      description: 'Avustralya\'nın dünya standartlarındaki üniversitelerinde eğitim alın. Yüksek yaşam kalitesi, güvenli ortam ve mezuniyet sonrası iş fırsatları ile kariyerinize yön verin. Sydney, Melbourne ve Brisbane\'deki üniversitelerde eğitim alma şansını yakalayın.',
      countryCode: 'au',
      country: 'Avustralya',
      href: '/universite?country=avustralya',
      bgImage: '/images/ornekfoto4.jpg',
      bgGradient: 'from-violet-600/40 via-purple-600/40 to-pink-600/40',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.bgImage}
              alt={slide.country}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
          
          {/* Gradient Overlay - Daha hafif */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-5 md:p-6 lg:p-8 text-white">
            {/* Content Container - Okların altına gelmemesi için padding */}
            <div className="flex-1 flex flex-col pl-12 md:pl-14 lg:pl-16 pr-12 md:pr-14 lg:pr-16">
              {/* Top Section: Title and Flag side by side */}
              <div className="flex items-start justify-between gap-4 mb-4 flex-shrink-0">
                {/* Title - Left side */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
                    {slide.title}
                  </h3>
                </div>
                
                {/* Flag - Right side */}
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden shadow-lg border-2 border-white/30">
                    <Image
                      src={`https://flagcdn.com/w320/${slide.countryCode}.png`}
                      alt={slide.country}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Content Text - Bottom section */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <p className="text-sm md:text-base lg:text-lg opacity-95 leading-relaxed">
                  {slide.description}
                </p>
              </div>
              
              {/* CTA Button - Fixed at bottom */}
              <div className="flex-shrink-0 mt-4">
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-white text-gray-800 font-bold px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-fit text-xs md:text-sm"
                >
                  <span>Detaylı bilgi için tıklayın</span>
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 h-2 bg-white rounded-full'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75 rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-2.5 rounded-full transition-all duration-200 z-20 shadow-lg hover:shadow-xl"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-2.5 rounded-full transition-all duration-200 z-20 shadow-lg hover:shadow-xl"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default PromoSlider;
