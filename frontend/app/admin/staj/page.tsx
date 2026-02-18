'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

export default function StajPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<number | ''>('');
  const [programs, setPrograms] = useState<any[]>([]);
  const [countries, setCountries] = useState<Array<{ id: number; name?: string; label?: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [programsRes, countriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.internshipPrograms}`),
          fetch(`${API_BASE_URL}${API_ENDPOINTS.locationCountries}`),
        ]);

        if (!programsRes.ok) {
          throw new Error('Programlar yüklenemedi.');
        }

        const programsData = await programsRes.json();
        const countriesData = await countriesRes.json();
        setPrograms(programsData);
        setCountries(countriesData);
      } catch (err) {
        console.error('Staj programları yüklenemedi:', err);
        setError('Programlar yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesCountry = selectedCountry ? program.countryId === selectedCountry : true;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query
        ? (program.generalInfo || '').toLowerCase().includes(query) ||
          (program.programs || []).some((p: any) => (p.title || '').toLowerCase().includes(query))
        : true;
      return matchesCountry && matchesSearch;
    });
  }, [programs, searchQuery, selectedCountry]);

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (pendingDeleteId == null) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.internshipProgramById(pendingDeleteId)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(false),
      });
      if (!res.ok) throw new Error('Program silinemedi.');
      setPrograms(prev => prev.filter(item => item.id !== pendingDeleteId));
      setPendingDeleteId(null);
      toast.success('Program başarıyla silindi.');
    } catch (err) {
      console.error('Program silinirken hata oluştu:', err);
      toast.error('Program silinirken bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Yurtdışı Staj Yönetimi</h1>
          <p className="text-gray-600 mt-1">Yurtdışı staj programlarını yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/staj/yeni"
          className="bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-lg"
        >
          + Yeni Staj Programı Ekle
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
              placeholder="Staj programı adı..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ülke</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
            >
              <option value="">Tüm Ülkeler</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name ?? country.label ?? 'Ülke'}
                </option>
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
                <th className="px-6 py-4 text-left font-black">Program Adı</th>
                <th className="px-6 py-4 text-left font-black">Ülke</th>
                <th className="px-6 py-4 text-left font-black">Program Sayısı</th>
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
              ) : filteredPrograms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">💼</div>
                    <p className="font-semibold">Henüz staj programı eklenmemiş</p>
                    <p className="text-sm mt-2">İlk staj programını eklemek için "Yeni Staj Programı Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((staj) => (
                  <tr key={staj.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{staj.programs?.[0]?.title ?? 'Program'}</td>
                    <td className="px-6 py-4">{staj.countryName ?? '-'}</td>
                    <td className="px-6 py-4">{staj.programs?.length ?? 0}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${staj.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                        {staj.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/staj/${staj.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(staj.id)}
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
            <p className="text-gray-800 font-semibold mb-4">Bu programı silmek istediğinizden emin misiniz?</p>
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
