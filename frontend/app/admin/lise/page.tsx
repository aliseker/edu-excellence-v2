'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

interface HighSchoolRow {
  id: number;
  name: string;
  countryId: number;
  countryName?: string;
  cityName?: string;
  status: string;
}

interface CountryOption {
  id: number;
  label?: string;
  name?: string;
  value?: string;
}

export default function LisePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<number | ''>('');

  const [liseler, setLiseler] = useState<HighSchoolRow[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (filters?: { search?: string; countryId?: number }) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.set('search', filters.search);
      if (filters?.countryId) params.set('countryId', String(filters.countryId));

      const [schoolsRes, countriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}${API_ENDPOINTS.highSchools}${params.toString() ? `?${params.toString()}` : ''}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.locationCountries}`),
      ]);

      if (!schoolsRes.ok) {
        throw new Error('Liseler yüklenemedi.');
      }
      if (!countriesRes.ok) {
        throw new Error('Ülkeler yüklenemedi.');
      }

      const schoolsData = await schoolsRes.json();
      const countriesData = await countriesRes.json();
      setLiseler(schoolsData);
      setCountries(countriesData);
    } catch (fetchError) {
      console.error('Liseler yüklenemedi:', fetchError);
      setError('Liseler yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLiseler = useMemo(() => {
    return liseler.filter((lise) => {
      const matchesSearch = searchQuery
        ? lise.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCountry = selectedCountry ? lise.countryId === selectedCountry : true;
      return matchesSearch && matchesCountry;
    });
  }, [liseler, searchQuery, selectedCountry]);

  const handleFilter = async () => {
    await fetchData({
      search: searchQuery.trim() || undefined,
      countryId: selectedCountry || undefined,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu lise programını silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.highSchoolById(id)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(false),
      });
      if (!res.ok) {
        throw new Error('Silme başarısız.');
      }
      setLiseler(prev => prev.filter(item => item.id !== id));
    } catch (deleteError) {
      console.error('Silme hatası:', deleteError);
      alert('Silme sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Lise Yönetimi</h1>
          <p className="text-gray-600 mt-1">Yurtdışı lise programlarını yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/lise/yeni"
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-cyan-700 transition-colors shadow-lg"
        >
          + Yeni Lise Programı Ekle
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ara</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Lise adı..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ülke</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
            >
              <option value="">Tüm Ülkeler</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label ?? country.name ?? country.value ?? 'Ülke'}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleFilter}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Filtrele
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black">Lise Adı</th>
                <th className="px-6 py-4 text-left font-black">Ülke</th>
                <th className="px-6 py-4 text-left font-black">Şehir</th>
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
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredLiseler.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">🎒</div>
                    <p className="font-semibold">Henüz lise programı eklenmemiş</p>
                    <p className="text-sm mt-2">İlk lise programını eklemek için "Yeni Lise Programı Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredLiseler.map((lise) => (
                  <tr key={lise.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{lise.name}</td>
                    <td className="px-6 py-4">{lise.countryName ?? '-'}</td>
                    <td className="px-6 py-4">{lise.cityName ?? '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${lise.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                        {lise.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/lise/${lise.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(lise.id)}
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
