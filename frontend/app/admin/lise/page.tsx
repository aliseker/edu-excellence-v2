'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LisePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const liseler: any[] = [];

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
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
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

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black">ID</th>
                <th className="px-6 py-4 text-left font-black">Lise Adı</th>
                <th className="px-6 py-4 text-left font-black">Ülke</th>
                <th className="px-6 py-4 text-left font-black">Şehir</th>
                <th className="px-6 py-4 text-left font-black">Durum</th>
                <th className="px-6 py-4 text-left font-black">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {liseler.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">🎒</div>
                    <p className="font-semibold">Henüz lise programı eklenmemiş</p>
                    <p className="text-sm mt-2">İlk lise programını eklemek için "Yeni Lise Programı Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                liseler.map((lise) => (
                  <tr key={lise.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{lise.id}</td>
                    <td className="px-6 py-4 font-semibold">{lise.name}</td>
                    <td className="px-6 py-4">{lise.country}</td>
                    <td className="px-6 py-4">{lise.city}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                        Aktif
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
                        <button className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-semibold">
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
