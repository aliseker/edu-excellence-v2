'use client';

import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
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
  ];

  const recentActivities = [
    { type: 'Dil Okulu', action: 'Yeni kayıt eklendi', time: '2 saat önce' },
    { type: 'Blog', action: 'Yeni yazı yayınlandı', time: '5 saat önce' },
    { type: 'Üniversite', action: 'Kayıt güncellendi', time: '1 gün önce' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Hoş geldiniz, Admin</p>
        </div>
        <div className="text-sm text-slate-500 bg-white/70 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
          {new Date().toLocaleDateString('tr-TR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
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
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
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
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-slate-900">{activity.type}</p>
                  <p className="text-sm text-slate-600">{activity.action}</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-slate-200">
        <h2 className="text-xl font-black text-slate-900 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/dil-okullari?action=create"
            className="p-4 bg-purple-50 border border-purple-200 rounded-2xl hover:bg-purple-100 transition-colors text-center shadow-sm"
          >
            <div className="text-2xl mb-2">➕</div>
            <p className="font-semibold text-slate-900">Yeni Dil Okulu</p>
          </Link>
          <Link
            href="/admin/blog?action=create"
            className="p-4 bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100 transition-colors text-center shadow-sm"
          >
            <div className="text-2xl mb-2">📝</div>
            <p className="font-semibold text-slate-900">Yeni Blog Yazısı</p>
          </Link>
          <Link
            href="/admin/universite?action=create"
            className="p-4 bg-blue-50 border border-blue-200 rounded-2xl hover:bg-blue-100 transition-colors text-center shadow-sm"
          >
            <div className="text-2xl mb-2">🏛️</div>
            <p className="font-semibold text-slate-900">Yeni Üniversite</p>
          </Link>
          <Link
            href="/admin/galeri?action=upload"
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
