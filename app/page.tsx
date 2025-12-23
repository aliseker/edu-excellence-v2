import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import UniversityFilter from '@/components/UniversityFilter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      {/* Filter Section - Academix tarzı */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Yurtdışında Dil Okulunuzu Seçin!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            30'dan fazla ülkede en prestijli dil okulları ile çalışıyor ve öğrencilerimizin 
            hayallerini gerçekleştirmelerine yardımcı oluyoruz.
          </p>
        </div>
        
        <UniversityFilter onFilterChange={(filters) => {
          console.log('Filters:', filters);
          // Burada filtreleme mantığı eklenecek
        }} />
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">1996</div>
              <div className="text-gray-600 font-medium">'dan beri</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">64.000+</div>
              <div className="text-gray-600 font-medium">Öğrenci</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">300+</div>
              <div className="text-gray-600 font-medium">Anlaşmalı Okul</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600 font-medium">Ülke</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
