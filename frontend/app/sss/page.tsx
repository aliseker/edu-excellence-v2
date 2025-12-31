import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Accordion from '@/components/Accordion';

const faqs = [
  {
    title: 'Yurtdışı eğitim başvurusu ne kadar sürer?',
    content: 'Başvuru süreci ülkeye ve programa göre değişiklik göstermektedir. Genellikle 2-6 hafta arasında sürmektedir. Vize işlemleri dahil toplam süre 2-3 ay olabilmektedir.'
  },
  {
    title: 'Hangi ülkelerde hizmet veriyorsunuz?',
    content: '30+ ülkede hizmet vermekteyiz. Başlıca ülkeler: Kanada, İngiltere, Amerika, Almanya, İtalya, Fransa, Avustralya, İrlanda, İspanya, Hollanda ve daha fazlası.'
  },
  {
    title: 'Vize başvurusu için ne gerekiyor?',
    content: 'Vize başvurusu için genellikle şu belgeler gereklidir: Pasaport, kabul mektubu, finansal belgeler, sağlık sigortası, dil yeterlilik belgesi. Ülkeye göre ek belgeler gerekebilir.'
  },
  {
    title: 'Dil okulu programları ne kadar sürer?',
    content: 'Dil okulu programları genellikle 2 haftadan başlayıp 1 yıla kadar sürebilir. Program süresi öğrencinin hedefine ve bütçesine göre belirlenir.'
  },
  {
    title: 'Burs imkanları var mı?',
    content: 'Evet, birçok üniversite ve program için burs imkanları mevcuttur. Akademik başarı, dil yeterliliği ve diğer kriterlere göre burs başvurusu yapılabilir.'
  },
  {
    title: 'Danışmanlık hizmeti ücretli mi?',
    content: 'Hayır, temsilcisi olduğumuz tüm okul ve üniversiteler için danışmanlık hizmetimiz tamamen ücretsizdir. Sadece okul kayıt ücretleri ve vize ücretleri ödenmektedir.'
  },
  {
    title: 'Online danışmanlık alabilir miyim?',
    content: 'Evet, online danışmanlık hizmeti de sunmaktayız. Video görüşme veya telefon ile danışmanlık alabilirsiniz.'
  },
  {
    title: 'Başvuru reddedilirse ne olur?',
    content: 'Başvuru reddedilirse, red nedenini analiz edip alternatif seçenekler sunuyoruz. İtiraz süreci veya yeni başvuru için destek sağlıyoruz.'
  }
];

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

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Accordion items={faqs} defaultOpen={0} />
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









