'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';

type ErasmusPageRow = {
  id: number;
  slug: string;
  title: string;
  htmlContent: string;
  imagesJson?: string;
  pdfPath: string | null;
  createdAt: string;
  updatedAt: string | null;
};

const SLUG_LABELS: Record<string, string> = {
  'proje-yazma-egitimleri': 'Proje Yazma Eğitimleri',
  'danismanlik-hizmetleri': 'DANIŞMANLIK HİZMETLERİ',
  'yurtdisi-staj-isbasi-gozlem': 'Yurtdışı Staj ve İşbaşı Gözlem',
  'ka1': 'Ka1 Projeleri',
  'ka2': 'Ka2 Projeleri',
  'diger': 'Diğer',
  'programme-rehberi': 'Programme Rehberi',
  'basvuru-sonuclari': 'Başvuru Sonuçları',
};

export default function AdminErasmusPage() {
  const [pages, setPages] = useState<ErasmusPageRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const list = await apiService.getErasmusPages();
        setPages(list);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Erasmus+ Sayfaları</h1>
          <p className="text-gray-600 mt-1">Hizmetler, projeler ve faydalı link sayfalarının içeriğini yönetin.</p>
        </div>
        <Link
          href="/admin/erasmus/yeni"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
        >
          + Yeni sayfa
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">Yükleniyor…</p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-bold text-gray-800">Slug</th>
                <th className="text-left px-4 py-3 font-bold text-gray-800">Başlık</th>
                <th className="text-left px-4 py-3 font-bold text-gray-800">PDF</th>
                <th className="text-right px-4 py-3 font-bold text-gray-800">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    Henüz sayfa yok. &quot;Yeni sayfa&quot; ile ekleyin.
                  </td>
                </tr>
              ) : (
                pages.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm text-gray-700">{p.slug}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{p.title || SLUG_LABELS[p.slug] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.pdfPath ? '✓' : '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/erasmus/${p.id}`}
                        className="text-purple-600 font-bold hover:underline"
                      >
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
