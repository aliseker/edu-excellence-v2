'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { use } from 'react';
import { sanitizeHTML } from '@/utils/sanitize';
import { apiService } from '@/services/api';
import BlogPlaceholderIcon from '@/components/BlogPlaceholderIcon';

interface PageProps {
  params: Promise<{
    id: string; // URL'den slug gelecek ama parametre adı [id] olduğu için "id"
  }>;
}

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
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

export default function BlogDetailPage({ params }: PageProps) {
  const { id: slug } = use(params); // URL'den slug değerini alıyoruz
  const [post, setPost] = useState<BlogPost | null>(null);
  const [sanitizedContent, setSanitizedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadBlogPost();
  }, [slug]);

  const loadBlogPost = async () => {
    try {
      setIsLoading(true);
      // Slug ile arama yap
      console.log('Blog slug/ID:', slug); // Debug
      
      let data: BlogPost | null = null;
      
      // Önce slug ile dene
      try {
        data = (await apiService.getBlogPostBySlug(slug)) as BlogPost;
      } catch (slugError) {
        // Slug ile bulunamazsa, ID olarak dene (fallback)
        const id = parseInt(slug);
        if (!isNaN(id)) {
          console.log('Slug ile bulunamadı, ID ile deneniyor:', id);
          data = (await apiService.getBlogPostById(id)) as BlogPost;
        } else {
          throw slugError;
        }
      }
      
      if (!data) {
        setNotFound(true);
        return;
      }
      
      setPost(data);
      setNotFound(false);
      
      // İçeriği sanitize et
      const sanitized = await sanitizeHTML(data.content);
      setSanitizedContent(sanitized);
    } catch (error) {
      console.error('Blog yazısı yüklenirken hata oluştu:', error);
      console.error('Aranan slug/ID:', slug); // Debug
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl font-semibold text-gray-700">Yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-4 flex justify-center text-gray-400">
              <BlogPlaceholderIcon size={72} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Yazı Bulunamadı</h1>
            <Link href="/blog" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              ← Blog&apos;a Dön
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-indigo-200 hover:text-white mb-4 inline-block">
            ← Blog&apos;a Dön
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-indigo-100">
            <span>{new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>•</span>
            <span>{getCategoryLabel(post.category)}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
