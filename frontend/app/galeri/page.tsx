'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apiService } from '@/services/api';
import { BACKEND_BASE_URL } from '@/config/api';

type GalleryItem = {
  id: number;
  category: string;
  title: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
};

const categoryLabels: Record<string, string> = {
  'universite-kampusleri': 'Üniversite Kampüsleri',
  'dil-okullari': 'Dil Okulları',
  'ogrenci-etkinlikleri': 'Öğrenci Etkinlikleri',
};

export default function GaleriPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getGalleryItems();
      setGalleryItems(data as GalleryItem[]);
    } catch (error) {
      console.error('Galeri resimleri yüklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Kategorilere göre grupla
  const groupedByCategory = galleryItems.reduce((acc, item) => {
    const categoryName = categoryLabels[item.category] || item.category;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, GalleryItem[]>);

  const categories = Object.keys(categoryLabels).map(key => ({
    key,
    name: categoryLabels[key],
  }));
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
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl font-semibold text-gray-700">Yükleniyor...</p>
          </div>
        ) : Object.keys(groupedByCategory).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-xl font-semibold text-gray-700">Henüz galeri resmi eklenmemiş</p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => {
              const items = groupedByCategory[category.name] || [];
              if (items.length === 0) return null;
              
              return (
                <div key={category.key}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedImage(item)}
                        className="relative block h-64 rounded-xl overflow-hidden bg-gray-200 group cursor-pointer focus:outline-none"
                      >
                        <img
                          src={`${BACKEND_BASE_URL}/uploads/${item.imagePath}`}
                          alt={`${category.name} - Görsel ${item.id}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <p className="font-semibold">
                            {item.title || category.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-200"
              aria-label="Kapat"
            >
              ×
            </button>
            <img
              src={`${BACKEND_BASE_URL}/uploads/${selectedImage.imagePath}`}
              alt={selectedImage.title || 'Galeri resmi'}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl bg-black/40"
            />
            {(selectedImage.title || categoryLabels[selectedImage.category]) && (
              <p className="mt-3 text-center text-white text-sm">
                {selectedImage.title || categoryLabels[selectedImage.category]}
              </p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}









