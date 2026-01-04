'use client';

import { useState, useMemo } from 'react';

interface UniversityFilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  educationLanguage: string;
  country: string;
  city: string;
  search: string;
}

// Ülke-Şehir mapping'i
const countryCities: Record<string, string[]> = {
  'Kanada': ['Toronto', 'Vancouver', 'Montreal'],
  'İngiltere': ['Londra', 'Manchester', 'Birmingham', 'Cambridge', 'Brighton'],
  'Amerika': ['New York', 'Boston', 'Los Angeles'],
  'Almanya': ['Berlin', 'Münih'],
  'İtalya': ['Roma', 'Milano'],
  'Fransa': ['Paris', 'Nice'],
  'Avustralya': ['Sydney'],
  'İrlanda': ['Dublin'],
  'İspanya': ['Barcelona', 'Madrid'],
  'Hollanda': [],
  'Malta': ['Malta'],
  'İsviçre': ['Zürih'],
};

const UniversityFilter = ({ onFilterChange }: UniversityFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    educationLanguage: '',
    country: '',
    city: '',
    search: ''
  });

  const countries = [
    'Kanada', 'İngiltere', 'Amerika', 'Almanya', 'İtalya', 
    'Fransa', 'Avustralya', 'İrlanda', 'İspanya', 'Hollanda', 'Malta', 'İsviçre'
  ];

  // Seçili ülkeye göre şehirleri filtrele
  const availableCities = useMemo(() => {
    if (!filters.country) {
      return [];
    }
    return countryCities[filters.country] || [];
  }, [filters.country]);

  const languages = ['İngilizce', 'Almanca', 'Fransızca', 'İtalyanca', 'İspanyolca'];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    // Ülke değiştiğinde şehri sıfırla
    if (key === 'country') {
      newFilters.city = '';
    }
    setFilters(newFilters);
    // Ülke değiştiğinde onFilterChange çağırma (sadece Ara butonunda çağrılacak)
  };

  const clearFilters = () => {
    const clearedFilters = {
      educationLanguage: '',
      country: '',
      city: '',
      search: ''
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  // Arama kutusunda yazı yazınca otomatik filtreleme
  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    // Arama yazıldığında otomatik filtreleme yap
    if (value.trim() || filters.educationLanguage || filters.country || filters.city) {
      onFilterChange?.(newFilters);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
      {/* Arama Kutusu */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Program Ara
        </label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Okul veya program adı yazın..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 placeholder-gray-400"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Eğitim Dili */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Eğitim Dili
          </label>
          <div className="relative">
            <select
              value={filters.educationLanguage}
              onChange={(e) => handleFilterChange('educationLanguage', e.target.value)}
              className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 cursor-pointer hover:border-purple-300 transition-colors"
            >
              <option value="">Seçiniz</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Ülke */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ülke
          </label>
          <div className="relative">
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
              className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 cursor-pointer hover:border-purple-300 transition-colors"
            >
              <option value="">Seçiniz</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Şehir */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Şehir
          </label>
          <div className="relative">
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              disabled={!filters.country}
              className={`w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 cursor-pointer hover:border-purple-300 transition-colors ${
                !filters.country ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <option value="">{filters.country ? 'Seçiniz' : 'Önce ülke seçiniz'}</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Ara Butonu */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange?.(filters)}
            className="w-full bg-purple-600 text-white font-black uppercase tracking-wider py-4 px-6 border-4 border-purple-800 hover:bg-purple-700 hover:border-purple-900 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
          >
            Ara
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.educationLanguage || filters.country || filters.city || filters.search) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Aktif Filtreler:</span>
            {filters.educationLanguage && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                Dil: {filters.educationLanguage}
                <button
                  onClick={() => handleFilterChange('educationLanguage', '')}
                  className="hover:text-purple-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {filters.country && (
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                Ülke: {filters.country}
                <button
                  onClick={() => handleFilterChange('country', '')}
                  className="hover:text-violet-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {filters.city && (
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                Şehir: {filters.city}
                <button
                  onClick={() => handleFilterChange('city', '')}
                  className="hover:text-pink-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {filters.search && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                Arama: {filters.search}
                <button
                  onClick={() => handleSearchChange('')}
                  className="hover:text-blue-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium underline"
            >
              Tümünü Temizle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityFilter;

