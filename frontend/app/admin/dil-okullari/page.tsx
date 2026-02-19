'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

interface LanguageSchoolRow {
  id: number;
  name: string;
  countryName?: string;
  cityName?: string;
  status: string;
}

export default function DilOkullariPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const [dilOkullari, setDilOkullari] = useState<LanguageSchoolRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (pendingDeleteId == null) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.languageSchoolById(pendingDeleteId)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(false),
      });
      if (!res.ok) throw new Error('Silme başarısız.');
      setDilOkullari(prev => prev.filter(item => item.id !== pendingDeleteId));
      setPendingDeleteId(null);
      toast.success('Dil okulu başarıyla silindi.');
    } catch (error) {
      toast.error('Silme sırasında bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.languageSchools}`);
        const data = await res.json();
        setDilOkullari(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchools();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dil Okulları Yönetimi</h1>
          <p className="text-gray-600 mt-1">Dil okullarını yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/dil-okullari/yeni"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg"
        >
          + Yeni Dil Okulu Ekle
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ara</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Dil okulu adı..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ülke</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            >
              <option value="">Tüm Ülkeler</option>
              <option value="ingiltere">İngiltere</option>
              <option value="amerika">Amerika</option>
              <option value="kanada">Kanada</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors">
              Filtrele
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black">Okul Adı</th>
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
              ) : dilOkullari.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">📚</div>
                    <p className="font-semibold">Henüz dil okulu eklenmemiş</p>
                    <p className="text-sm mt-2">İlk dil okulunu eklemek için "Yeni Dil Okulu Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                dilOkullari.map((okul) => (
                  <tr key={okul.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{okul.name}</td>
                    <td className="px-6 py-4">{okul.countryName ?? '-'}</td>
                    <td className="px-6 py-4">{okul.cityName ?? '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${okul.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                        {okul.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/dil-okullari/${okul.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(okul.id)}
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

      {/* Pagination */}
      {dilOkullari.length > 0 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
          <p className="text-sm text-gray-600">Toplam {dilOkullari.length} kayıt</p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Önceki
            </button>
            <span className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold">1</span>
            <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Sonraki
            </button>
          </div>
        </div>
      )}

      {pendingDeleteId != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => !deleting && setPendingDeleteId(null)}>
          <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <p className="text-gray-800 font-semibold mb-4">Bu dil okulunu silmek istediğinize emin misiniz?</p>
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
