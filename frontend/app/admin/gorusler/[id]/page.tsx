'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { apiService } from '@/services/api';

export default function GorusDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    universityName: '',
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    loadTestimonial();
  }, [id]);

  const loadTestimonial = async () => {
    try {
      setIsLoadingData(true);
      const data = (await apiService.getTestimonialById(id)) as { name?: string; title?: string; description?: string; universityName?: string; displayOrder?: number; isActive?: boolean } | null;
      if (data) {
        setFormData({
          name: data.name || '',
          title: data.title || '',
          description: data.description || '',
          universityName: data.universityName || '',
          displayOrder: data.displayOrder || 0,
          isActive: data.isActive ?? true,
        });
      }
    } catch (error) {
      toast.error('Görüş yüklenirken bir hata oluştu.');
      router.push('/admin/gorusler');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.updateTestimonial(id, formData);
      router.push('/admin/gorusler');
    } catch (error) {
      toast.error('Görüş güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
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
          <h1 className="text-3xl font-black text-gray-900">Görüş Düzenle</h1>
          <p className="text-gray-600 mt-1">Öğrenci görüşünü bu alandan düzenleyin.</p>
        </div>
        <Link
          href="/admin/gorusler"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          ← Geri Dön
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        {/* İsim */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            İsim <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Öğrenci adı soyadı"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            required
          />
        </div>

        {/* Başlık */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Başlık <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Örn: Kanada Üniversite, İngiltere Master, Amerika Dil Okulu"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            required
          />
        </div>

        {/* Açıklama */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Açıklama (Görüş Metni) <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={5}
            placeholder="Öğrencinin görüşünü yazın..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            required
          />
        </div>

        {/* Üniversite İsmi */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Üniversite İsmi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.universityName}
            onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
            placeholder="Örn: University of Toronto, London Business School"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            required
          />
        </div>

        {/* Sıra */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Görüntülenme Sırası
          </label>
          <input
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
          />
          <p className="text-xs text-gray-500 mt-1">Düşük sayılar önce görüntülenir</p>
        </div>

        {/* Durum */}
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

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/gorusler"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
        </div>
      </form>
    </div>
  );
}
