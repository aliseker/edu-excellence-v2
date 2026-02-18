'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { apiService } from '@/services/api';
import { BACKEND_BASE_URL } from '@/config/api';

const categories = [
  { value: '', label: 'Tüm Kategoriler' },
  { value: 'universite-kampusleri', label: 'Üniversite Kampüsleri' },
  { value: 'dil-okullari', label: 'Dil Okulları' },
  { value: 'ogrenci-etkinlikleri', label: 'Öğrenci Etkinlikleri' },
];

const getCategoryLabel = (value: string) => {
  return categories.find(c => c.value === value)?.label || value;
};

type GalleryItem = {
  id: number;
  category: string;
  title: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
};

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getGalleryItems();
      setImages(data as GalleryItem[]);
    } catch (error) {
      console.error('Galeri resimleri yüklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (pendingDeleteId == null) return;
    setDeleting(true);
    try {
      await apiService.deleteGalleryItem(pendingDeleteId);
      await loadGalleryItems();
      setPendingDeleteId(null);
      toast.success('Resim başarıyla silindi.');
    } catch (error) {
      console.error('Resim silinirken hata oluştu:', error);
      toast.error('Silme işlemi sırasında bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredImages = images.filter(image => {
    return !selectedCategory || image.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Galeri Yönetimi</h1>
          <p className="text-gray-600 mt-1">Galeri resimlerini yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/galeri/yeni"
          className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700 transition-colors shadow-lg"
        >
          + Yeni Resim Ekle
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setSelectedCategory('')}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-semibold text-gray-900 text-lg mb-2">Yükleniyor...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="font-semibold text-gray-900 text-lg mb-2">Henüz resim eklenmemiş</p>
          <p className="text-gray-600">Galeriye resim eklemek için "Yeni Resim Ekle" butonuna tıklayın</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-square">
                <img
                  src={`${BACKEND_BASE_URL}/uploads/${image.imagePath}`}
                  alt="Galeri resmi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">
                  <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-bold">
                    {getCategoryLabel(image.category)}
                  </span>
                </p>
                {image.title && (
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    {image.title}
                  </p>
                )}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(image.id)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-semibold"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Silme onay modalı */}
      {pendingDeleteId != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => !deleting && setPendingDeleteId(null)}>
          <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <p className="text-gray-800 font-semibold mb-4">Bu resmi silmek istediğinize emin misiniz?</p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => !deleting && setPendingDeleteId(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Siliniyor…' : 'Sil'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
