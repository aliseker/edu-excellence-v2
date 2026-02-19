'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/utils/format';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const country = searchParams.get('country') || '';
  const city = searchParams.get('city') || '';
  const programType = searchParams.get('programType') || '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Program tipi etiketleri
  const programTypeLabels: Record<string, string> = {
    'universite': 'Üniversite',
    'dil-okulu': 'Dil Okulu',
    'master-mba': 'Master/MBA',
    'yaz-okulu': 'Yaz Okulu',
    'lise': 'Lise',
    'staj': 'Staj'
  };

  // Program tipi route'ları
  const programTypeRoutes: Record<string, string> = {
    'universite': '/universite',
    'dil-okulu': '/dil-okulu',
    'master-mba': '/master-mba',
    'yaz-okulu': '/yaz-okulu',
    'lise': '/lise',
    'staj': '/staj'
  };

  // Filtrelere göre sonuçları oluştur
  const hasFilters = country || city || programType || searchQuery;
  
  const searchResults: Array<{
    type: string;
    title: string;
    description: string;
    href: string;
  }> = [];

  // Program tipi seçildiyse direkt o sayfaya yönlendir
  if (programType && programTypeRoutes[programType]) {
    const baseRoute = programTypeRoutes[programType];
    const countryPath = country ? `/${slugify(country)}` : '';
    const cityQuery = city ? `?city=${slugify(city)}` : '';
    
    searchResults.push({
      type: 'program',
      title: `${programTypeLabels[programType]} Programları${country ? ` - ${country}` : ''}`,
      description: `${country || 'Seçilen ülkede'} ${programTypeLabels[programType].toLowerCase()} programları`,
      href: `${baseRoute}${countryPath}${cityQuery}`
    });
  } else if (country || city) {
    // Program tipi seçilmediyse tüm program tiplerini göster
    if (!programType) {
      searchResults.push({
        type: 'program',
        title: `${country || 'Seçilen'} Üniversite Programları`,
        description: `${country || 'Seçilen ülkede'} lisans ve yüksek lisans programları`,
        href: `/universite${country ? `/${slugify(country)}` : ''}${city ? `?city=${slugify(city)}` : ''}`
      });

      searchResults.push({
        type: 'program',
        title: `${country || 'Seçilen'} Dil Okulu Programları`,
        description: `${country || 'Seçilen ülkede'} dil eğitimi programları`,
        href: `/dil-okulu${country ? `/${slugify(country)}` : ''}${city ? `?city=${slugify(city)}` : ''}`
      });

      searchResults.push({
        type: 'program',
        title: `${country || 'Seçilen'} Master/MBA Programları`,
        description: `${country || 'Seçilen ülkede'} master ve MBA programları`,
        href: `/master-mba${country ? `/${slugify(country)}` : ''}${city ? `?city=${slugify(city)}` : ''}`
      });

      searchResults.push({
        type: 'program',
        title: `${country || 'Seçilen'} Yaz Okulu Programları`,
        description: `${country || 'Seçilen ülkede'} yaz okulu programları`,
        href: `/yaz-okulu${country ? `/${slugify(country)}` : ''}${city ? `?city=${slugify(city)}` : ''}`
      });
    }
  }

  // Metin araması için örnek sonuçlar
  if (searchQuery && !country && !city && !programType) {
    searchResults.push(
      { type: 'program', title: 'Kanada Üniversite Programları', description: 'Kanada\'da lisans ve yüksek lisans programları', href: '/universite/kanada' },
      { type: 'program', title: 'İngiltere Dil Okulu', description: 'İngiltere\'de İngilizce dil eğitimi programları', href: '/dil-okulu/ingiltere' },
      { type: 'page', title: 'Hakkımızda', description: 'Edu-Excellence hakkında bilgiler', href: '/hakkimizda' }
    );
  }

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

        {/* Aktif Filtreler */}
        {hasFilters && (
          <div className="mb-6 p-4 bg-white rounded-xl shadow-md">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Aktif Filtreler:</h3>
            <div className="flex flex-wrap gap-2">
              {country && (
                <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
                  Ülke: {country}
                </span>
              )}
              {city && (
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                  Şehir: {city}
                </span>
              )}
              {programType && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Program: {programTypeLabels[programType] || programType}
                </span>
              )}
              {searchQuery && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Arama: {searchQuery}
                </span>
              )}
            </div>
          </div>
        )}

        {hasFilters && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {searchQuery ? `"${searchQuery}" için sonuçlar` : 'Filtrelere göre programlar'}
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

        {!hasFilters && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Arama yapmak için yukarıdaki formu kullanın veya anasayfadaki hızlı arama bölümünden filtreleri seçin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
