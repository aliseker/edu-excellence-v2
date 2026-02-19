'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '@/services/api';

interface UniversityFilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  programType: string;
  country: string;
  city: string;
}

interface CountryOption {
  id: number;
  value: string;
  label: string;
}

interface CityOption {
  id: number;
  name: string;
}

const UniversityFilter = ({ onFilterChange }: UniversityFilterProps) => {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    programType: '',
    country: '',
    city: ''
  });

  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  const programTypes = [
    { value: 'universite', label: 'Üniversite' },
    { value: 'dil-okulu', label: 'Dil Okulu' },
    { value: 'master-mba', label: 'Master/MBA' },
    { value: 'yaz-okulu', label: 'Yaz Okulu' },
    { value: 'lise', label: 'Lise' },
    { value: 'staj', label: 'Staj' }
  ];

  // Ülkeleri yükle
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoadingCountries(true);
        const data = (await apiService.getLocationCountries()) as CountryOption[] | null | undefined;
        setCountries(data ?? []);
      } catch (error) {
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };

    loadCountries();
  }, []);

  // Ülke seçildiğinde şehirleri yükle
  useEffect(() => {
    const loadCities = async () => {
      if (!filters.country) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        const countryId = parseInt(filters.country);
        if (!isNaN(countryId)) {
          const data = (await apiService.getLocationCities(countryId)) as CityOption[] | null | undefined;
          setCities(data ?? []);
        } else {
          setCities([]);
        }
      } catch (error) {
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    loadCities();
  }, [filters.country]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    
    // Ülke değiştiğinde şehri temizle
    if (key === 'country') {
      newFilters.city = '';
    }
    
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filtreleri query parametre olarak oluştur
    const params = new URLSearchParams();
    
    if (filters.programType) {
      params.append('programType', filters.programType);
    }
    if (filters.country) {
      const selectedCountry = countries.find(c => c.id.toString() === filters.country);
      if (selectedCountry) {
        params.append('country', selectedCountry.label);
      }
    }
    if (filters.city) {
      const selectedCity = cities.find(c => c.id.toString() === filters.city);
      if (selectedCity) {
        params.append('city', selectedCity.name);
      }
    }

    // Arama sayfasına yönlendir
    const queryString = params.toString();
    if (queryString) {
      router.push(`/arama?${queryString}`);
    } else {
      router.push('/arama');
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      programType: '',
      country: '',
      city: ''
    };
    setFilters(clearedFilters);
    setCities([]);
    onFilterChange?.(clearedFilters);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Program Tipi */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Program Tipi
          </label>
          <div className="relative">
            <select
              value={filters.programType}
              onChange={(e) => handleFilterChange('programType', e.target.value)}
              className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 cursor-pointer hover:border-purple-300 transition-colors"
            >
              <option value="">Seçiniz</option>
              {programTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
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
              disabled={loadingCountries}
              className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 cursor-pointer hover:border-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">{loadingCountries ? 'Yükleniyor...' : 'Seçiniz'}</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id.toString()}>
                  {country.label}
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
              disabled={!filters.country || loadingCities}
              className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 cursor-pointer hover:border-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {!filters.country 
                  ? 'Önce ülke seçiniz' 
                  : loadingCities 
                    ? 'Yükleniyor...' 
                    : 'Seçiniz'}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id.toString()}>
                  {city.name}
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
            type="submit"
            className="w-full bg-purple-600 text-white font-black uppercase tracking-wider py-4 px-6 border-4 border-purple-800 hover:bg-purple-700 hover:border-purple-900 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
          >
            Ara
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.programType || filters.country || filters.city) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Aktif Filtreler:</span>
            {filters.programType && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                Program: {programTypes.find(t => t.value === filters.programType)?.label || filters.programType}
                <button
                  type="button"
                  onClick={() => handleFilterChange('programType', '')}
                  className="hover:text-purple-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {filters.country && (
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                Ülke: {countries.find(c => c.id.toString() === filters.country)?.label || filters.country}
                <button
                  type="button"
                  onClick={() => handleFilterChange('country', '')}
                  className="hover:text-violet-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {filters.city && (
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                Şehir: {cities.find(c => c.id.toString() === filters.city)?.name || filters.city}
                <button
                  type="button"
                  onClick={() => handleFilterChange('city', '')}
                  className="hover:text-pink-600 font-bold"
                >
                  ×
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium underline"
            >
              Tümünü Temizle
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default UniversityFilter;

