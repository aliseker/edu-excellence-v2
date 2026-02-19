'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { apiService } from '@/services/api';

type VisaCountry = {
  id: number;
  countrySlug: string;
  countryName: string;
  flag: string;
  generalInfo: string;
  status: string;
  visaTypes: Array<{
    name: string;
    description: string;
    processingTime: string;
    requirements: string[];
  }>;
  process: string[];
  documents: string[];
  importantNotes: string[];
};

const getCountryEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function VizePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [vizeUlkeler, setVizeUlkeler] = useState<VisaCountry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<{ id: number; countryName: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadVisaCountries();
  }, []);

  const loadVisaCountries = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getVisaServices();
      setVizeUlkeler(data as VisaCountry[]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: number, countryName: string) => {
    setPendingDelete({ id, countryName });
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await apiService.deleteVisaService(pendingDelete.id);
      await loadVisaCountries();
      setPendingDelete(null);
      toast.success('Vize ülkesi başarıyla silindi.');
    } catch (error) {
      toast.error('Silme işlemi sırasında bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredCountries = vizeUlkeler.filter(ulke =>
    ulke.countryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Vize Danışmanlığı Ülkeleri</h1>
          <p className="text-gray-600 mt-1">Vize danışmanlığı sunan ülkeleri yönetin</p>
        </div>
        <Link
          href="/admin/vize/yeni"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          + Yeni Ülke Ekle
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ara</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ülke adı..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black">Ülke Adı</th>
                <th className="px-6 py-4 text-left font-black">Bayrak</th>
                <th className="px-6 py-4 text-left font-black">Vize Türleri</th>
                <th className="px-6 py-4 text-left font-black">Durum</th>
                <th className="px-6 py-4 text-left font-black">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="font-semibold">Yükleniyor...</p>
                  </td>
                </tr>
              ) : filteredCountries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">🛂</div>
                    <p className="font-semibold">Henüz ülke eklenmemiş</p>
                    <p className="text-sm mt-2">İlk ülkeyi eklemek için "Yeni Ülke Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredCountries.map((ulke) => (
                  <tr key={ulke.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{ulke.countryName}</td>
                    <td className="px-6 py-4 text-2xl">{getCountryEmoji(ulke.flag)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {ulke.visaTypes.slice(0, 2).map((type, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                            {type.name}
                          </span>
                        ))}
                        {ulke.visaTypes.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">
                            +{ulke.visaTypes.length - 2} daha
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ulke.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ulke.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/vize/${ulke.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(ulke.id, ulke.countryName)}
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

      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => !deleting && setPendingDelete(null)}>
          <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <p className="text-gray-800 font-semibold mb-4">{pendingDelete.countryName} ülkesini silmek istediğinize emin misiniz?</p>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => !deleting && setPendingDelete(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300">İptal</button>
              <button type="button" onClick={handleDeleteConfirm} disabled={deleting} className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50">{deleting ? 'Siliniyor…' : 'Sil'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
