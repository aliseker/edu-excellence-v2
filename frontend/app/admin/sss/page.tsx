'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { apiService } from '@/services/api';

type Faq = {
  id: number;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function SSSAdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<{ id: number; question: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getFaqs();
      setFaqs(data as Faq[]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: number, question: string) => {
    setPendingDelete({ id, question });
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await apiService.deleteFaq(pendingDelete.id);
      await loadFaqs();
      setPendingDelete(null);
      toast.success('Soru başarıyla silindi.');
    } catch (error) {
      toast.error('Silme işlemi sırasında bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Sık Sorulan Sorular</h1>
          <p className="text-gray-600 mt-1">Soruları ve cevapları yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/sss/yeni"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          + Yeni Soru Ekle
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
              placeholder="Soru veya cevap ara..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setSearchQuery('')}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black">Soru</th>
                <th className="px-6 py-4 text-left font-black">Sıra</th>
                <th className="px-6 py-4 text-left font-black">Durum</th>
                <th className="px-6 py-4 text-left font-black">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="font-semibold">Yükleniyor...</p>
                  </td>
                </tr>
              ) : filteredFaqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">❓</div>
                    <p className="font-semibold">Henüz soru eklenmemiş</p>
                    <p className="text-sm mt-2">İlk soruyu eklemek için &quot;Yeni Soru Ekle&quot; butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 line-clamp-2">{faq.question}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                        {faq.displayOrder}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        faq.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {faq.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/sss/${faq.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(faq.id, faq.question)}
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
            <p className="text-gray-800 font-semibold mb-4">&quot;{pendingDelete.question}&quot; sorusunu silmek istediğinize emin misiniz?</p>
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
