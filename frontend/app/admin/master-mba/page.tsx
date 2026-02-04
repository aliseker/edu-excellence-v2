'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

export default function MasterMBAPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [programs, setPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.masterPrograms}`);
        if (!res.ok) {
          throw new Error('Programlar yüklenemedi.');
        }
        const data = await res.json();
        setPrograms(data);
      } catch (err) {
        console.error('Programlar yüklenemedi:', err);
        setError('Programlar yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch = searchQuery
        ? program.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesType = selectedType ? program.programType === selectedType : true;
      return matchesSearch && matchesType;
    });
  }, [programs, searchQuery, selectedType]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu programı silmek istediğinizden emin misiniz?')) {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.masterProgramById(id)}`, {
          method: 'DELETE',
          headers: getAuthHeaders(false),
        });
        if (!res.ok) {
          throw new Error('Program silinemedi.');
        }
        setPrograms(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        console.error('Program silinirken hata oluştu:', err);
        alert('Program silinirken bir hata oluştu.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Master / MBA Yönetimi</h1>
          <p className="text-slate-600 mt-1">Master ve MBA programlarını yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/master-mba/yeni"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-purple-500"
        >
          <span className="text-lg">＋</span>
          Yeni Program Ekle
        </Link>
      </div>

      <div className="bg-white/80 p-4 md:p-5 rounded-2xl shadow-lg border border-slate-200 backdrop-blur">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Ara</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Program adı..."
              className="w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Program Tipi</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Tüm Programlar</option>
              <option value="master">Master</option>
              <option value="mba">MBA</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full rounded-xl bg-slate-900 px-4 py-2.5 font-bold text-white shadow-md transition hover:bg-slate-800">
              Filtrele
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/90 rounded-2xl shadow-lg border border-slate-200 overflow-hidden backdrop-blur">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black">Program Adı</th>
                <th className="px-6 py-4 text-left font-black">Tip</th>
                <th className="px-6 py-4 text-left font-black">Üniversite</th>
                <th className="px-6 py-4 text-left font-black">Durum</th>
                <th className="px-6 py-4 text-left font-black">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
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
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="text-4xl mb-4">🎓</div>
                    <p className="font-semibold">Henüz program eklenmemiş</p>
                    <p className="text-sm mt-2">İlk programı eklemek için "Yeni Program Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{program.name}</td>
                    <td className="px-6 py-4 text-slate-700">{program.programType}</td>
                    <td className="px-6 py-4 text-slate-700">{program.university}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${program.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                        {program.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/master-mba/${program.id}`}
                          className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 transition-colors"
                        >
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(program.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-sm font-semibold hover:bg-rose-100 transition-colors"
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
