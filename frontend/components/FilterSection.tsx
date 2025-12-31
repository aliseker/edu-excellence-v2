'use client';

import UniversityFilter from './UniversityFilter';

const FilterSection = () => {
  const handleFilterChange = (filters: any) => {
    console.log('Filters:', filters);
    // Burada filtreleme mantığı eklenecek
    // Backend API çağrısı yapılacak
  };

  return (
    <section className="bg-white py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-black text-sm uppercase tracking-wider border-4 border-purple-800 transform -skew-x-12 shadow-lg mb-6">
            <span className="transform skew-x-12 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Hızlı Arama
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-tight">
            Size Uygun Programı
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-purple-600 transform -skew-x-12 -z-10 opacity-20"></span>
              <span className="relative text-purple-600">BULUN</span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Filtreleme seçeneklerimizle hayalinizdeki eğitim programını kolayca keşfedin
          </p>
        </div>
        
        <UniversityFilter onFilterChange={handleFilterChange} />
      </div>
    </section>
  );
};

export default FilterSection;
