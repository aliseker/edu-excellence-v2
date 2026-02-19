'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

interface UniversityRow {
  id: number;
  name: string;
  countryId: number;
  countryName?: string;
  cityName?: string;
  status: string;
}

interface CountryOption {
  id: number;
  name: string;
}

export default function UniversitePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<number | ''>('');

  const [universiteler, setUniversiteler] = useState<UniversityRow[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [universitiesRes, countriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.universities}`),
          fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`),
        ]);
        if (!universitiesRes.ok) {
          throw new Error('Üniversiteler yüklenemedi.');
        }
        if (!countriesRes.ok) {
          throw new Error('Ülkeler yüklenemedi.');
        }
        const universitiesData = await universitiesRes.json();
        const countriesData = await countriesRes.json();

        setUniversiteler(universitiesData);
        setCountries(countriesData);
      } catch (fetchError) {
        setError('Üniversiteler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUniversities = useMemo(() => {
    return universiteler.filter((uni) => {
      const matchesSearch = searchQuery
        ? uni.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCountry = selectedCountry ? uni.countryId === selectedCountry : true;
      return matchesSearch && matchesCountry;
    });
  }, [universiteler, searchQuery, selectedCountry]);

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (pendingDeleteId == null) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.universityById(pendingDeleteId)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(false),
      });
      if (!res.ok) throw new Error('Silme başarısız.');
      setUniversiteler(prev => prev.filter(item => item.id !== pendingDeleteId));
      setPendingDeleteId(null);
      toast.success('Üniversite başarıyla silindi.');
    } catch (deleteError) {
      toast.error('Silme sırasında bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Üniversite Yönetimi</h1>
          <p className="text-gray-600 mt-1">Yurtdışı üniversiteleri yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/universite/yeni"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
        >
          + Yeni Üniversite Ekle
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
              placeholder="Üniversite adı..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ülke</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="">Tüm Ülkeler</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.name}</option>
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
                <th className="px-6 py-4 text-left font-black">Üniversite Adı</th>
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
              ) : filteredUniversities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">🏛️</div>
                    <p className="font-semibold">Henüz üniversite eklenmemiş</p>
                    <p className="text-sm mt-2">İlk üniversiteyi eklemek için "Yeni Üniversite Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredUniversities.map((uni) => (
                  <tr key={uni.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{uni.name}</td>
                    <td className="px-6 py-4">{uni.countryName ?? '-'}</td>
                    <td className="px-6 py-4">{uni.cityName ?? '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${uni.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                        {uni.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/universite/${uni.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(uni.id)}
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

      {pendingDeleteId != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => !deleting && setPendingDeleteId(null)}>
          <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <p className="text-gray-800 font-semibold mb-4">Bu üniversiteyi silmek istediğinize emin misiniz?</p>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => !deleting && setPendingDeleteId(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300">İptal</button>
              <button type="button" onClick={handleDeleteConfirm} disabled={deleting} className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">{deleting ? 'Siliniyor…' : 'Sil'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
