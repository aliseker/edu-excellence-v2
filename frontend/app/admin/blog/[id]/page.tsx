'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { toast } from 'sonner';
import { apiService } from '@/services/api';
import RichTextEditor from '@/components/RichTextEditor';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

type BlogPostEdit = {
  title: string;
  category: string;
  coverImageBase64: string;
  summary: string;
  content: string;
  status: string;
  slug: string;
};

const categories = [
  { value: 'dil-okullari', label: 'Dil Okulları' },
  { value: 'yaz-okulu', label: 'Yaz Okulu' },
  { value: 'universite', label: 'Üniversite' },
  { value: 'master-mba', label: 'Master/MBA' },
  { value: 'yurtdisi-staj', label: 'Yurtdışı Staj' },
  { value: 'lise', label: 'Lise' },
  { value: 'vize-danismanligi', label: 'Vize Danışmanlığı' },
];

export default function BlogDuzenlePage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0].value,
    coverImageBase64: '',
    summary: '',
    content: '',
    status: 'draft',
  });
  const [currentSlug, setCurrentSlug] = useState('');

  useEffect(() => {
    loadBlogPost();
  }, [id]);

  const loadBlogPost = async () => {
    try {
      setIsLoadingData(true);
      const data = (await apiService.getBlogPostById(parseInt(id))) as BlogPostEdit;
      setFormData({
        title: data.title,
        category: data.category,
        coverImageBase64: data.coverImageBase64,
        summary: data.summary,
        content: data.content,
        status: data.status,
      });
      setCurrentSlug(data.slug);
    } catch {
      toast.error('Blog yazısı yüklenemedi.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, coverImageBase64: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.updateBlogPost(parseInt(id), formData);
      toast.success('Blog yazısı başarıyla güncellendi.');
      router.push('/admin/blog');
    } catch {
      toast.error('Blog güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl font-semibold text-gray-700">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Blog Düzenle</h1>
          <p className="text-gray-600 mt-1">Blog içeriğini bu alandan düzenleyin.</p>
          {currentSlug && (
            <p className="text-sm text-indigo-600 mt-2">
              <strong>Slug:</strong> {currentSlug} 
              <span className="text-gray-500 ml-2">(URL: /blog/{currentSlug})</span>
            </p>
          )}
        </div>
        <Link
          href="/admin/blog"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          ← Geri Dön
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        {/* Başlık */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Başlık <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Blog başlığını girin"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Kapak Resmi (isteğe bağlı) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kapak Resmi
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
          />
          <p className="text-xs text-gray-500 mt-1">Maksimum 5MB, JPG, PNG veya WebP formatında (Değiştirmek istemiyorsanız boş bırakın)</p>
          
          {formData.coverImageBase64 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Önizleme:</p>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, coverImageBase64: '' })}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-semibold"
                >
                  ✕ Kaldır
                </button>
              </div>
              <img
                src={formData.coverImageBase64}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Özet */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Özet <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            rows={3}
            placeholder="Blog yazısının kısa özetini girin (2-3 cümle)"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            required
          />
        </div>

        {/* İçerik (isteğe bağlı) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            İçerik
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(html) => setFormData({ ...formData, content: html })}
            minHeight="280px"
          />
          <p className="text-xs text-gray-500 mt-1">
            Kalın, italik, liste ve başlıklarla zengin metin olarak içerik girebilirsiniz.
          </p>
        </div>

        {/* Durum */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Durum</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
          >
            <option value="draft">Taslak</option>
            <option value="published">Yayınlandı</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/blog"
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
