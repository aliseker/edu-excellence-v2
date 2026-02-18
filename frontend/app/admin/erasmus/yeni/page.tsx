'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiService } from '@/services/api';
import RichTextEditor from '@/components/RichTextEditor';

const SLUG_OPTIONS = [
  { value: 'proje-yazma-egitimleri', label: 'Proje Yazma Eğitimleri' },
  { value: 'danismanlik-hizmetleri', label: 'DANIŞMANLIK HİZMETLERİ' },
  { value: 'yurtdisi-staj-isbasi-gozlem', label: 'Yurtdışı Staj ve İşbaşı Gözlem' },
  { value: 'ka1', label: 'Ka1 Projeleri' },
  { value: 'ka2', label: 'Ka2 Projeleri' },
  { value: 'diger', label: 'Diğer' },
  { value: 'programme-rehberi', label: 'Programme Rehberi' },
  { value: 'basvuru-sonuclari', label: 'Başvuru Sonuçları' },
];

const PDF_SLUGS = ['programme-rehberi', 'basvuru-sonuclari'];

export default function AdminErasmusYeniPage() {
  const router = useRouter();
  const [existingSlugs, setExistingSlugs] = useState<Set<string>>(new Set());
  const [loadingList, setLoadingList] = useState(true);
  const [slug, setSlug] = useState(SLUG_OPTIONS[0].value);
  const [title, setTitle] = useState(SLUG_OPTIONS[0].label);
  const [htmlContent, setHtmlContent] = useState('');
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableOptions = SLUG_OPTIONS.filter((o) => !existingSlugs.has(o.value));
  const showPdf = PDF_SLUGS.includes(slug);

  useEffect(() => {
    (async () => {
      try {
        const list = await apiService.getErasmusPages();
        const slugs = new Set((list || []).map((p: { slug: string }) => p.slug.toLowerCase()));
        setExistingSlugs(slugs);
        const firstAvailable = SLUG_OPTIONS.find((o) => !slugs.has(o.value.toLowerCase()));
        if (firstAvailable) {
          setSlug(firstAvailable.value);
          setTitle(firstAvailable.label);
        }
      } catch {
        setExistingSlugs(new Set());
      } finally {
        setLoadingList(false);
      }
    })();
  }, []);

  const onSlugChange = (newSlug: string) => {
    setSlug(newSlug);
    const opt = SLUG_OPTIONS.find((o) => o.value === newSlug);
    if (opt) setTitle(opt.label);
  };

  // Yeni sayfa oluştururken resim ekleme yerine, resimleri düzenleme ekranından ekleyeceğiz.

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.name.toLowerCase().endsWith('.pdf')) setPdfFile(file);
    else setPdfFile(null);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      let finalPdfPath = pdfPath;
      if (showPdf && pdfFile) {
        const res = await apiService.uploadErasmusPdf(pdfFile, slug);
        finalPdfPath = res.path;
      }
      const created = await apiService.createErasmusPage({ slug, title, htmlContent, pdfPath: finalPdfPath || undefined });
      router.push(`/admin/erasmus/${created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt sırasında hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (loadingList) {
    return (
      <div className="space-y-6">
        <p className="text-gray-600">Yükleniyor…</p>
      </div>
    );
  }

  if (availableOptions.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Yeni Erasmus+ Sayfası</h1>
            <p className="text-gray-600 mt-1">Tüm sayfa türleri zaten eklenmiş.</p>
          </div>
          <Link href="/admin/erasmus" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300">
            ← Liste
          </Link>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 text-amber-800 font-semibold">
          Ekleyebileceğiniz tüm sayfa türleri zaten mevcut. İçeriği değiştirmek için listeden ilgili sayfaya tıklayıp &quot;Düzenle&quot; ile güncelleyin.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Yeni Erasmus+ Sayfası</h1>
          <p className="text-gray-600 mt-1">İçerik ve (isteğe bağlı) resim / PDF ekleyin.</p>
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (sayfa türü)</label>
          <select
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          >
            {availableOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">Sadece henüz eklenmemiş sayfa türleri listelenir.</p>
        </div>

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

        {showPdf && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">PDF (bilgisayardan yükle, sunucuda saklanır)</label>
            <input type="file" accept=".pdf" onChange={handlePdfChange} className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:font-semibold file:bg-purple-50 file:text-purple-700" />
            {pdfFile && <p className="mt-2 text-sm text-gray-600">Seçilen: {pdfFile.name} — Kaydedince yüklenecek.</p>}
            {pdfPath && !pdfFile && <p className="mt-2 text-sm text-green-600">Mevcut PDF kayıtlı.</p>}
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50">
            {saving ? 'Kaydediliyor…' : 'Oluştur'}
          </button>
          <Link href="/admin/erasmus" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300">
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
