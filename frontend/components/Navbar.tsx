'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { slugify } from '@/utils/format';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const [languageSchoolDropdown, setLanguageSchoolDropdown] = useState<
    Array<{ title: string; href: string; submenu?: Array<{ title: string; href: string }> }>
  >([]);
  const [summerSchoolDropdown, setSummerSchoolDropdown] = useState<
    Array<{ title: string; href: string; submenu?: Array<{ title: string; href: string }> }>
  >([]);
  const [universityDropdown, setUniversityDropdown] = useState<
    Array<{ title: string; href: string; submenu?: Array<{ title: string; href: string }> }>
  >([]);
  const [masterMbaDropdown, setMasterMbaDropdown] = useState<
    Array<{ title: string; href: string; submenu?: Array<{ title: string; href: string }> }>
  >([]);
  const [internshipDropdown, setInternshipDropdown] = useState<
    Array<{ title: string; href: string }>
  >([]);

  useEffect(() => {
    const fetchLanguageSchools = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.languageSchools}`);
        const data = await res.json();
        const countryMap = new Map<string, { name: string; slug: string; schools: Array<{ title: string; href: string }> }>();

        data.forEach((school: any) => {
          const countrySlug = school.countrySlug || slugify(school.countryName || '');
          if (!countrySlug) {
            return;
          }
          const countryName = school.countryName || countrySlug;
          const schoolHref = `/dil-okulu/${countrySlug}/${school.id}`;

          if (!countryMap.has(countrySlug)) {
            countryMap.set(countrySlug, { name: countryName, slug: countrySlug, schools: [] });
          }
          countryMap.get(countrySlug)!.schools.push({
            title: school.name,
            href: schoolHref
          });
        });

        const dropdown = Array.from(countryMap.values())
          .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
          .map((country) => ({
            title: country.name,
            href: `/dil-okulu/${country.slug}`,
            submenu: country.schools
          }));

        setLanguageSchoolDropdown(dropdown);
      } catch (error) {
        console.error('Dil okulları menüsü yüklenemedi:', error);
      }
    };

    fetchLanguageSchools();
  }, []);

  useEffect(() => {
    const fetchSummerSchools = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.summerSchools}`);
        const data = await res.json();
        const countryMap = new Map<string, { name: string; slug: string; schools: Array<{ title: string; href: string }> }>();

        data.forEach((school: any) => {
          const countrySlug = school.countrySlug || slugify(school.countryName || '');
          if (!countrySlug) {
            return;
          }
          const countryName = school.countryName || countrySlug;
          const schoolHref = `/yaz-okulu/${countrySlug}/${school.id}`;

          if (!countryMap.has(countrySlug)) {
            countryMap.set(countrySlug, { name: countryName, slug: countrySlug, schools: [] });
          }
          countryMap.get(countrySlug)!.schools.push({
            title: school.name,
            href: schoolHref
          });
        });

        const dropdown = Array.from(countryMap.values())
          .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
          .map((country) => ({
            title: country.name,
            href: `/yaz-okulu/${country.slug}`,
            submenu: country.schools
          }));

        setSummerSchoolDropdown(dropdown);
      } catch (error) {
        console.error('Yaz okulları menüsü yüklenemedi:', error);
      }
    };

    fetchSummerSchools();
  }, []);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const [universitiesRes, countriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.universities}`),
          fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`)
        ]);
        const universities = await universitiesRes.json();
        const countries = await countriesRes.json();
        const countryMap = new Map<string, { name: string; slug: string; universities: Array<{ title: string; href: string }> }>();

        universities.forEach((uni: any) => {
          const country = countries.find((c: any) => c.id === uni.countryId);
          if (!country) {
            return;
          }
          const countrySlug = country.slug || slugify(country.name || '');
          if (!countrySlug) {
            return;
          }
          const uniHref = `/universite/${countrySlug}/${uni.id}`;

          if (!countryMap.has(countrySlug)) {
            countryMap.set(countrySlug, { name: country.name, slug: countrySlug, universities: [] });
          }
          countryMap.get(countrySlug)!.universities.push({
            title: uni.name,
            href: uniHref
          });
        });

        const dropdown = Array.from(countryMap.values())
          .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
          .map((country) => ({
            title: country.name,
            href: `/universite/${country.slug}`,
            submenu: country.universities
          }));

        setUniversityDropdown(dropdown);
      } catch (error) {
        console.error('Üniversite menüsü yüklenemedi:', error);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    const fetchMasterPrograms = async () => {
      try {
        const [programsRes, countriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.masterPrograms}`),
          fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`)
        ]);
        const programs = await programsRes.json();
        const countries = await countriesRes.json();
        const countryMap = new Map<string, { name: string; slug: string; programs: Array<{ title: string; href: string }> }>();

        programs.forEach((program: any) => {
          const country = countries.find((c: any) => c.id === program.countryId);
          if (!country) {
            return;
          }
          const countrySlug = country.slug || slugify(country.name || '');
          if (!countrySlug) {
            return;
          }
          const programHref = `/master-mba/${countrySlug}/${program.id}`;

          if (!countryMap.has(countrySlug)) {
            countryMap.set(countrySlug, { name: country.name, slug: countrySlug, programs: [] });
          }
          countryMap.get(countrySlug)!.programs.push({
            title: program.name,
            href: programHref
          });
        });

        const dropdown = Array.from(countryMap.values())
          .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
          .map((country) => ({
            title: country.name,
            href: `/master-mba/${country.slug}`,
            submenu: country.programs
          }));

        setMasterMbaDropdown(dropdown);
      } catch (error) {
        console.error('Master/MBA menüsü yüklenemedi:', error);
      }
    };

    fetchMasterPrograms();
  }, []);

  useEffect(() => {
    const fetchInternshipPrograms = async () => {
      try {
        const [programsRes, countriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.internshipPrograms}`),
          fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`)
        ]);
        const programs = await programsRes.json();
        const countries = await countriesRes.json();
        const countryMap = new Map<string, { name: string; slug: string }>();

        programs.forEach((program: any) => {
          const country = countries.find((c: any) => c.id === program.countryId);
          if (!country) {
            return;
          }
          const countrySlug = country.slug || slugify(country.name || '');
          if (!countrySlug) {
            return;
          }
          if (!countryMap.has(countrySlug)) {
            countryMap.set(countrySlug, { name: country.name, slug: countrySlug });
          }
        });

        const dropdown = Array.from(countryMap.values())
          .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
          .map((country) => ({
            title: country.name,
            href: `/staj/${country.slug}`
          }));

        setInternshipDropdown(dropdown);
      } catch (error) {
        console.error('Yurtdışı staj menüsü yüklenemedi:', error);
      }
    };

    fetchInternshipPrograms();
  }, []);

  // Lise nested dropdown verileri
  const highSchoolCountries = {
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

  const menuItems = [
    { 
      title: 'KURUMSAL', 
      href: '/hakkimizda',
      dropdown: [
        { title: 'Hakkımızda', href: '/hakkimizda' },
        { title: 'Misyon & Vizyon', href: '/misyon-vizyon' },
      ]
    },
    { 
      title: 'DİL OKULLARI', 
      href: '/dil-okulu',
      dropdown: [
        { title: 'Neden Dil Eğitimi?', href: '/dil-okulu' },
        ...languageSchoolDropdown,
      ]
    },
    { 
      title: 'YAZ OKULLARI', 
      href: '/yaz-okulu',
      dropdown: [
        { title: 'Neden Yaz Okulu?', href: '/yaz-okulu' },
        ...summerSchoolDropdown,
      ]
    },
    { 
      title: 'YURTDIŞI ÜNİVERSİTE', 
      href: '/universite',
      dropdown: [
        { title: 'Neden Yurtdışında Üniversite?', href: '/universite' },
        ...universityDropdown,
      ]
    },
    { 
      title: 'MASTER / MBA', 
      href: '/master-mba',
      dropdown: [
        { title: 'Neden Yurtdışında Master/MBA?', href: '/master-mba' },
        ...masterMbaDropdown,
      ]
    },
    { 
      title: 'YURTDIŞI STAJ', 
      href: '/staj',
      dropdown: [
        { title: 'Neden Yurtdışında Staj?', href: '/staj' },
        ...internshipDropdown,
      ]
    },
    { 
      title: 'ERASMUS+', 
      href: '/erasmus',
      dropdown: [
        { title: 'KA1 - Eğitimler', href: '/erasmus/egitimler' },
        { title: 'KA2 - Projeler', href: '/erasmus/projeler' },
      ]
    },
    { 
      title: 'İLETİŞİM', 
      href: '/iletisim'
    },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b-4 border-gray-900 ${
        isScrolled
          ? 'bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.1)]'
          : 'bg-white'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo Section - Responsive */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 mr-1 sm:mr-2">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 overflow-hidden">
              <Image
                src="/images/logo.jpg"
                alt="Edu-Excellence Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-black text-xs sm:text-sm lg:text-lg leading-tight uppercase tracking-tight">Edu-Excellence</span>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-gray-600 leading-tight font-bold uppercase tracking-wider hidden sm:block">Eğitimin Mükemmel Hali</span>
            </div>
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center mx-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`px-1 py-1.5 text-[9px] font-black uppercase tracking-tight transition-all duration-200 flex items-center gap-0.5 whitespace-nowrap border-2 ${
                      isActive
                        ? 'text-purple-600 border-purple-600 bg-purple-50'
                        : 'text-gray-900 border-transparent hover:text-purple-600 hover:border-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {item.title}
                    {hasDropdown && (
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {/* Dropdown Menu - Geometric Style */}
                  {hasDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border-4 border-gray-900 shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.dropdown?.map((dropdownItem) => {
                          const hasSubmenu = dropdownItem.submenu && dropdownItem.submenu.length > 0;
                          return (
                            <div key={dropdownItem.href} className="relative submenu-parent">
                              <Link
                                href={dropdownItem.href}
                                className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800 flex items-center justify-between"
                              >
                                <span>{dropdownItem.title}</span>
                                {hasSubmenu && (
                                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </Link>
                              
                              {/* Nested Submenu */}
                              {hasSubmenu && (
                                <div className="submenu-child absolute left-full top-0 ml-1 w-64 bg-white border-4 border-gray-900 shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] opacity-0 invisible transition-all duration-200 z-50">
                                  <div className="py-2">
                                    {dropdownItem.submenu?.map((submenuItem) => (
                                      <Link
                                        key={submenuItem.href}
                                        href={submenuItem.href}
                                        className="block px-4 py-2 text-xs text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800"
                                      >
                                        {submenuItem.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Section - Diğer Hizmetlerimiz + Search */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            {/* Diğer Hizmetlerimiz */}
            <div className="relative group">
              <button className="px-1.5 py-1.5 text-[9px] font-black uppercase tracking-tight transition-all duration-200 flex items-center gap-0.5 whitespace-nowrap border-2 text-gray-900 border-transparent hover:text-purple-600 hover:border-purple-600 hover:bg-purple-50">
                DİĞER HİZMETLERİMİZ
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-1 w-56 bg-white border-4 border-gray-900 shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <div className="submenu-parent relative">
                    <Link href="/lise" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                      Lise
                      <svg className="inline-block w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <div className="submenu-child absolute left-full top-0 ml-1 w-56 bg-white border-4 border-gray-900 shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] opacity-0 invisible">
                      <div className="py-2">
                        <Link href="/lise" className="block px-4 py-2 text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wider border-b-2 border-gray-200 pb-2">
                          Neden Yurtdışında Lise?
                        </Link>
                        <Link href="/lise/amerika" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                          Amerika
                        </Link>
                        <Link href="/lise/kanada" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                          Kanada
                        </Link>
                        <Link href="/lise/ingiltere" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                          İngiltere
                        </Link>
                        <Link href="/lise/irlanda" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                          İrlanda
                        </Link>
                        <Link href="/lise/almanya" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                          Almanya
                        </Link>
                        <Link href="/lise/italya" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                          İtalya
                        </Link>
                        <Link href="/lise/fransa" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                          Fransa
                        </Link>
                        <Link href="/lise/ispanya" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                          İspanya
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link href="/vize" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                    Vize Danışmanlığı
                  </Link>
                  <Link href="/blog" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                    Blog
                  </Link>
                  <Link href="/sss" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                    Sıkça Sorulan Sorular
                  </Link>
                  <Link href="/galeri" className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white transition-colors border-l-4 border-transparent hover:border-purple-800">
                    Galeri
                  </Link>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="flex items-center space-x-1">
            <form onSubmit={handleSearch} className="flex items-center space-x-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ara..."
                  className="w-32 px-2 py-1.5 pl-6 border-4 border-gray-900 focus:outline-none focus:border-purple-600 text-[9px] font-bold"
                />
                <svg
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-purple-600 text-white font-black uppercase tracking-tight hover:bg-purple-700 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 text-[9px]"
              >
                Ara
              </button>
            </form>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 border-4 border-gray-900 text-gray-900 hover:bg-purple-600 hover:text-white hover:border-purple-800 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t-4 border-gray-900 mt-2 pt-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ara..."
                    className="w-full px-4 py-2 pl-10 border-4 border-gray-900 focus:outline-none focus:border-purple-600 text-sm font-bold"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white font-black uppercase tracking-wider border-4 border-purple-800 hover:bg-purple-700 hover:border-purple-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]"
                >
                  Ara
                </button>
              </div>
            </form>

            {/* Mobile Menu Items */}
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-base font-black uppercase tracking-wide transition-all duration-200 border-4 ${
                        isActive
                          ? 'bg-purple-600 text-white border-purple-800'
                          : 'text-gray-900 border-gray-900 hover:bg-purple-600 hover:text-white hover:border-purple-800'
                      }`}
                    >
                      {item.title}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4 mt-1 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-900 font-bold hover:bg-purple-600 hover:text-white border-l-4 border-transparent hover:border-purple-800"
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
