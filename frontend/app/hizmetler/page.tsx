import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const services = [
  {
    title: 'Vize Danışmanlık',
    description: 'Profesyonel vize başvuru desteği',
    href: '/vize',
    icon: '🛂',
    gradient: 'from-red-500 to-pink-600'
  },
  {
    title: 'Lise Programları',
    description: 'Yurtdışında lise eğitimi fırsatları',
    href: '/lise',
    icon: '🎓',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Başvuru Desteği',
    description: 'Üniversite ve program başvurularında destek',
    href: '/basvuru',
    icon: '📝',
    gradient: 'from-blue-500 to-cyan-600'
  }
];

export default function HizmetlerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="bg-gradient-to-r from-slate-600 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Diğer Hizmetlerimiz
          </h1>
          <p className="text-xl text-gray-200">
            Yurtdışı eğitim yolculuğunuzda ihtiyacınız olan tüm hizmetler
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-100 hover:border-emerald-300 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}









