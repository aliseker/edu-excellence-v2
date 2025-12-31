import ProgramCard from './ProgramCard';

const ProgramsSection = () => {
  const programs = [
    {
      id: 1,
      title: 'Dil Okulu',
      description: '30+ ülkede en prestijli dil okulları ile çalışıyoruz',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      href: '/dil-okulu',
      gradient: 'from-purple-500 to-violet-600',
      count: 150,
    },
    {
      id: 2,
      title: 'Yaz Okulu',
      description: 'Çocuklarınız için unutulmaz bir yaz deneyimi',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      href: '/yaz-okulu',
      gradient: 'from-orange-500 to-red-600',
      count: 50,
    },
    {
      id: 3,
      title: 'Lise',
      description: 'Geleceğinize en iyi yatırımı yapın',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: '/lise',
      gradient: 'from-violet-500 to-purple-600',
      count: 80,
    },
    {
      id: 4,
      title: 'Üniversite',
      description: 'Dünyanın en prestijli üniversitelerini keşfedin',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      href: '/universite',
      gradient: 'from-pink-500 to-rose-600',
      count: 200,
    },
    {
      id: 5,
      title: 'Master / MBA',
      description: 'Kariyerinize yön verecek prestijli programlar',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/master-mba',
      gradient: 'from-indigo-500 to-purple-600',
      count: 120,
    },
    {
      id: 6,
      title: 'Vize',
      description: 'Profesyonel vize başvuru desteği',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      href: '/vize',
      gradient: 'from-red-500 to-pink-600',
      count: 30,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-purple-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 uppercase tracking-tight leading-tight px-2">
            Eğitim
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-purple-600 transform -skew-x-12 -z-10 opacity-20"></span>
              <span className="relative text-purple-600">PROGRAMLARIMIZ</span>
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto font-medium border-l-2 sm:border-l-4 border-purple-600 pl-3 sm:pl-4 lg:pl-6 inline-block px-2">
            Yurtdışı eğitim yolculuğunuzda size rehberlik edecek tüm programlar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
