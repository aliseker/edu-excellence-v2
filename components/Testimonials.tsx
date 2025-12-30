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
    <section className="bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-tight">
            Öğrencilerimizden
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-purple-600 transform -skew-x-12 -z-10 opacity-20"></span>
              <span className="relative text-purple-600">DİNLEYİN</span>
            </span>
          </h2>
          <p className="text-lg text-gray-700 font-medium border-l-4 border-purple-600 pl-6 inline-block">
            Yurtdışı eğitim deneyimlerini paylaşıyorlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 border-4 border-gray-900 hover:border-purple-600 transition-all duration-200 shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[10px_10px_0_0_rgba(147,51,234,0.2)] hover:-translate-x-1 hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-3xl mr-4 border-4 border-gray-900`}>
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-lg uppercase tracking-tight">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 font-bold">{testimonial.program}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed font-medium border-l-4 border-purple-600 pl-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center text-sm pt-4 border-t-2 border-gray-200">
                <div className={`w-3 h-3 bg-gradient-to-br ${testimonial.gradient} mr-3 border-2 border-gray-900`}></div>
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
