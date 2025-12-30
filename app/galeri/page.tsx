import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';

// Mock images - Backend'den gelecek
const galleryImages = [
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
  '/images/gallery-4.jpg',
  '/images/gallery-5.jpg',
  '/images/gallery-6.jpg',
];

const categories = [
  {
    name: 'Üniversite Kampüsleri',
    images: galleryImages.slice(0, 3),
  },
  {
    name: 'Dil Okulları',
    images: galleryImages.slice(3, 6),
  },
  {
    name: 'Öğrenci Etkinlikleri',
    images: galleryImages,
  },
];

export default function GaleriPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Galeri
          </h1>
          <p className="text-xl text-blue-100">
            Öğrencilerimizin yurtdışı eğitim deneyimlerinden kareler
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {categories.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative h-64 rounded-xl overflow-hidden bg-gray-200 group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <p className="font-semibold">Görsel {imgIndex + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}









