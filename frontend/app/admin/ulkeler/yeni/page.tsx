'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

export default function YeniUlkePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    isActive: true,
  });
  const flagFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const createRes = await fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });
      if (!createRes.ok) {
        const err = await createRes.json().catch(() => ({}));
        throw new Error(err.message || 'Ülke eklenemedi.');
      }
      const created = await createRes.json();
      const countryId = created.id;

      const file = flagFileRef.current?.files?.[0];
      if (file) {
        const formDataFlag = new FormData();
        formDataFlag.append('flag', file);
        const flagRes = await fetch(`${API_BASE_URL}${API_ENDPOINTS.countryFlagUpload(countryId)}`, {
          method: 'POST',
          headers: getAuthHeaders(false),
          body: formDataFlag,
        });
        if (!flagRes.ok) {
          const err = await flagRes.json().catch(() => ({}));
        }
      }

      router.push('/admin/ulkeler');
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Yeni Ülke Ekle</h1>
          <p className="text-gray-600 mt-1">Yeni bir ülke kaydı oluşturun</p>
        </div>
        <Link href="/admin/ulkeler" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">
          ← Geri Dön
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Ülke Adı <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Slug <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="ingiltere"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Bayrak resmi</label>
          <input
            ref={flagFileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-bold file:bg-purple-100 file:text-purple-700"
          />
          <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP veya GIF, en fazla 2 MB</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Durum</label>
          <select
            value={formData.isActive ? 'active' : 'inactive'}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          >
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/ulkeler" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">
            İptal
          </Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
