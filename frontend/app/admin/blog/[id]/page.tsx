'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    content: '',
    image: '',
    excerpt: '',
    status: 'draft',
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

  useEffect(() => {
    if (id !== 'yeni') {
      // TODO: API'den veri çek
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/admin/blog');
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Blog Yazısı Düzenle</h1>
          <p className="text-gray-600 mt-1">Blog yazısı bilgilerini güncelleyin</p>
        </div>
        <Link href="/admin/blog" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Başlık <span className="text-red-500">*</span></label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" required /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Kategori <span className="text-red-500">*</span></label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" required><option value="">Seçiniz</option><option value="dil-egitimi">Dil Eğitimi</option><option value="yurtdisi-egitim">Yurtdışı Eğitim</option><option value="vize">Vize</option><option value="genel">Genel</option></select></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Yazar <span className="text-red-500">*</span></label><input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" required /></div>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"><option value="draft">Taslak</option><option value="published">Yayında</option></select></div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Kapak Resmi</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" />
            {imagePreview && (
              <div className="mt-3">
                <Image src={imagePreview} alt="Preview" width={300} height={180} className="rounded-lg border-2 border-gray-300" />
              </div>
            )}
          </div>
        </div>
        <div><label className="block text-sm font-bold text-gray-700 mb-2">Özet</label><textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={3} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" /></div>
        <div><label className="block text-sm font-bold text-gray-700 mb-2">İçerik <span className="text-red-500">*</span></label><textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={12} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 font-mono text-sm" required /></div>
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/blog" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Güncelleniyor...' : 'Güncelle'}</button>
        </div>
      </form>
    </div>
  );
}
