'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import UniversityFilter from './UniversityFilter';

interface Program {
  id: number;
  title: string;
  country: string;
  city: string;
  type: string;
  href: string;
  icon: string;
  gradient: string;
  language: string;
}

const FilterSection = () => {
  const [activeFilters, setActiveFilters] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  // Tüm programlar - Navbar'daki verilerden
  const allPrograms: Program[] = useMemo(() => {
    const programs: Program[] = [];
    let id = 1;

    // Ülke isimleri mapping
    const countryNames: Record<string, string> = {
      ingiltere: 'İngiltere',
      amerika: 'Amerika',
      kanada: 'Kanada',
      almanya: 'Almanya',
      italya: 'İtalya',
      irlanda: 'İrlanda',
      malta: 'Malta',
      avustralya: 'Avustralya',
      fransa: 'Fransa',
      ispanya: 'İspanya',
      isvicre: 'İsviçre',
    };

    // Şehir çıkarma fonksiyonu
    const extractCity = (title: string, href: string): string => {
      const cityMappings: Record<string, string> = {
        'london': 'Londra',
        'birmingham': 'Birmingham',
        'manchester': 'Manchester',
        'cambridge': 'Cambridge',
        'brighton': 'Brighton',
        'new-york': 'New York',
        'boston': 'Boston',
        'los-angeles': 'Los Angeles',
        'toronto': 'Toronto',
        'vancouver': 'Vancouver',
        'berlin': 'Berlin',
        'munich': 'Münih',
        'munih': 'Münih',
        'rome': 'Roma',
        'roma': 'Roma',
        'milano': 'Milano',
        'milan': 'Milano',
        'dublin': 'Dublin',
        'malta': 'Malta',
        'sydney': 'Sydney',
        'paris': 'Paris',
        'nice': 'Nice',
        'barcelona': 'Barcelona',
        'madrid': 'Madrid',
        'zurih': 'Zürih',
      };

      const hrefLower = href.toLowerCase();
      for (const [key, city] of Object.entries(cityMappings)) {
        if (hrefLower.includes(key)) {
          return city;
        }
      }

      const titleLower = title.toLowerCase();
      for (const [key, city] of Object.entries(cityMappings)) {
        if (titleLower.includes(key) || titleLower.includes(city.toLowerCase())) {
          return city;
        }
      }

      if (titleLower.includes('new york') || titleLower.includes('nyu')) return 'New York';
      if (titleLower.includes('london') || titleLower.includes('londra')) return 'Londra';
      if (titleLower.includes('boston')) return 'Boston';
      if (titleLower.includes('toronto')) return 'Toronto';
      if (titleLower.includes('vancouver')) return 'Vancouver';
      if (titleLower.includes('berlin')) return 'Berlin';
      if (titleLower.includes('munich') || titleLower.includes('münih')) return 'Münih';
      if (titleLower.includes('rome') || titleLower.includes('roma')) return 'Roma';
      if (titleLower.includes('milan') || titleLower.includes('milano')) return 'Milano';

      return '';
    };

    // Üniversiteler
    const universityCountries: Record<string, Array<{ title: string; href: string }>> = {
      ingiltere: [
        { title: 'Birmingham City University', href: '/universite/ingiltere/birmingham-city-university' },
        { title: 'University of Birmingham', href: '/universite/ingiltere/university-of-birmingham' },
        { title: 'King\'s College London', href: '/universite/ingiltere/kings-college-london' },
        { title: 'University College London (UCL)', href: '/universite/ingiltere/university-college-london' },
        { title: 'London School of Economics (LSE)', href: '/universite/ingiltere/london-school-of-economics' },
        { title: 'University of Manchester', href: '/universite/ingiltere/university-of-manchester' },
      ],
      amerika: [
        { title: 'New York University (NYU)', href: '/universite/amerika/new-york-university' },
        { title: 'Columbia University', href: '/universite/amerika/columbia-university' },
        { title: 'University of California, Los Angeles (UCLA)', href: '/universite/amerika/ucla' },
        { title: 'Stanford University', href: '/universite/amerika/stanford-university' },
        { title: 'Harvard University', href: '/universite/amerika/harvard-university' },
        { title: 'Massachusetts Institute of Technology (MIT)', href: '/universite/amerika/mit' },
      ],
      kanada: [
        { title: 'University of Toronto', href: '/universite/kanada/university-of-toronto' },
        { title: 'University of British Columbia (UBC)', href: '/universite/kanada/ubc' },
      ],
      almanya: [
        { title: 'Humboldt University of Berlin', href: '/universite/almanya/humboldt-university-berlin' },
        { title: 'Free University of Berlin', href: '/universite/almanya/free-university-berlin' },
        { title: 'Technical University of Munich', href: '/universite/almanya/technical-university-munich' },
        { title: 'Ludwig Maximilian University of Munich', href: '/universite/almanya/lmu-munich' },
      ],
      italya: [
        { title: 'Sapienza University of Rome', href: '/universite/italya/sapienza-university-rome' },
        { title: 'Bocconi University', href: '/universite/italya/bocconi-university' },
      ],
    };

    Object.entries(universityCountries).forEach(([countryKey, items]) => {
      items.forEach(item => {
        programs.push({
          id: id++,
          title: item.title,
          country: countryNames[countryKey] || countryKey,
          city: extractCity(item.title, item.href),
          type: 'Üniversite',
          href: item.href,
          icon: '🎓',
          gradient: 'from-red-500 to-rose-600',
          language: 'İngilizce'
        });
      });
    });

    // Dil Okulları
    const languageSchoolCountries: Record<string, Array<{ title: string; href: string }>> = {
      ingiltere: [
        { title: 'EC English - London', href: '/dil-okulu/ingiltere/ec-english-london' },
        { title: 'Kaplan International - London', href: '/dil-okulu/ingiltere/kaplan-international-london' },
        { title: 'EC English - Cambridge', href: '/dil-okulu/ingiltere/ec-english-cambridge' },
        { title: 'EC English - Brighton', href: '/dil-okulu/ingiltere/ec-english-brighton' },
      ],
      amerika: [
        { title: 'LSI Language Studies International - New York', href: '/dil-okulu/amerika/lsi-language-studies-international-new-york' },
        { title: 'Kaplan International - New York', href: '/dil-okulu/amerika/kaplan-international-new-york' },
        { title: 'LSI Language Studies International - Boston', href: '/dil-okulu/amerika/lsi-language-studies-international-boston' },
        { title: 'EC English - Boston', href: '/dil-okulu/amerika/ec-english-boston' },
        { title: 'Kaplan International - Los Angeles', href: '/dil-okulu/amerika/kaplan-international-los-angeles' },
        { title: 'EC English - Los Angeles', href: '/dil-okulu/amerika/ec-english-los-angeles' },
      ],
      kanada: [
        { title: 'ILAC - Toronto', href: '/dil-okulu/kanada/ilac-toronto' },
        { title: 'EC English - Toronto', href: '/dil-okulu/kanada/ec-english-toronto' },
        { title: 'ILAC - Vancouver', href: '/dil-okulu/kanada/ilac-vancouver' },
        { title: 'Kaplan International - Vancouver', href: '/dil-okulu/kanada/kaplan-international-vancouver' },
      ],
      irlanda: [
        { title: 'EC English - Dublin', href: '/dil-okulu/irlanda/ec-english-dublin' },
      ],
      malta: [
        { title: 'EC English - Malta', href: '/dil-okulu/malta/ec-english-malta' },
      ],
      avustralya: [
        { title: 'EC English - Sydney', href: '/dil-okulu/avustralya/ec-english-sydney' },
      ],
    };

    Object.entries(languageSchoolCountries).forEach(([countryKey, items]) => {
      items.forEach(item => {
        programs.push({
          id: id++,
          title: item.title,
          country: countryNames[countryKey] || countryKey,
          city: extractCity(item.title, item.href),
          type: 'Dil Okulu',
          href: item.href,
          icon: '🌍',
          gradient: 'from-blue-500 to-indigo-600',
          language: 'İngilizce'
        });
      });
    });

    // Yaz Okulları
    const summerSchoolCountries: Record<string, Array<{ title: string; href: string }>> = {
      ingiltere: [
        { title: 'Kings London Central', href: '/yaz-okulu/ingiltere/kings-london-central' },
        { title: 'EC English London', href: '/yaz-okulu/ingiltere/ec-english-london' },
        { title: 'Cambridge Yaz Okulu', href: '/yaz-okulu/ingiltere/cambridge-yaz-okulu' },
        { title: 'Brighton Yaz Okulu', href: '/yaz-okulu/ingiltere/brighton-yaz-okulu' },
      ],
      amerika: [
        { title: 'New York Yaz Okulu', href: '/yaz-okulu/amerika/new-york-yaz-okulu' },
        { title: 'Los Angeles Yaz Okulu', href: '/yaz-okulu/amerika/los-angeles-yaz-okulu' },
      ],
      kanada: [
        { title: 'Toronto Yaz Okulu', href: '/yaz-okulu/kanada/toronto-yaz-okulu' },
        { title: 'Vancouver Yaz Okulu', href: '/yaz-okulu/kanada/vancouver-yaz-okulu' },
      ],
      almanya: [
        { title: 'Berlin Mitte Yaz Okulu', href: '/yaz-okulu/almanya/berlin-mitte' },
        { title: 'Berlin Sprachcaffe', href: '/yaz-okulu/almanya/berlin-sprachcaffe' },
        { title: 'Münih Yaz Okulu', href: '/yaz-okulu/almanya/munih-yaz-okulu' },
      ],
    };

    Object.entries(summerSchoolCountries).forEach(([countryKey, items]) => {
      items.forEach(item => {
        programs.push({
          id: id++,
          title: item.title,
          country: countryNames[countryKey] || countryKey,
          city: extractCity(item.title, item.href),
          type: 'Yaz Okulu',
          href: item.href,
          icon: '☀️',
          gradient: 'from-orange-500 to-yellow-600',
          language: 'İngilizce'
        });
      });
    });

    // Master/MBA
    const masterMBACountries: Record<string, Array<{ title: string; href: string }>> = {
      amerika: [
        { title: 'Berkeley College', href: '/master-mba/amerika/berkeley-college' },
        { title: 'New York University (NYU)', href: '/master-mba/amerika/nyu' },
      ],
      ingiltere: [
        { title: 'London Business School', href: '/master-mba/ingiltere/london-business-school' },
        { title: 'Imperial College Business School', href: '/master-mba/ingiltere/imperial-college-business' },
        { title: 'Cambridge Judge Business School', href: '/master-mba/ingiltere/cambridge-judge-business' },
      ],
      italya: [
        { title: 'Bocconi University', href: '/master-mba/italya/bocconi-university' },
        { title: 'Sapienza University of Rome', href: '/master-mba/italya/sapienza-university-rome' },
      ],
      almanya: [
        { title: 'Humboldt University of Berlin', href: '/master-mba/almanya/humboldt-university-berlin' },
        { title: 'Technical University of Munich', href: '/master-mba/almanya/technical-university-munich' },
      ],
    };

    Object.entries(masterMBACountries).forEach(([countryKey, items]) => {
      items.forEach(item => {
        programs.push({
          id: id++,
          title: item.title,
          country: countryNames[countryKey] || countryKey,
          city: extractCity(item.title, item.href),
          type: 'Master/MBA',
          href: item.href,
          icon: '💼',
          gradient: 'from-purple-500 to-violet-600',
          language: 'İngilizce'
        });
      });
    });

    // Lise
    const highSchoolCountries: Record<string, Array<{ title: string; href: string }>> = {
      amerika: [
        { title: 'Beverly High School', href: '/lise/amerika/beverly-high-school' },
        { title: 'Harvard-Westlake School', href: '/lise/amerika/harvard-westlake-school' },
        { title: 'Stuyvesant High School', href: '/lise/amerika/stuyvesant-high-school' },
      ],
      kanada: [
        { title: 'Upper Canada College', href: '/lise/kanada/upper-canada-college' },
        { title: 'St. George\'s School', href: '/lise/kanada/st-georges-school-vancouver' },
      ],
      ingiltere: [
        { title: 'Eton College', href: '/lise/ingiltere/eton-college' },
        { title: 'Westminster School', href: '/lise/ingiltere/westminster-school' },
      ],
    };

    Object.entries(highSchoolCountries).forEach(([countryKey, items]) => {
      items.forEach(item => {
        programs.push({
          id: id++,
          title: item.title,
          country: countryNames[countryKey] || countryKey,
          city: extractCity(item.title, item.href),
          type: 'Lise',
          href: item.href,
          icon: '📚',
          gradient: 'from-green-500 to-emerald-600',
          language: 'İngilizce'
        });
      });
    });

    return programs;
  }, []);

  // Filtreleme fonksiyonu
  const handleFilterChange = (filters: any) => {
    const hasActiveFilters = filters.educationLanguage || filters.country || filters.city || filters.search;
    setActiveFilters(filters);
    setShowResults(!!hasActiveFilters);
  };

  // Filtrelenmiş programlar
  const filteredPrograms = useMemo(() => {
    if (!activeFilters || !showResults) {
      return [];
    }

    return allPrograms.filter(program => {
      // Arama filtresi (başlıkta ara)
      if (activeFilters.search && activeFilters.search.trim() !== '') {
        const searchTerm = activeFilters.search.trim().toLowerCase();
        const titleMatch = program.title.toLowerCase().includes(searchTerm);
        const countryMatch = program.country.toLowerCase().includes(searchTerm);
        const cityMatch = program.city?.toLowerCase().includes(searchTerm) || false;
        const typeMatch = program.type.toLowerCase().includes(searchTerm);
        
        if (!titleMatch && !countryMatch && !cityMatch && !typeMatch) {
          return false;
        }
      }

      // Dil filtresi
      if (activeFilters.educationLanguage && activeFilters.educationLanguage.trim() !== '') {
        if (program.language !== activeFilters.educationLanguage) {
          return false;
        }
      }

      // Ülke filtresi
      if (activeFilters.country && activeFilters.country.trim() !== '') {
        if (program.country !== activeFilters.country) {
          return false;
        }
      }

      // Şehir filtresi
      if (activeFilters.city && activeFilters.city.trim() !== '') {
        const filterCity = activeFilters.city.trim();
        const programCity = program.city?.trim() || '';
        if (programCity.toLowerCase() !== filterCity.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [activeFilters, showResults, allPrograms]);

  // En çok aranan programlar (default gösterim)
  const featuredPrograms: Program[] = useMemo(() => [
    {
      id: 1,
      title: 'University of Toronto',
      country: 'Kanada',
      city: 'Toronto',
      type: 'Üniversite',
      href: '/universite/kanada/university-of-toronto',
      icon: '🎓',
      gradient: 'from-red-500 to-rose-600',
      language: 'İngilizce'
    },
    {
      id: 2,
      title: 'EC English - London',
      country: 'İngiltere',
      city: 'Londra',
      type: 'Dil Okulu',
      href: '/dil-okulu/ingiltere/ec-english-london',
      icon: '🌍',
      gradient: 'from-blue-500 to-indigo-600',
      language: 'İngilizce'
    },
    {
      id: 3,
      title: 'Kings London Central',
      country: 'İngiltere',
      city: 'Londra',
      type: 'Yaz Okulu',
      href: '/yaz-okulu/ingiltere/kings-london-central',
      icon: '☀️',
      gradient: 'from-orange-500 to-yellow-600',
      language: 'İngilizce'
    },
    {
      id: 4,
      title: 'London Business School',
      country: 'İngiltere',
      city: 'Londra',
      type: 'Master/MBA',
      href: '/master-mba/ingiltere/london-business-school',
      icon: '💼',
      gradient: 'from-purple-500 to-violet-600',
      language: 'İngilizce'
    },
    {
      id: 5,
      title: 'Harvard University',
      country: 'Amerika',
      city: 'Cambridge',
      type: 'Üniversite',
      href: '/universite/amerika/harvard-university',
      icon: '🎓',
      gradient: 'from-red-600 to-crimson-700',
      language: 'İngilizce'
    },
    {
      id: 6,
      title: 'Eton College',
      country: 'İngiltere',
      city: '',
      type: 'Lise',
      href: '/lise/ingiltere/eton-college',
      icon: '📚',
      gradient: 'from-green-500 to-emerald-600',
      language: 'İngilizce'
    },
  ], []);

  // Gösterilecek programlar
  const displayPrograms = showResults ? filteredPrograms : featuredPrograms;
  const isFiltered = showResults;

  return (
    <section className="bg-gradient-to-b from-white via-purple-50/30 to-white py-16 border-y-4 border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filtre Bölümü */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-black text-sm uppercase tracking-wider border-4 border-purple-800 transform -skew-x-12 shadow-lg mb-6">
              <span className="transform skew-x-12 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Hızlı Arama
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-tight">
              Size Uygun Programı
              <br />
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-purple-600 transform -skew-x-12 -z-10 opacity-20"></span>
                <span className="relative text-purple-600">BULUN</span>
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Filtreleme seçeneklerimizle hayalinizdeki eğitim programını kolayca keşfedin
            </p>
          </div>
          
          <UniversityFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Program Sonuçları / En Çok Aranan Programlar */}
        <div className={`mt-16 pt-16 border-t-4 border-gray-900`}>
          <div className="text-center mb-12">
            <div className={`inline-flex items-center px-5 py-2.5 ${isFiltered ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-purple-600 to-violet-600'} text-white font-black text-sm uppercase tracking-wider border-4 border-purple-800 transform -skew-x-12 shadow-lg mb-6`}>
              <span className="transform skew-x-12 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  {isFiltered ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  )}
                </svg>
                {isFiltered ? `${filteredPrograms.length} Program Bulundu` : 'En Çok Aranan Programlar'}
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-tight">
              {isFiltered ? 'ARAMA SONUÇLARI' : 'EN ÇOK ARANAN'}
              <br />
              <span className="relative inline-block">
                <span className={`absolute inset-0 ${isFiltered ? 'bg-green-600' : 'bg-violet-600'} transform -skew-x-12 -z-10 opacity-20`}></span>
                <span className={`relative ${isFiltered ? 'text-green-600' : 'text-violet-600'}`}>
                  {isFiltered ? 'SONUÇLAR' : 'PROGRAMLAR'}
                </span>
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              {isFiltered 
                ? `Filtrelerinize uygun ${filteredPrograms.length} program bulundu`
                : 'Dünyanın en prestijli okullarından seçtiğimiz örnekler'
              }
            </p>
          </div>
          
          {/* Program Grid */}
          {displayPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {displayPrograms.map((program) => (
                <Link
                  key={program.id}
                  href={program.href}
                  className="group bg-white border-4 border-gray-900 hover:border-purple-600 transition-all duration-200 shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0_0_rgba(147,51,234,0.3)] hover:-translate-x-1 hover:-translate-y-1 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${program.gradient} flex items-center justify-center text-2xl border-4 border-gray-900 group-hover:rotate-6 transition-transform duration-200`}>
                      {program.icon}
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-black uppercase tracking-wider border-2 border-purple-600">
                      {program.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-purple-600 transition-colors mb-2 uppercase tracking-tight">
                    {program.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 font-bold text-sm mb-1">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {program.country} {program.city && `- ${program.city}`}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t-2 border-gray-200 flex items-center justify-between">
                    <span className="text-purple-600 font-black text-sm group-hover:text-purple-700 uppercase tracking-wide">
                      Detayları Gör
                    </span>
                    <svg className="w-5 h-5 text-purple-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block px-8 py-6 bg-gray-100 border-4 border-gray-900 mb-4">
                <p className="text-2xl font-black text-gray-900 uppercase">
                  Filtrelerinize uygun program bulunamadı
                </p>
                <p className="text-gray-600 mt-2">
                  Lütfen farklı filtreler deneyin
                </p>
              </div>
            </div>
          )}

          {/* Tüm Programları Gör Butonu */}
          <div className="text-center">
            <Link
              href="/universite"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 text-white font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 shadow-[6px_6px_0_0_rgba(0,0,0,0.2)]"
            >
              Tüm Programları Keşfet
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
