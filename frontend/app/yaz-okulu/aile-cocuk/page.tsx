import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AileCocukYazOkuluPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Aile-Çocuk Yaz Okulu
          </h1>
          <p className="text-xl text-orange-100">
            Aileler ve çocuklar için birlikte eğitim fırsatı
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-700 leading-relaxed">
            Aile-Çocuk Yaz Okulu programları hakkında detaylı bilgiler yakında eklenecektir.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}









