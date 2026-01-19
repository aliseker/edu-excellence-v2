'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState<any[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Backend API entegrasyonu eklenecek
    const files = e.target.files;
    if (files) {
      // Mock upload
      console.log('Uploading images:', files);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Galeri Yönetimi</h1>
          <p className="text-gray-600 mt-1">Galeri resimlerini yönetin, ekleyin ve düzenleyin</p>
        </div>
        <label className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700 transition-colors shadow-lg cursor-pointer">
          + Resim Yükle
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
            >
              <option value="">Tüm Kategoriler</option>
              <option value="dil-okullari">Dil Okulları</option>
              <option value="yaz-okullari">Yaz Okulları</option>
              <option value="universite">Üniversite</option>
              <option value="etkinlikler">Etkinlikler</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors">
              Filtrele
            </button>
          </div>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="font-semibold text-gray-900 text-lg mb-2">Henüz resim eklenmemiş</p>
          <p className="text-gray-600">Galeriye resim eklemek için "Resim Yükle" butonuna tıklayın</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.url}
                  alt={image.alt || 'Galeri resmi'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-900 mb-2">{image.title || 'Başlıksız'}</p>
                <p className="text-sm text-gray-600 mb-3">{image.category}</p>
                <div className="flex items-center space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold">
                    Düzenle
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-semibold">
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
