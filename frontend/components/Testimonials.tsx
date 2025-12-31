const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ayşe Yılmaz',
      program: 'Kanada Üniversite',
      university: 'University of Toronto',
      image: '👩',
      text: 'Edu-Excellence sayesinde hayalimdeki üniversiteye kabul aldım. Danışmanlarım çok yardımcı oldu, her adımda yanımdaydılar.',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      name: 'Mehmet Demir',
      program: 'İngiltere Master',
      university: 'London Business School',
      image: '👨',
      text: 'MBA programı için başvuru sürecimde profesyonel destek aldım. Vize işlemlerinden başvuru sürecine kadar her şey sorunsuz ilerledi.',
      gradient: 'from-violet-500 to-pink-600'
    },
    {
      name: 'Zeynep Kaya',
      program: 'Amerika Dil Okulu',
      university: 'EC English New York',
      image: '👩',
      text: 'New York\'ta dil okuluna gittim ve harika bir deneyim yaşadım. Fiyat garantisi sayesinde en uygun fiyatı buldum.',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-5 sm:p-6 lg:p-8 border-2 sm:border-4 border-gray-900 hover:border-purple-600 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] sm:shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0_0_rgba(147,51,234,0.2)] sm:hover:shadow-[10px_10px_0_0_rgba(147,51,234,0.2)] hover:-translate-x-1 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4 sm:mb-5 lg:mb-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-2xl sm:text-3xl mr-3 sm:mr-4 border-2 sm:border-4 border-gray-900`}>
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg uppercase tracking-tight">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">{testimonial.program}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5 lg:mb-6 leading-relaxed font-medium border-l-2 sm:border-l-4 border-purple-600 pl-3 sm:pl-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center text-xs sm:text-sm pt-3 sm:pt-4 border-t-2 border-gray-200">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br ${testimonial.gradient} mr-2 sm:mr-3 border-2 border-gray-900`}></div>
                <span className="text-purple-600 font-black uppercase tracking-wide">{testimonial.university}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
