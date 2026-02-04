'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

interface Country {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
}

export default function UlkelerPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCountries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`);
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error('Ülkeler yüklenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Bu ülkeyi silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await fetch(`${API_BASE_URL}${API_ENDPOINTS.countryById(id)}`, { method: 'DELETE', headers: getAuthHeaders(false) });
      setCountries(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Ülke Yönetimi</h1>
          <p className="text-gray-600 mt-1">Ülkeleri yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/ulkeler/yeni"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg"
        >
          + Yeni Ülke Ekle
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black">Ülke</th>
                <th className="px-6 py-4 text-left font-black">Slug</th>
                <th className="px-6 py-4 text-left font-black">Durum</th>
                <th className="px-6 py-4 text-left font-black">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Yükleniyor...
                  </td>
                </tr>
              ) : countries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">🌍</div>
                    <p className="font-semibold">Henüz ülke eklenmemiş</p>
                  </td>
                </tr>
              ) : (
                countries.map((country) => (
                  <tr key={country.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{country.name}</td>
                    <td className="px-6 py-4">{country.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${country.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                        {country.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/ulkeler/${country.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <Link
                          href={`/admin/ulkeler/${country.id}/sehirler`}
                          className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded hover:bg-emerald-200 transition-colors text-sm font-semibold"
                        >
                          Şehirler
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(country.id)}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-semibold"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
