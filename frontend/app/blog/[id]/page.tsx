'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { use, useState, useEffect } from 'react';
import { sanitizeHTML } from '@/utils/sanitize';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const blogPosts: Record<string, any> = {
  '1': {
    title: 'Kanada\'da Üniversite Eğitimi: Başvuru Rehberi',
    content: `
      <p>Kanada, dünya çapında tanınmış üniversiteleri ve yüksek eğitim kalitesi ile öğrenciler için cazip bir destinasyondur. Bu rehberde, Kanada'da üniversite eğitimi almak isteyen öğrenciler için başvuru sürecini detaylı olarak ele alacağız.</p>
      
      <h2>Neden Kanada?</h2>
      <p>Kanada, dünya sıralamalarında üst sıralarda yer alan üniversitelere sahiptir. University of Toronto, McGill University ve University of British Columbia gibi prestijli kurumlar, öğrencilere kaliteli eğitim ve araştırma fırsatları sunmaktadır.</p>
      
      <h2>Başvuru Süreci</h2>
      <p>Kanada'da üniversite başvurusu yapmak için öncelikle şu adımları takip etmelisiniz:</p>
      <ul>
        <li>Üniversite ve program seçimi</li>
        <li>Gerekli belgelerin hazırlanması</li>
        <li>Dil yeterlilik sınavları (IELTS/TOEFL)</li>
        <li>Başvuru formunun doldurulması</li>
        <li>Referans mektuplarının alınması</li>
      </ul>
      
      <h2>Gerekli Belgeler</h2>
      <p>Kanada üniversitelerine başvuru yapmak için genellikle şu belgeler gereklidir:</p>
      <ul>
        <li>Lise diploması ve transkript</li>
        <li>IELTS veya TOEFL skoru</li>
        <li>Motivasyon mektubu</li>
        <li>Referans mektupları</li>
        <li>CV/Resume</li>
      </ul>
    `,
    date: '15 Ocak 2025',
    category: 'Üniversite',
    author: 'Edu-Excellence Ekibi',
    image: '🇨🇦'
  },
  '2': {
    title: 'İngiltere\'de Öğrenci Vizesi Nasıl Alınır?',
    content: `
      <p>İngiltere'de eğitim almak isteyen öğrenciler için vize başvuru süreci oldukça önemlidir. Bu yazıda, İngiltere öğrenci vizesi başvuru sürecini detaylı olarak ele alacağız.</p>
      
      <h2>Vize Türleri</h2>
      <p>İngiltere'de öğrenciler için farklı vize türleri bulunmaktadır:</p>
      <ul>
        <li>Student Visa (Tier 4) - 6 aydan uzun programlar için</li>
        <li>Short-term Study Visa - 6 aydan kısa programlar için</li>
      </ul>
      
      <h2>Başvuru Süreci</h2>
      <p>Vize başvurusu yapmak için şu adımları takip etmelisiniz:</p>
      <ol>
        <li>Online başvuru formunu doldurun</li>
        <li>Gerekli belgeleri hazırlayın</li>
        <li>Vize ücretini ödeyin</li>
        <li>Biyometrik bilgileri verin</li>
        <li>Mülakat için randevu alın</li>
      </ol>
    `,
    date: '12 Ocak 2025',
    category: 'Vize',
    author: 'Edu-Excellence Ekibi',
    image: '🇬🇧'
  }
};

export default function BlogDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [sanitizedContent, setSanitizedContent] = useState<string>('');
  
  const post = blogPosts[id] || {
    title: 'Yazı Bulunamadı',
    content: '<p>Bu yazı bulunamadı.</p>',
    date: '',
    category: '',
    author: '',
    image: '📄'
  };

  useEffect(() => {
    sanitizeHTML(post.content).then(setSanitizedContent);
  }, [post.content]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-indigo-200 hover:text-white mb-4 inline-block">
            ← Blog'a Dön
          </Link>
          <div className="text-6xl mb-4">{post.image}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-indigo-100">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div 
          className="bg-white rounded-xl shadow-lg p-8 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent || post.content }}
        />
      </article>

      <Footer />
    </div>
  );
}

