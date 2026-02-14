'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import { apiService } from '@/services/api';
import { sanitizeHTML } from '@/utils/sanitize';
import { BACKEND_BASE_URL } from '@/config/api';

type ErasmusPageData = {
  id: number;
  slug: string;
  title: string;
  htmlContent: string;
  imagesJson: string;
  pdfPath: string | null;
};

type Props = {
  slug: string;
  pageTitle: string; // bölüm başlığı (Hizmetlerimiz / Projelerimiz / Faydalı linkler)
};

export default function ErasmusContentPage({ slug, pageTitle }: Props) {
  const [data, setData] = useState<ErasmusPageData | null>(null);
  const [sanitizedHtml, setSanitizedHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await apiService.getErasmusPageBySlug(slug);
        if (cancelled) return;
        setData(res);
        const clean = await sanitizeHTML(res.htmlContent || '');
        if (cancelled) return;
        setSanitizedHtml(clean);
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  let images: string[] = [];
  if (data?.imagesJson) {
    try {
      const parsed = JSON.parse(data.imagesJson);
      images = Array.isArray(parsed) ? parsed.filter((x: unknown) => typeof x === 'string') : [];
    } catch {
      images = [];
    }
  }

  const pdfUrl = data?.pdfPath
    ? `${BACKEND_BASE_URL}/uploads/${data.pdfPath}`
    : null;
  const pdfFileName = data?.pdfPath
    ? data.pdfPath.replace(/^.*[/\\]/, '')
    : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center text-gray-600 font-semibold">
          Yükleniyor…
        </div>
        <Footer />
        <WhatsAppWidget />
        <ScrollToTop />
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <p className="text-gray-600 font-semibold">Bu sayfa henüz eklenmemiş.</p>
        </div>
        <Footer />
        <WhatsAppWidget />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">
              {pageTitle}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.title}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
          {sanitizedHtml && (
            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          )}

          {images.length > 0 && (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((src, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={src}
                    alt={`${data.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {pdfUrl && (
            <div className="mt-8 p-4 bg-purple-50 border-4 border-purple-200 rounded-lg">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-purple-800 hover:text-purple-600"
              >
                <span>📄</span>
                {pdfFileName ? (
                  <>«{pdfFileName}» — PDF dosyasını indir / görüntüle</>
                ) : (
                  'PDF dosyasını indir / görüntüle'
                )}
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
