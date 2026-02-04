'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import { apiService } from '@/services/api';

interface SummerSchoolRow {
  id: number;
  name: string;
  countryId: number;
  countryName?: string;
  ageRange?: string;
  status: string;
}

interface CountryOption {
  id: number;
  label: string;
}

export default function YazOkullariPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<number | ''>('');

  const [yazOkullari, setYazOkullari] = useState<SummerSchoolRow[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const schools = await fetch(`${API_BASE_URL}${API_ENDPOINTS.summerSchools}`)
          .then(res => res.json() as Promise<SummerSchoolRow[]>);
        const countryOptions = (await apiService.getCountries()) as CountryOption[];

        setYazOkullari(schools);
        setCountries(countryOptions);
      } catch (fetchError) {
        console.error('Yaz okulları yüklenemedi:', fetchError);
        setError('Yaz okulları yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredSchools = useMemo(() => {
    return yazOkullari.filter((school) => {
      const matchesSearch = searchQuery
        ? school.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCountry = selectedCountry ? school.countryId === selectedCountry : true;
      return matchesSearch && matchesCountry;
    });
  }, [yazOkullari, searchQuery, selectedCountry]);

  const handleDelete = async (id: number) => {
    if (!confirm('Bu yaz okulunu silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.summerSchoolById(id)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(false),
      });
      if (!res.ok) {
        throw new Error('Silme başarısız.');
      }
      setYazOkullari(prev => prev.filter(item => item.id !== id));
    } catch (deleteError) {
      console.error('Silme hatası:', deleteError);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Yaz Okulları Yönetimi</h1>
          <p className="text-gray-600 mt-1">Yaz okullarını yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/yaz-okullari/yeni"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg"
        >
          + Yeni Yaz Okulu Ekle
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
              placeholder="Yaz okulu adı..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ülke</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
            >
              <option value="">Tüm Ülkeler</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors">
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
                <th className="px-6 py-4 text-left font-black">Okul Adı</th>
                <th className="px-6 py-4 text-left font-black">Ülke</th>
                <th className="px-6 py-4 text-left font-black">Yaş Grubu</th>
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
              ) : filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">☀️</div>
                    <p className="font-semibold">Henüz yaz okulu eklenmemiş</p>
                    <p className="text-sm mt-2">İlk yaz okulunu eklemek için "Yeni Yaz Okulu Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredSchools.map((okul) => (
                  <tr key={okul.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{okul.name}</td>
                    <td className="px-6 py-4">{okul.countryName ?? '-'}</td>
                    <td className="px-6 py-4">{okul.ageRange ?? '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${okul.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                        {okul.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/yaz-okullari/${okul.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(okul.id)}
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
