'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Master / MBA Yönetimi</h1>
          <p className="text-gray-600 mt-1">Master ve MBA programlarını yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/master-mba/yeni"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg"
        >
          + Yeni Program Ekle
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
              placeholder="Program adı..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Program Tipi</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
            >
              <option value="">Tüm Programlar</option>
              <option value="master">Master</option>
              <option value="mba">MBA</option>
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
                <th className="px-6 py-4 text-left font-black">Tip</th>
                <th className="px-6 py-4 text-left font-black">Üniversite</th>
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
                    <div className="text-4xl mb-4">🎓</div>
                    <p className="font-semibold">Henüz program eklenmemiş</p>
                    <p className="text-sm mt-2">İlk programı eklemek için "Yeni Program Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{program.name}</td>
                    <td className="px-6 py-4">{program.programType}</td>
                    <td className="px-6 py-4">{program.university}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                        {program.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/master-mba/${program.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(program.id)}
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
