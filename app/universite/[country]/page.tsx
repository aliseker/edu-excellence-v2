import Navbar from '@/components/Navbar';
import UniversityFilter from '@/components/UniversityFilter';

interface PageProps {
  params: {
    country: string;
  };
}

// Şimdilik statik üniversite verileri
const universitiesData: Record<string, any[]> = {
  kanada: [
    { id: 1, name: 'University of Toronto', city: 'Toronto', language: 'İngilizce', ranking: 'QS: 21' },
    { id: 2, name: 'McGill University', city: 'Montreal', language: 'İngilizce', ranking: 'QS: 30' },
    { id: 3, name: 'University of British Columbia', city: 'Vancouver', language: 'İngilizce', ranking: 'QS: 34' },
    { id: 4, name: 'University of Alberta', city: 'Edmonton', language: 'İngilizce', ranking: 'QS: 111' },
    { id: 5, name: 'McMaster University', city: 'Hamilton', language: 'İngilizce', ranking: 'QS: 189' },
  ],
  ingiltere: [
    { id: 1, name: 'University of Oxford', city: 'Oxford', language: 'İngilizce', ranking: 'QS: 3' },
    { id: 2, name: 'University of Cambridge', city: 'Cambridge', language: 'İngilizce', ranking: 'QS: 2' },
    { id: 3, name: 'Imperial College London', city: 'Londra', language: 'İngilizce', ranking: 'QS: 6' },
    { id: 4, name: 'UCL', city: 'Londra', language: 'İngilizce', ranking: 'QS: 9' },
    { id: 5, name: 'London School of Economics', city: 'Londra', language: 'İngilizce', ranking: 'QS: 45' },
  ],
  amerika: [
    { id: 1, name: 'Harvard University', city: 'Cambridge, MA', language: 'İngilizce', ranking: 'QS: 4' },
    { id: 2, name: 'MIT', city: 'Cambridge, MA', language: 'İngilizce', ranking: 'QS: 1' },
    { id: 3, name: 'Stanford University', city: 'Stanford, CA', language: 'İngilizce', ranking: 'QS: 5' },
    { id: 4, name: 'Yale University', city: 'New Haven, CT', language: 'İngilizce', ranking: 'QS: 16' },
    { id: 5, name: 'Princeton University', city: 'Princeton, NJ', language: 'İngilizce', ranking: 'QS: 17' },
  ],
};

const countryNames: Record<string, string> = {
  kanada: 'Kanada',
  ingiltere: 'İngiltere',
  amerika: 'Amerika',
  almanya: 'Almanya',
  italya: 'İtalya',
  fransa: 'Fransa',
  avustralya: 'Avustralya',
  irlanda: 'İrlanda',
};

export default function CountryUniversitiesPage({ params }: PageProps) {
  const countrySlug = params.country.toLowerCase();
  const countryName = countryNames[countrySlug] || countrySlug;
  const universities = universitiesData[countrySlug] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {countryName} Üniversiteleri
          </h1>
          <p className="text-xl text-blue-100">
            {countryName}'deki en prestijli üniversiteleri keşfedin
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UniversityFilter onFilterChange={(filters) => {
          console.log('Filters:', filters);
        }} />
      </section>

      {/* Universities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {universities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <div
                key={uni.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-100 hover:border-blue-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {uni.name}
                  </h3>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{uni.city}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="text-sm">{uni.language}</span>
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-sm">{uni.ranking}</span>
                  </div>
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  Detaylı Bilgi
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {countryName} için henüz üniversite bilgisi eklenmemiş.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

