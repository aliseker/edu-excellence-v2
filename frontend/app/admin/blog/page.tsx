'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';

const categories = [
  { value: '', label: 'Tüm Kategoriler' },
  { value: 'dil-okullari', label: 'Dil Okulları' },
  { value: 'yaz-okulu', label: 'Yaz Okulu' },
  { value: 'universite', label: 'Üniversite' },
  { value: 'master-mba', label: 'Master/MBA' },
  { value: 'yurtdisi-staj', label: 'Yurtdışı Staj' },
  { value: 'lise', label: 'Lise' },
  { value: 'vize-danismanligi', label: 'Vize Danışmanlığı' },
];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  status: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
};

const getCategoryLabel = (value: string) => {
  return categories.find(c => c.value === value)?.label || value;
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getBlogPosts();
      setBlogPosts(data as BlogPost[]);
    } catch (error) {
      console.error('Blog yazıları yüklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" yazısını silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      await apiService.deleteBlogPost(id);
      await loadBlogPosts();
    } catch (error) {
      console.error('Blog yazısı silinirken hata oluştu:', error);
      alert('Silme işlemi sırasında bir hata oluştu.');
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Blog Yönetimi</h1>
          <p className="text-gray-600 mt-1">Blog yazılarını yönetin, ekleyin ve düzenleyin</p>
        </div>
        <Link
          href="/admin/blog/yeni"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          + Yeni Blog Yazısı Ekle
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ara</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Blog başlığı..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
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
                <th className="px-6 py-4 text-left font-black">Başlık</th>
                <th className="px-6 py-4 text-left font-black">Kategori</th>
                <th className="px-6 py-4 text-left font-black">Tarih</th>
                <th className="px-6 py-4 text-left font-black">Durum</th>
                <th className="px-6 py-4 text-left font-black">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="font-semibold">Yükleniyor...</p>
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-4">📝</div>
                    <p className="font-semibold">Henüz blog yazısı eklenmemiş</p>
                    <p className="text-sm mt-2">İlk blog yazısını eklemek için &quot;Yeni Blog Yazısı Ekle&quot; butonuna tıklayın</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{post.title}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{post.summary}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                        {getCategoryLabel(post.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status === 'published' ? 'Yayında' : 'Taslak'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-semibold"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
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
    </div>
  );
}
