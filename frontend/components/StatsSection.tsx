const StatsSection = () => {
  const stats = [
    {
      number: '2010',
      label: "'dan beri",
      icon: '📅',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50'
    },
    {
      number: '15+',
      label: 'Yıllık Deneyim',
      icon: '⭐',
      color: 'from-violet-500 to-pink-600',
      bgColor: 'bg-violet-50'
    },
    {
      number: '300+',
      label: 'Anlaşmalı Okul',
      icon: '🏫',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50'
    },
    {
      number: '30+',
      label: 'Ülke',
      icon: '🌍',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50'
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight leading-tight">
            Rakamlarla
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-purple-400 transform -skew-x-12 -z-10 opacity-30"></span>
              <span className="relative text-purple-300">EDU-EXCELLENCE</span>
            </span>
          </h2>
          <p className="text-xl text-gray-300 font-medium border-l-4 border-purple-400 pl-6 inline-block">
            15+ yıllık deneyimimizle binlerce öğrencinin hayalini gerçekleştirdik
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} p-8 text-center border-4 border-gray-900 hover:border-purple-600 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0_0_rgba(147,51,234,0.2)] hover:-translate-x-1 hover:-translate-y-1`}
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-800 font-black uppercase tracking-wide text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
