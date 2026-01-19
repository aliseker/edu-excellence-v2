'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function YeniStajPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', country: '', city: '', sector: '', description: '', duration: '', requirements: '', image: '', website: '', status: 'active',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/admin/staj');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black text-gray-900">Yeni Staj Programı Ekle</h1><p className="text-gray-600 mt-1">Yeni bir staj programı kaydı oluşturun</p></div>
        <Link href="/admin/staj" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Program Adı <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" required /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label><select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" required><option value="">Seçiniz</option><option value="ingiltere">İngiltere</option><option value="amerika">Amerika</option><option value="kanada">Kanada</option></select></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Şehir</label><input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Sektör <span className="text-red-500">*</span></label><input type="text" value={formData.sector} onChange={(e) => setFormData({ ...formData, sector: e.target.value })} placeholder="Örn: Teknoloji, Finans" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" required /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Süre</label><input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="Örn: 3 ay, 6 ay" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Website</label><input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" /></div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Program Resmi</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" />
            {imagePreview && (
              <div className="mt-3">
                <Image src={imagePreview} alt="Preview" width={300} height={180} className="rounded-lg border-2 border-gray-300" />
              </div>
            )}
          </div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"><option value="active">Aktif</option><option value="inactive">Pasif</option></select></div>
        </div>
        <div><label className="block text-sm font-bold text-gray-700 mb-2">Açıklama <span className="text-red-500">*</span></label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={6} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" required /></div>
        <div><label className="block text-sm font-bold text-gray-700 mb-2">Gereksinimler</label><textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows={4} placeholder="Staj için gerekli şartlar" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" /></div>
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/staj" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Kaydediliyor...' : 'Kaydet'}</button>
        </div>
      </form>
    </div>
  );
}
