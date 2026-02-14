'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '@/services/api';

export default function SSSDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    loadFaq();
  }, [id]);

  const loadFaq = async () => {
    try {
      setIsLoadingData(true);
      const data = await apiService.getFaqById(id);
      if (data) {
        setFormData({
          question: data.question || '',
          answer: data.answer || '',
          displayOrder: data.displayOrder ?? 0,
          isActive: data.isActive ?? true,
        });
      }
    } catch (error) {
      console.error('Soru yüklenirken hata oluştu:', error);
      alert('Soru yüklenirken bir hata oluştu.');
      router.push('/admin/sss');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.updateFaq(id, formData);
      router.push('/admin/sss');
    } catch (error) {
      console.error('Soru güncellenirken hata oluştu:', error);
      alert('Soru güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 font-semibold">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Soru Düzenle</h1>
          <p className="text-gray-600 mt-1">Soru ve cevabı bu alandan düzenleyin.</p>
        </div>
        <Link
          href="/admin/sss"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          ← Geri Dön
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Soru <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            placeholder="Örn: Yurtdışı eğitim başvurusu ne kadar sürer?"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cevap <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            rows={5}
            placeholder="Cevabı yazın..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Görüntülenme Sırası</label>
          <input
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Durum</label>
          <select
            value={formData.isActive ? 'true' : 'false'}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
          >
            <option value="true">Aktif</option>
            <option value="false">Pasif</option>
          </select>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/sss"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
