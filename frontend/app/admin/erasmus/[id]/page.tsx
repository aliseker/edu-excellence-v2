'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { apiService } from '@/services/api';
import RichTextEditor from '@/components/RichTextEditor';

const PDF_SLUGS = ['programme-rehberi', 'basvuru-sonuclari'];

type PageData = {
  id: number;
  slug: string;
  title: string;
  htmlContent: string;
  imagesJson: string;
  pdfPath: string | null;
};

type Props = { params: Promise<{ id: string }> };

export default function AdminErasmusEditPage({ params }: Props) {
  const { id: idParam } = use(params);
  const id = parseInt(idParam, 10);
  const router = useRouter();
  const [data, setData] = useState<PageData | null>(null);
  const [title, setTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [imagesJson, setImagesJson] = useState('[]');
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(id)) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const page = await apiService.getErasmusPageById(id);
        setData(page);
        setTitle(page.title);
        setHtmlContent(page.htmlContent || '');
        setImagesJson(page.imagesJson || '[]');
        setPdfPath(page.pdfPath || null);
      } catch (e) {
        console.error(e);
        setError('Sayfa yüklenemedi.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const showPdf = data ? PDF_SLUGS.includes(data.slug) : false;

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      try {
        const arr = JSON.parse(imagesJson) as string[];
        setImagesJson(JSON.stringify([...arr, dataUrl]));
      } catch {
        setImagesJson(JSON.stringify([dataUrl]));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    try {
      const arr = JSON.parse(imagesJson) as string[];
      setImagesJson(JSON.stringify(arr.filter((_, i) => i !== index)));
    } catch {
      setImagesJson('[]');
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.name.toLowerCase().endsWith('.pdf')) setPdfFile(file);
    else setPdfFile(null);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setError(null);
    setSaving(true);
    try {
      let finalPdfPath = pdfPath;
      if (showPdf && pdfFile) {
        const res = await apiService.uploadErasmusPdf(pdfFile, data.slug);
        finalPdfPath = res.path;
      }
      await apiService.updateErasmusPage(data.id, {
        slug: data.slug,
        title,
        htmlContent,
        imagesJson,
        pdfPath: finalPdfPath ?? undefined,
      });
      setPdfFile(null);
      setPdfPath(finalPdfPath ?? null);
      setData((d) => (d ? { ...d, title, htmlContent, imagesJson, pdfPath: finalPdfPath ?? null } : null));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt sırasında hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const images: string[] = (() => {
    try {
      const arr = JSON.parse(imagesJson);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  })();

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-gray-600">Yükleniyor…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <p className="text-red-600 font-semibold">{error || 'Sayfa bulunamadı.'}</p>
        <Link href="/admin/erasmus" className="text-purple-600 font-bold hover:underline">← Listeye dön</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Erasmus+ Sayfasını Düzenle</h1>
          <p className="text-gray-600 mt-1 font-mono text-sm">{data.slug}</p>
        </div>
        <Link href="/admin/erasmus" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300">
          ← Liste
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Metin (zengin metin)</label>
          <RichTextEditor value={htmlContent} onChange={setHtmlContent} minHeight="280px" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Resimler (bilgisayardan seçin)</label>
          <input type="file" accept="image/*" onChange={addImage} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:font-semibold file:bg-purple-50 file:text-purple-700" />
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((src, i) => (
                <div key={i} className="relative group">
                  <img src={src} alt="" className="w-full aspect-video object-cover rounded border-2 border-gray-200" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 font-bold opacity-90 hover:opacity-100">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {showPdf && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">PDF</label>
            <input type="file" accept=".pdf" onChange={handlePdfChange} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:font-semibold file:bg-purple-50 file:text-purple-700" />
            {pdfFile && <p className="mt-2 text-sm text-gray-600">Seçilen: {pdfFile.name} — Kaydedince yüklenecek.</p>}
            {pdfPath && !pdfFile && <p className="mt-2 text-sm text-green-600">Mevcut PDF kayıtlı.</p>}
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50">
            {saving ? 'Kaydediliyor…' : 'Kaydet'}
          </button>
          <Link href="/admin/erasmus" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300">
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
