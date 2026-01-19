'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VizePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const vizeUlkeler: any[] = [];

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
                <th className="px-6 py-4 text-left font-black">Ülke Adı</th>
                <th className="px-6 py-4 text-left font-black">Bayrak</th>
                <th className="px-6 py-4 text-left font-black">Vize Tipi</th>
                <th className="px-6 py-4 text-left font-black">Durum</th>
                <th className="px-6 py-4 text-left font-black">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vizeUlkeler.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">🛂</div>
                    <p className="font-semibold">Henüz ülke eklenmemiş</p>
                    <p className="text-sm mt-2">İlk ülkeyi eklemek için "Yeni Ülke Ekle" butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                vizeUlkeler.map((ulke) => (
                  <tr key={ulke.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{ulke.id}</td>
                    <td className="px-6 py-4 font-semibold">{ulke.name}</td>
                    <td className="px-6 py-4">{ulke.flag}</td>
                    <td className="px-6 py-4">{ulke.visaType}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                        Aktif
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
