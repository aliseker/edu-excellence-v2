'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Ülkeler listesi (şimdilik statik, sonra admin panelden gelecek)
  const countries = [
    { name: 'Kanada', slug: 'kanada', universities: ['University of Toronto', 'McGill University', 'University of British Columbia'] },
    { name: 'İngiltere', slug: 'ingiltere', universities: ['Oxford University', 'Cambridge University', 'Imperial College'] },
    { name: 'Amerika', slug: 'amerika', universities: ['Harvard University', 'MIT', 'Stanford University'] },
    { name: 'Almanya', slug: 'almanya', universities: ['LMU Munich', 'Heidelberg University', 'TU Berlin'] },
    { name: 'İtalya', slug: 'italya', universities: ['University of Bologna', 'Sapienza University', 'University of Milan'] },
    { name: 'Fransa', slug: 'fransa', universities: ['Sorbonne University', 'École Normale Supérieure', 'Sciences Po'] },
    { name: 'Avustralya', slug: 'avustralya', universities: ['University of Melbourne', 'University of Sydney', 'ANU'] },
    { name: 'İrlanda', slug: 'irlanda', universities: ['Trinity College Dublin', 'University College Dublin', 'Dublin City University'] },
  ];

  const menuItems = [
    {
      title: 'ANA SAYFA',
      href: '/'
    },
    {
      title: 'DİL OKULU',
      href: '/dil-okulu'
    },
    {
      title: 'YAZ OKULU',
      href: '/yaz-okulu'
    },
    {
      title: 'LİSE',
      href: '/lise'
    },
    {
      title: 'ÜNİVERSİTE',
      href: '/universite',
      dropdown: countries.map(country => ({
        name: country.name,
        slug: country.slug,
        href: `/universite/${country.slug}`
      }))
    },
    {
      title: 'MASTER / MBA',
      href: '/master-mba'
    },
    {
      title: 'VİZE',
      href: '/vize'
    },
    {
      title: 'İLETİŞİM',
      href: '/iletisim'
    }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-[1000] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="h-14 w-14 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">EE</span>
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  Edu-Excellence
                </div>
                <div className="text-xs text-gray-500 -mt-1">
                  Yurtdışı Eğitim Danışmanlık
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-8 flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-3 text-sm font-semibold transition-all duration-200 relative group whitespace-nowrap ${
                      pathname === item.href || (item.title === 'ÜNİVERSİTE' && pathname.startsWith('/universite'))
                        ? 'text-blue-600' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.title}
                    {item.dropdown && (
                      <svg className="w-4 h-4 ml-1 inline-block group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
                      pathname === item.href || (item.title === 'ÜNİVERSİTE' && pathname.startsWith('/universite'))
                        ? 'w-full bg-blue-600' 
                        : 'w-0 bg-blue-600 group-hover:w-full'
                    }`}></div>
                  </Link>
                  
                  {/* Dropdown Menu - BigApple tarzı */}
                  {item.dropdown && activeDropdown === item.title && (
                    <div className="absolute mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-[9999] left-0 min-w-[400px]">
                      <div className="px-4 pb-2 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900">Ülkeler</h3>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {item.dropdown.map((country) => {
                          const countryData = countries.find(c => c.slug === country.slug);
                          return (
                            <Link
                              key={country.slug}
                              href={country.href}
                              className="block px-4 py-3 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                  {country.name}
                                </span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                              {countryData && countryData.universities.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {countryData.universities.slice(0, 3).map((uni, idx) => (
                                    <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                      {uni}
                                    </span>
                                  ))}
                                  {countryData.universities.length > 3 && (
                                    <span className="text-xs text-gray-500">+{countryData.universities.length - 3}</span>
                                  )}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {menuItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 space-y-1">
                      {item.dropdown.map((country) => (
                        <Link
                          key={country.slug}
                          href={country.href}
                          className="text-gray-500 hover:text-blue-600 block px-3 py-2 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {country.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

