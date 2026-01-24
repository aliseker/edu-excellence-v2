'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '@/services/api';

const categories = [
  { value: 'universite-kampusleri', label: 'Üniversite Kampüsleri' },
  { value: 'dil-okullari', label: 'Dil Okulları' },
  { value: 'ogrenci-etkinlikleri', label: 'Öğrenci Etkinlikleri' },
];

export default function YeniGaleriPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: categories[0].value,
    imageBase64: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'dan küçük olmalıdır!');
      return;
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      alert('Lütfen bir resim dosyası seçin!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, imageBase64: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.createGalleryItem(formData);
      router.push('/admin/galeri');
    } catch (error) {
      console.error('Galeri eklenirken hata oluştu:', error);
      alert('Galeri eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Yeni Galeri Resmi</h1>
          <p className="text-gray-600 mt-1">Galeri resmini bu alandan ekleyin.</p>
        </div>
        <Link
          href="/admin/galeri"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          ← Geri Dön
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600 bg-white"
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Resim */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Resim <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
            required={!formData.imageBase64}
          />
          <p className="text-xs text-gray-500 mt-1">Maksimum 5MB, JPG, PNG veya WebP formatında</p>
          
          {formData.imageBase64 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Önizleme:</p>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageBase64: '' })}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-semibold"
                >
                  ✕ Kaldır
                </button>
              </div>
              <img
                src={formData.imageBase64}
                alt="Preview"
                className="w-full max-w-md h-64 object-cover rounded-lg border-2 border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/galeri"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
