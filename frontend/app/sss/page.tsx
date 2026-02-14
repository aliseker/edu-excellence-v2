import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Accordion from '@/components/Accordion';
import SSSContent from './SSSContent';

export default function SSSPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sık Sorulan Sorular
          </h1>
          <p className="text-xl text-blue-100">
            Yurtdışı eğitim hakkında merak ettikleriniz
          </p>
        </div>
      </section>

      {/* FAQ Content - dinamik API'den */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SSSContent />
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sorunuz mu var?
          </h2>
          <p className="text-gray-600 mb-8">
            Aradığınız cevabı bulamadıysanız, bizimle iletişime geçin
          </p>
          <a
            href="/iletisim"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            İletişime Geç
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}









