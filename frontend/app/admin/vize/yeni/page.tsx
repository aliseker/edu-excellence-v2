'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function YeniVizePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', flag: '', visaType: '', description: '', requirements: '', processingTime: '', status: 'active',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/admin/vize');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black text-gray-900">Yeni Vize Ülkesi Ekle</h1><p className="text-gray-600 mt-1">Yeni bir vize danışmanlığı ülkesi ekleyin</p></div>
        <Link href="/admin/vize" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Ülke Adı <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600" required /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Bayrak Emoji</label><input type="text" value={formData.flag} onChange={(e) => setFormData({ ...formData, flag: e.target.value })} placeholder="Örn: 🇬🇧 🇺🇸" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600" /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Vize Tipi <span className="text-red-500">*</span></label><input type="text" value={formData.visaType} onChange={(e) => setFormData({ ...formData, visaType: e.target.value })} placeholder="Örn: Öğrenci Vizesi, Turist Vizesi" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600" required /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">İşlem Süresi</label><input type="text" value={formData.processingTime} onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })} placeholder="Örn: 2-4 hafta" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600" /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"><option value="active">Aktif</option><option value="inactive">Pasif</option></select></div>
        </div>
        <div><label className="block text-sm font-bold text-gray-700 mb-2">Açıklama <span className="text-red-500">*</span></label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={6} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600" required /></div>
        <div><label className="block text-sm font-bold text-gray-700 mb-2">Gereksinimler</label><textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows={4} placeholder="Vize için gerekli belgeler ve şartlar" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600" /></div>
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/vize" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Kaydediliyor...' : 'Kaydet'}</button>
        </div>
      </form>
    </div>
  );
}
