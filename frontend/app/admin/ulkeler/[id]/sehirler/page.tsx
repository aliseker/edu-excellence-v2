'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface City {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
  slug: string;
}

export default function SehirlerPage() {
  const params = useParams();
  const countryId = Number(params.id);
  const [country, setCountry] = useState<Country | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [newCity, setNewCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingCityId, setEditingCityId] = useState<number | null>(null);
  const [editingCityName, setEditingCityName] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.countryById(countryId)}`);
        const data = await res.json();
        setCountry(data);
      } catch (error) {
        console.error('Ülke yüklenemedi:', error);
      }
    };
    fetchCountry();
  }, [countryId]);

  const fetchCities = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.locationCities(countryId)}`);
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error('Şehirler yüklenemedi:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [countryId]);

  const handleAdd = async () => {
    if (!newCity.trim()) {
      return;
    }
    setIsLoading(true);
    try {
      await fetch(`${API_BASE_URL}${API_ENDPOINTS.cities}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCity.trim(), countryId }),
      });
      setNewCity('');
      fetchCities();
    } catch (error) {
      console.error('Şehir eklenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (city: City) => {
    setEditingCityId(city.id);
    setEditingCityName(city.name);
  };

  const cancelEdit = () => {
    setEditingCityId(null);
    setEditingCityName('');
  };

  const handleUpdate = async () => {
    if (!editingCityId || !editingCityName.trim()) {
      return;
    }
    setIsLoading(true);
    try {
      await fetch(`${API_BASE_URL}${API_ENDPOINTS.cityById(editingCityId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingCityName.trim(), countryId }),
      });
      cancelEdit();
      fetchCities();
    } catch (error) {
      console.error('Şehir güncellenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu şehri silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await fetch(`${API_BASE_URL}/cities/${id}`, { method: 'DELETE' });
      setCities(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Şehir silinemedi:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Şehir Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            {country ? `${country.name} şehirlerini yönetin` : 'Şehirleri yönetin'}
          </p>
        </div>
        <Link href="/admin/ulkeler" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">
          ← Geri Dön
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200 flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Şehir adı"
          className="flex-1 w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isLoading}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Ekleniyor...' : 'Şehir Ekle'}
        </button>
      </div>

      {editingCityId && (
        <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200 flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            value={editingCityName}
            onChange={(e) => setEditingCityName(e.target.value)}
            placeholder="Şehir adı"
            className="flex-1 w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-black">Şehir</th>
              <th className="px-6 py-4 text-left font-black">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cities.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-12 text-center text-gray-500">
                  Henüz şehir eklenmemiş
                </td>
              </tr>
            ) : (
              cities.map((city) => (
                <tr key={city.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{city.name}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => startEdit(city)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold mr-2"
                    >
                      Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(city.id)}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-semibold"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
