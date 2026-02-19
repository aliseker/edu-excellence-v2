'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    {
      title: 'Toplam Dil Okulu',
      value: '0',
      icon: '📚',
      color: 'bg-purple-500',
      href: '/admin/dil-okullari',
    },
    {
      title: 'Toplam Yaz Okulu',
      value: '0',
      icon: '☀️',
      color: 'bg-orange-500',
      href: '/admin/yaz-okullari',
    },
    {
      title: 'Toplam Üniversite',
      value: '0',
      icon: '🏛️',
      color: 'bg-blue-500',
      href: '/admin/universite',
    },
    {
      title: 'Toplam Master/MBA',
      value: '0',
      icon: '🎓',
      color: 'bg-indigo-500',
      href: '/admin/master-mba',
    },
    {
      title: 'Toplam Blog',
      value: '0',
      icon: '📝',
      color: 'bg-green-500',
      href: '/admin/blog',
    },
    {
      title: 'Toplam Galeri',
      value: '0',
      icon: '🖼️',
      color: 'bg-pink-500',
      href: '/admin/galeri',
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [recentActivities, setRecentActivities] = useState<Array<{
    type: string;
    action: string;
    time: string;
    href?: string;
  }>>([]);

  // Tarih formatlama fonksiyonu
  // Backend'den gelen tarihler UTC formatında ama timezone bilgisi yok
  // Bu yüzden UTC olarak parse edip local time'a çeviriyoruz
  const parseUTCDate = (dateString: string): Date => {
    // Eğer string'de 'Z' veya timezone bilgisi yoksa, UTC olarak kabul et
    if (!dateString.includes('Z') && !dateString.includes('+') && !dateString.includes('-', 10)) {
      // Backend'den gelen format: "2026-01-24T19:19:30.1128613"
      // Bunu UTC olarak parse etmek için 'Z' ekliyoruz
      const utcString = dateString.endsWith('Z') ? dateString : dateString + 'Z';
      return new Date(utcString);
    }
    return new Date(dateString);
  };

  const formatTimeAgo = (dateString: string): string => {
    try {
      // UTC tarihini parse et
      const date = parseUTCDate(dateString);
      const now = new Date();
      
      // Geçersiz tarih kontrolü
      if (isNaN(date.getTime())) {
        return 'Bilinmiyor';
      }
      
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      // Negatif değer kontrolü (gelecek tarihler için)
      if (diffInSeconds < 0) {
        return 'Az önce';
      }
      
      if (diffInSeconds < 60) {
        return 'Az önce';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} dakika önce`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} saat önce`;
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} gün önce`;
      } else if (diffInSeconds < 2592000) {
        const weeks = Math.floor(diffInSeconds / 604800);
        return `${weeks} hafta önce`;
      } else {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} ay önce`;
      }
    } catch (error) {
      return 'Bilinmiyor';
    }
  };

  useEffect(() => {
    // Tarihi client-side'da oluştur (hydration mismatch'i önlemek için)
    setCurrentDate(
      new Date().toLocaleDateString('tr-TR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    );
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Tüm verileri paralel olarak çek
      const [languageSchools, summerSchools, universities, masterPrograms, blogPosts, galleryItems] = await Promise.all([
        apiService.getLanguageSchools().catch(() => []),
        apiService.getSummerSchools().catch(() => []),
        apiService.getUniversities().catch(() => []),
        apiService.getMasterPrograms().catch(() => []),
        apiService.getBlogPosts().catch(() => []),
        apiService.getGalleryItems().catch(() => []),
      ]);

      // Stats'ı güncelle
      setStats([
        {
          title: 'Toplam Dil Okulu',
          value: Array.isArray(languageSchools) ? languageSchools.length.toString() : '0',
          icon: '📚',
          color: 'bg-purple-500',
          href: '/admin/dil-okullari',
        },
        {
          title: 'Toplam Yaz Okulu',
          value: Array.isArray(summerSchools) ? summerSchools.length.toString() : '0',
          icon: '☀️',
          color: 'bg-orange-500',
          href: '/admin/yaz-okullari',
        },
        {
          title: 'Toplam Üniversite',
          value: Array.isArray(universities) ? universities.length.toString() : '0',
          icon: '🏛️',
          color: 'bg-blue-500',
          href: '/admin/universite',
        },
        {
          title: 'Toplam Master/MBA',
          value: Array.isArray(masterPrograms) ? masterPrograms.length.toString() : '0',
          icon: '🎓',
          color: 'bg-indigo-500',
          href: '/admin/master-mba',
        },
        {
          title: 'Toplam Blog',
          value: Array.isArray(blogPosts) ? blogPosts.length.toString() : '0',
          icon: '📝',
          color: 'bg-green-500',
          href: '/admin/blog',
        },
        {
          title: 'Toplam Galeri',
          value: Array.isArray(galleryItems) ? galleryItems.length.toString() : '0',
          icon: '🖼️',
          color: 'bg-pink-500',
          href: '/admin/galeri',
        },
      ]);

      // Son aktiviteleri oluştur
      const activities: Array<{
        type: string;
        action: string;
        time: string;
        date: Date;
        href?: string;
      }> = [];

      // Blog yazıları
      if (Array.isArray(blogPosts)) {
        blogPosts.forEach((post: any) => {
          if (post.createdAt) {
            activities.push({
              type: 'Blog',
              action: `"${post.title}" yazısı eklendi`,
              time: formatTimeAgo(post.createdAt),
              date: parseUTCDate(post.createdAt),
              href: `/admin/blog/${post.id}`,
            });
          }
        });
      }

      // Galeri resimleri
      if (Array.isArray(galleryItems)) {
        galleryItems.forEach((item: any) => {
          if (item.createdAt) {
            activities.push({
              type: 'Galeri',
              action: 'Yeni resim eklendi',
              time: formatTimeAgo(item.createdAt),
              date: parseUTCDate(item.createdAt),
              href: '/admin/galeri',
            });
          }
        });
      }

      // En son 5 aktiviteyi tarihe göre sırala
      activities.sort((a, b) => b.date.getTime() - a.date.getTime());
      setRecentActivities(activities.slice(0, 5));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Hoş geldiniz, Admin</p>
        </div>
        <div className="text-sm text-slate-500 bg-white/70 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
          {currentDate || 'Yükleniyor...'}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 hover:border-indigo-400 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">{stat.title}</p>
                {isLoading ? (
                  <p className="text-3xl font-black text-slate-900">...</p>
                ) : (
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                )}
              </div>
              <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-md`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-slate-200">
        <h2 className="text-xl font-black text-slate-900 mb-4">Son Aktiviteler</h2>
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-slate-500">Yükleniyor...</p>
            </div>
          ) : recentActivities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">Henüz aktivite yok</p>
            </div>
          ) : (
            recentActivities.map((activity, index) => {
              const content = (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-slate-900">{activity.type}</p>
                      <p className="text-sm text-slate-600">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500">{activity.time}</span>
                </div>
              );

              return activity.href ? (
                <Link key={index} href={activity.href}>
                  {content}
                </Link>
              ) : (
                <div key={index}>{content}</div>
              );
            })
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-slate-200">
        <h2 className="text-xl font-black text-slate-900 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/dil-okullari/yeni"
            className="p-4 bg-purple-50 border border-purple-200 rounded-2xl hover:bg-purple-100 transition-colors text-center shadow-sm"
          >
            <div className="text-2xl mb-2">➕</div>
            <p className="font-semibold text-slate-900">Yeni Dil Okulu</p>
          </Link>
          <Link
            href="/admin/blog/yeni"
            className="p-4 bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100 transition-colors text-center shadow-sm"
          >
            <div className="text-2xl mb-2">📝</div>
            <p className="font-semibold text-slate-900">Yeni Blog Yazısı</p>
          </Link>
          <Link
            href="/admin/universite/yeni"
            className="p-4 bg-blue-50 border border-blue-200 rounded-2xl hover:bg-blue-100 transition-colors text-center shadow-sm"
          >
            <div className="text-2xl mb-2">🏛️</div>
            <p className="font-semibold text-slate-900">Yeni Üniversite</p>
          </Link>
          <Link
            href="/admin/galeri/yeni"
            className="p-4 bg-pink-50 border border-pink-200 rounded-2xl hover:bg-pink-100 transition-colors text-center shadow-sm"
          >
            <div className="text-2xl mb-2">🖼️</div>
            <p className="font-semibold text-slate-900">Galeriye Resim Ekle</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
