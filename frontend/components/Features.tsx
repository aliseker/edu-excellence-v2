const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'En İyi Fiyat Garantisi',
      description: 'Tüm yurtdışı eğitim programları için size en iyi fiyatları sunacağımızı garanti ediyoruz.',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Ücretsiz Danışmanlık',
      description: 'Temsilcisi olduğumuz tüm okullar için ücretsiz danışmanlık hizmeti sunuyoruz.',
      gradient: 'from-violet-500 to-pink-600'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Uzman Ekip',
      description: '80+ deneyimli danışmanımız ile size en uygun programı bulmanızda yardımcı oluyoruz.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '30+ Ülke',
      description: 'Dünyanın dört bir yanında prestijli okul ve üniversitelerle anlaşmalıyız.',
      gradient: 'from-fuchsia-500 to-purple-600'
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-tight">
            Neden
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-purple-600 transform -skew-x-12 -z-10 opacity-20"></span>
              <span className="relative text-purple-600">EDU-EXCELLENCE?</span>
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium border-l-4 border-purple-600 pl-6 inline-block">
            Yurtdışı eğitim yolculuğunuzda yanınızdayız
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 border-4 border-gray-900 hover:border-purple-600 transition-all duration-200 shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[10px_10px_0_0_rgba(147,51,234,0.2)] hover:-translate-x-1 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 border-4 border-gray-900 group-hover:rotate-6 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                {feature.description}
              </p>
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
