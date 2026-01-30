'use client';

import { useState, useEffect } from 'react';
import apiService from '@/services/api';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  description: string;
  universityName: string;
}

const gradients = [
  'from-purple-500 to-violet-600',
  'from-violet-500 to-pink-600',
  'from-pink-500 to-rose-600',
  'from-blue-500 to-indigo-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-red-600'
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return 'EE';
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getActiveTestimonials();
      setTestimonials(data as Testimonial[]);
    } catch (error) {
      console.error('Görüşler yüklenirken hata oluştu:', error);
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 uppercase tracking-tight leading-tight px-2">
            Öğrencilerimizden
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-purple-600 transform -skew-x-12 -z-10 opacity-20"></span>
              <span className="relative text-purple-600">DİNLEYİN</span>
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium border-l-2 sm:border-l-4 border-purple-600 pl-3 sm:pl-4 lg:pl-6 inline-block px-2">
            Yurtdışı eğitim deneyimlerini paylaşıyorlar
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600 font-semibold">Yükleniyor...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-gray-600 font-semibold">Henüz görüş eklenmemiş</p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {currentTestimonials.map((testimonial, index) => {
                  const globalIndex = startIndex + index;
                  const gradient = gradients[globalIndex % gradients.length];
                  const initials = getInitials(testimonial.name);
                  return (
                    <div
                      key={testimonial.id}
                      className="bg-white p-5 sm:p-6 lg:p-8 border-2 sm:border-4 border-gray-900 hover:border-purple-600 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] sm:shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0_0_rgba(147,51,234,0.2)] sm:hover:shadow-[10px_10px_0_0_rgba(147,51,234,0.2)] hover:-translate-x-1 hover:-translate-y-1"
                    >
                      <div className="flex items-center mb-4 sm:mb-5 lg:mb-6">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${gradient} flex items-center justify-center text-sm sm:text-base lg:text-lg font-black text-white mr-3 sm:mr-4 border-2 sm:border-4 border-gray-900`}>
                          {initials}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 text-base sm:text-lg uppercase tracking-tight">{testimonial.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 font-bold">{testimonial.title}</p>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5 lg:mb-6 leading-relaxed font-medium border-l-2 sm:border-l-4 border-purple-600 pl-3 sm:pl-4">
                        "{testimonial.description}"
                      </p>
                      <div className="flex items-center text-xs sm:text-sm pt-3 sm:pt-4 border-t-2 border-gray-200">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br ${gradient} mr-2 sm:mr-3 border-2 border-gray-900`}></div>
                        <span className="text-purple-600 font-black uppercase tracking-wide">{testimonial.universityName}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-10 lg:mt-12 flex items-center justify-center gap-6">
                {/* Previous Button */}
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 0}
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                    currentPage === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700'
                  }`}
                  aria-label="Önceki sayfa"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Indicators */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentPage === index
                          ? 'bg-purple-600 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Sayfa ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages - 1}
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                    currentPage === totalPages - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700'
                  }`}
                  aria-label="Sonraki sayfa"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
