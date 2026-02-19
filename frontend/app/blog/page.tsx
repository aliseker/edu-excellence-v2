'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { apiService } from '@/services/api';
import BlogPlaceholderIcon from '@/components/BlogPlaceholderIcon';

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  coverImageBase64: string;
  status: string;
  viewCount: number;
  createdAt: string;
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

const getCategoryLabel = (value: string) => {
  return categories.find(c => c.value === value)?.label || value;
};

const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} dk`;
};

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getBlogPosts();
      // Sadece yayınlanmış blog yazılarını göster
      const publishedPosts = (data as BlogPost[]).filter(post => post.status === 'published');
      setBlogPosts(publishedPosts);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-indigo-100">
            Yurtdışı eğitim hakkında güncel haberler ve rehberler
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl font-semibold text-gray-700">Yükleniyor...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4 flex justify-center text-gray-400">
              <BlogPlaceholderIcon size={72} />
            </div>
            <p className="text-xl font-semibold text-gray-700">Henüz blog yazısı yok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              // Slug yoksa veya boşsa ID kullan (fallback)
              const blogUrl = post.slug && post.slug.trim() ? `/blog/${post.slug}` : `/blog/${post.id}`;
              return (
              <Link
                key={post.id}
                href={blogUrl}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group border border-gray-100 hover:border-indigo-300"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden text-white">
                  {post.coverImageBase64 ? (
                    <img
                      src={post.coverImageBase64}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BlogPlaceholderIcon size={72} />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                      {getCategoryLabel(post.category)}
                    </span>
                    <span className="text-xs text-gray-500">{calculateReadTime(post.summary)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="text-indigo-600 font-semibold group-hover:text-indigo-700">
                      Devamını Oku →
                    </span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}









