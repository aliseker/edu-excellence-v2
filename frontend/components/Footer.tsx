'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { apiService } from '@/services/api';

const Footer = () => {
  const [contactAddress, setContactAddress] = useState<string | null>(null);
  const [contactPhoneNumber, setContactPhoneNumber] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await apiService.getSiteSettings();
        setContactAddress(settings?.contactAddress?.trim() || null);
        setContactPhoneNumber(settings?.contactPhoneNumber?.trim() || null);
        setContactEmail(settings?.contactEmail?.trim() || null);
      } catch (error) {
        console.error('Footer iletişim ayarları alınamadı:', error);
      }
    };

    loadSettings();
  }, []);

  const normalizedTel = useMemo(() => {
    if (!contactPhoneNumber) return null;
    const digits = contactPhoneNumber.replace(/[^\d+]/g, '');
    return digits || null;
  }, [contactPhoneNumber]);

  const addressLines = useMemo(() => {
    if (!contactAddress) return [];
    return contactAddress
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }, [contactAddress]);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative h-12 w-12 overflow-hidden mr-3">
                <Image
                  src="/images/logo.jpg"
                  alt="Edu-Excellence Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-lg uppercase tracking-tight">Edu-Excellence</span>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Eğitimin Mükemmel Hali</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400">
              Yurtdışında eğitim almak isteyen öğrencilere profesyonel danışmanlık hizmeti sunuyoruz.
            </p>
          </div>

          {/* Programlar */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wide">Programlar</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dil-okulu" className="hover:text-white transition-colors">Dil Okulları</Link></li>
              <li><Link href="/yaz-okulu" className="hover:text-white transition-colors">Yaz Okulları</Link></li>
              <li><Link href="/universite" className="hover:text-white transition-colors">Yurtdışı Üniversite</Link></li>
              <li><Link href="/master-mba" className="hover:text-white transition-colors">Master / MBA</Link></li>
              <li><Link href="/staj" className="hover:text-white transition-colors">Yurtdışı Staj</Link></li>
              <li><Link href="/erasmus" className="hover:text-white transition-colors">Erasmus+</Link></li>
              <li><Link href="/lise" className="hover:text-white transition-colors">Lise</Link></li>
              <li><Link href="/vize" className="hover:text-white transition-colors">Vize Danışmanlığı</Link></li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wide">Kurumsal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="/galeri" className="hover:text-white transition-colors">Galeri</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/sss" className="hover:text-white transition-colors">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wide">İletişim</h3>
            <ul className="space-y-3 text-sm">
              {addressLines.length > 0 && (
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="leading-relaxed">
                    {addressLines.map((line, index) => (
                      <span key={`${line}-${index}`}>
                        {line}
                        {index < addressLines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </li>
              )}
              {contactPhoneNumber && normalizedTel && (
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${normalizedTel}`} className="hover:text-white transition-colors">{contactPhoneNumber}</a>
                </li>
              )}
              {contactEmail && (
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Edu-Excellence. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
