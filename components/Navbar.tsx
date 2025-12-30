'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

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

  // Üniversite nested dropdown verileri
  const universityCountries = {
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

  // Dil Okulu nested dropdown verileri
  const languageSchoolCountries = {
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

  // Yaz Okulu nested dropdown verileri
  const summerSchoolCountries = {
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
    fransa: [
      { title: 'Paris Yaz Okulu', href: '/yaz-okulu/fransa/paris-yaz-okulu' },
      { title: 'Nice Yaz Okulu', href: '/yaz-okulu/fransa/nice-yaz-okulu' },
    ],
    ispanya: [
      { title: 'Barcelona Yaz Okulu', href: '/yaz-okulu/ispanya/barcelona-yaz-okulu' },
      { title: 'Madrid Yaz Okulu', href: '/yaz-okulu/ispanya/madrid-yaz-okulu' },
    ],
    italya: [
      { title: 'Roma Yaz Okulu', href: '/yaz-okulu/italya/roma-yaz-okulu' },
    ],
    isvicre: [
      { title: 'Zürih Yaz Okulu', href: '/yaz-okulu/isvicre/zurih-yaz-okulu' },
    ],
    malta: [
      { title: 'Malta Yaz Okulu', href: '/yaz-okulu/malta/malta-yaz-okulu' },
    ],
  };

  // Master/MBA nested dropdown verileri
  const masterMBACountries = {
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
        { title: 'İngiltere', href: '/dil-okulu/ingiltere', submenu: languageSchoolCountries.ingiltere },
        { title: 'Amerika', href: '/dil-okulu/amerika', submenu: languageSchoolCountries.amerika },
        { title: 'Kanada', href: '/dil-okulu/kanada', submenu: languageSchoolCountries.kanada },
        { title: 'İrlanda', href: '/dil-okulu/irlanda', submenu: languageSchoolCountries.irlanda },
        { title: 'Malta', href: '/dil-okulu/malta', submenu: languageSchoolCountries.malta },
        { title: 'Avustralya', href: '/dil-okulu/avustralya', submenu: languageSchoolCountries.avustralya },
      ]
    },
    { 
      title: 'YAZ OKULLARI', 
      href: '/yaz-okulu',
      dropdown: [
        { title: 'Neden Yaz Okulu?', href: '/yaz-okulu' },
        { title: 'İngiltere', href: '/yaz-okulu/ingiltere', submenu: summerSchoolCountries.ingiltere },
        { title: 'Amerika', href: '/yaz-okulu/amerika', submenu: summerSchoolCountries.amerika },
        { title: 'Kanada', href: '/yaz-okulu/kanada', submenu: summerSchoolCountries.kanada },
        { title: 'Malta', href: '/yaz-okulu/malta', submenu: summerSchoolCountries.malta },
        { title: 'Almanya', href: '/yaz-okulu/almanya', submenu: summerSchoolCountries.almanya },
        { title: 'Fransa', href: '/yaz-okulu/fransa', submenu: summerSchoolCountries.fransa },
        { title: 'İspanya', href: '/yaz-okulu/ispanya', submenu: summerSchoolCountries.ispanya },
        { title: 'İtalya', href: '/yaz-okulu/italya', submenu: summerSchoolCountries.italya },
        { title: 'İsviçre', href: '/yaz-okulu/isvicre', submenu: summerSchoolCountries.isvicre },
      ]
    },
    { 
      title: 'YURTDIŞI ÜNİVERSİTE', 
      href: '/universite',
      dropdown: [
        { title: 'Neden Yurtdışında Üniversite?', href: '/universite' },
        { title: 'İngiltere', href: '/universite/ingiltere', submenu: universityCountries.ingiltere },
        { title: 'Amerika', href: '/universite/amerika', submenu: universityCountries.amerika },
        { title: 'Kanada', href: '/universite/kanada', submenu: universityCountries.kanada },
        { title: 'Almanya', href: '/universite/almanya', submenu: universityCountries.almanya },
        { title: 'İtalya', href: '/universite/italya', submenu: universityCountries.italya },
        { title: 'Fransa', href: '/universite/fransa' },
        { title: 'Polonya', href: '/universite/polonya' },
        { title: 'Macaristan', href: '/universite/macaristan' },
        { title: 'Avusturya', href: '/universite/avusturya' },
        { title: 'Litvanya', href: '/universite/litvanya' },
        { title: 'Hollanda', href: '/universite/hollanda' },
        { title: 'Avustralya', href: '/universite/avustralya' },
      ]
    },
    { 
      title: 'MASTER / MBA', 
      href: '/master-mba',
      dropdown: [
        { title: 'Neden Yurtdışında Master/MBA?', href: '/master-mba' },
        { title: 'Amerika', href: '/master-mba/amerika', submenu: masterMBACountries.amerika },
        { title: 'İngiltere', href: '/master-mba/ingiltere', submenu: masterMBACountries.ingiltere },
        { title: 'İtalya', href: '/master-mba/italya', submenu: masterMBACountries.italya },
        { title: 'İrlanda', href: '/master-mba/irlanda' },
        { title: 'Kanada', href: '/master-mba/kanada' },
        { title: 'Almanya', href: '/master-mba/almanya', submenu: masterMBACountries.almanya },
        { title: 'Hollanda', href: '/master-mba/hollanda' },
        { title: 'Avustralya', href: '/master-mba/avustralya' },
        { title: 'İsveç', href: '/master-mba/isvec' },
        { title: 'Fransa', href: '/master-mba/fransa' },
        { title: 'Polonya', href: '/master-mba/polonya' },
      ]
    },
    { 
      title: 'YURTDIŞI STAJ', 
      href: '/staj',
      dropdown: [
        { title: 'Amerika', href: '/staj/amerika' },
        { title: 'Kanada', href: '/staj/kanada' },
        { title: 'İngiltere', href: '/staj/ingiltere' },
        { title: 'Almanya', href: '/staj/almanya' },
        { title: 'Fransa', href: '/staj/fransa' },
        { title: 'İspanya', href: '/staj/ispanya' },
        { title: 'İtalya', href: '/staj/italya' },
        { title: 'Avustralya', href: '/staj/avustralya' },
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
      <div className="max-w-7xl mx-auto pl-0 pr-0.5 sm:pr-1 lg:pr-1.5">
        <div className="flex items-center h-16">
          {/* Logo Section - En sola yaslı */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0 mr-2 -ml-20 sm:-ml-24 lg:-ml-28">
            <div className="relative h-12 w-12 overflow-hidden">
              <Image
                src="/images/logo.jpg"
                alt="Edu-Excellence Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-black text-lg leading-tight uppercase tracking-tight">Edu-Excellence</span>
              <span className="text-[10px] text-gray-600 leading-tight font-bold uppercase tracking-wider">Eğitimin Mükemmel Hali</span>
            </div>
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden lg:flex items-center space-x-0 flex-1 justify-center">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`px-1.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-0.5 whitespace-nowrap border-2 ${
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

          {/* Diğer Hizmetlerimiz - Arama'nın solunda */}
          <div className="hidden lg:block flex-shrink-0 mr-1">
            <div className="relative group">
              <button className="px-2 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-0.5 whitespace-nowrap border-2 text-gray-900 border-transparent hover:text-purple-600 hover:border-purple-600 hover:bg-purple-50">
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
          </div>

          {/* Search Section - Right */}
          <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            <form onSubmit={handleSearch} className="flex items-center space-x-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ara..."
                  className="w-36 px-2.5 py-1.5 pl-7 border-4 border-gray-900 focus:outline-none focus:border-purple-600 text-[10px] font-bold"
                />
                <svg
                  className="absolute left-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-600"
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
                className="px-4 py-1.5 bg-purple-600 text-white font-black uppercase tracking-wider hover:bg-purple-700 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 text-[10px]"
              >
                Ara
              </button>
            </form>
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
