'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Örnek arama sonuçları - gerçek API entegrasyonu yapılacak
  const searchResults = searchQuery ? [
    { type: 'program', title: 'Kanada Üniversite Programları', description: 'Kanada\'da lisans ve yüksek lisans programları', href: '/universite?country=kanada' },
    { type: 'program', title: 'İngiltere Dil Okulu', description: 'İngiltere\'de İngilizce dil eğitimi programları', href: '/dil-okulu?country=ingiltere' },
    { type: 'page', title: 'Hakkımızda', description: 'Edu-Excellence hakkında bilgiler', href: '/hakkimizda' },
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Arama</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ara..."
              className="flex-1 px-6 py-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 text-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Ara
            </button>
          </div>
        </form>

        {searchQuery && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              "{searchQuery}" için sonuçlar
            </h2>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <Link
                    key={index}
                    href={result.href}
                    className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-purple-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{result.title}</h3>
                        <p className="text-gray-600">{result.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {result.type === 'program' ? 'Program' : 'Sayfa'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Sonuç bulunamadı.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
