'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { apiService } from '@/services/api';

type Testimonial = {
  id: number;
  name: string;
  title: string;
  description: string;
  universityName: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function GoruslerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getTestimonials();
      setTestimonials(data as Testimonial[]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: number, name: string) => {
    setPendingDelete({ id, name });
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await apiService.deleteTestimonial(pendingDelete.id);
      await loadTestimonials();
      setPendingDelete(null);
      toast.success('Görüş başarıyla silindi.');
    } catch (error) {
      toast.error('Silme işlemi sırasında bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.universityName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Görüş Yönetimi</h1>
          <p className="text-gray-600 mt-1">Öğrenci görüşlerini yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/gorusler/yeni"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          + Yeni Görüş Ekle
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ara</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="İsim, başlık veya üniversite ara..."
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black">İsim</th>
                <th className="px-6 py-4 text-left font-black">Başlık</th>
                <th className="px-6 py-4 text-left font-black">Üniversite</th>
                <th className="px-6 py-4 text-left font-black">Sıra</th>
                <th className="px-6 py-4 text-left font-black">Durum</th>
                <th className="px-6 py-4 text-left font-black">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="font-semibold">Yükleniyor...</p>
                  </td>
                </tr>
              ) : filteredTestimonials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">💬</div>
                    <p className="font-semibold">Henüz görüş eklenmemiş</p>
                    <p className="text-sm mt-2">İlk görüşü eklemek için &quot;Yeni Görüş Ekle&quot; butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{testimonial.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{testimonial.universityName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                        {testimonial.displayOrder}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        testimonial.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {testimonial.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/gorusler/${testimonial.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(testimonial.id, testimonial.name)}
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
            <p className="text-gray-800 font-semibold mb-4">&quot;{pendingDelete.name}&quot; görüşünü silmek istediğinize emin misiniz?</p>
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
