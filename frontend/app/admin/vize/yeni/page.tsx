'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { apiService } from '@/services/api';

type VisaTypeForm = {
  name: string;
  description: string;
  processingTime: string;
  requirements: string;
};

const availableCountries = [
  { name: 'Amerika', slug: 'amerika', flag: 'us' },
  { name: 'İngiltere', slug: 'ingiltere', flag: 'gb' },
  { name: 'Kanada', slug: 'kanada', flag: 'ca' },
  { name: 'Avustralya', slug: 'avustralya', flag: 'au' },
  { name: 'İrlanda', slug: 'irlanda', flag: 'ie' },
  { name: 'Malta', slug: 'malta', flag: 'mt' },
  { name: 'İtalya', slug: 'italya', flag: 'it' },
  { name: 'İspanya', slug: 'ispanya', flag: 'es' },
  { name: 'Fransa', slug: 'fransa', flag: 'fr' },
  { name: 'Almanya', slug: 'almanya', flag: 'de' },
  { name: 'Polonya', slug: 'polonya', flag: 'pl' },
  { name: 'Macaristan', slug: 'macaristan', flag: 'hu' },
  { name: 'Çek Cumhuriyeti', slug: 'cek-cumhuriyeti', flag: 'cz' },
  { name: 'Yunanistan', slug: 'yunanistan', flag: 'gr' },
  { name: 'İsviçre', slug: 'isvicre', flag: 'ch' },
  { name: 'İsveç', slug: 'isvec', flag: 'se' },
];

const getCountryEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const createVisaType = (): VisaTypeForm => ({
  name: '',
  description: '',
  processingTime: '',
  requirements: '',
});

export default function YeniVizePage() {
  const router = useRouter();
  const defaultCountry = availableCountries[0];
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    countrySlug: defaultCountry.slug,
    countryName: defaultCountry.name,
    flag: defaultCountry.flag,
    generalInfo: '',
    status: 'active',
  });
  const [visaTypes, setVisaTypes] = useState<VisaTypeForm[]>([createVisaType()]);
  const [processSteps, setProcessSteps] = useState<string[]>(['']);
  const [documentItems, setDocumentItems] = useState<string[]>(['']);
  const [importantNotesItems, setImportantNotesItems] = useState<string[]>(['']);

  const selectedCountry = availableCountries.find((country) => country.slug === formData.countrySlug);

  const handleCountryChange = (slug: string) => {
    const country = availableCountries.find((item) => item.slug === slug);
    setFormData((prev) => ({
      ...prev,
      countrySlug: slug,
      countryName: country?.name ?? prev.countryName,
      flag: country?.flag ?? prev.flag,
    }));
  };

  const handleVisaTypeChange = (index: number, field: keyof VisaTypeForm, value: string) => {
    setVisaTypes((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    );
  };

  const addVisaType = () => {
    setVisaTypes((prev) => [...prev, createVisaType()]);
  };

  const removeVisaType = (index: number) => {
    setVisaTypes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string,
  ) => {
    setter((prev) =>
      prev.map((item, idx) => (idx === index ? value : item)),
    );
  };

  const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, '']);
  };

  const removeListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) => {
    setter((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = {
      countrySlug: formData.countrySlug,
      countryName: formData.countryName,
      flag: formData.flag,
      generalInfo: formData.generalInfo,
      status: formData.status,
      visaTypes: visaTypes.map((visaType) => ({
        name: visaType.name,
        description: visaType.description,
        processingTime: visaType.processingTime,
        requirements: visaType.requirements
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
      })),
      process: processSteps.map((step) => step.trim()).filter(Boolean),
      documents: documentItems.map((doc) => doc.trim()).filter(Boolean),
      importantNotes: importantNotesItems.map((note) => note.trim()).filter(Boolean),
    };
    
    
    try {
      await apiService.createVisaService(payload);
      router.push('/admin/vize');
    } catch (error) {
      toast.error('Vize eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Yeni Vize Ülkesi Ekle</h1>
          <p className="text-gray-600 mt-1">Ülke dinamik sayfalarının içeriğini bu alandan yönetin.</p>
        </div>
        <Link
          href="/admin/vize"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          ← Geri Dön
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-8">
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label>
              <select
                value={formData.countrySlug}
                onChange={(event) => handleCountryChange(event.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
              >
                {availableCountries.map((country) => (
                  <option key={country.slug} value={country.slug}>
                    {country.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Dinamik country slug&apos;ı bu dropdowndan eşleştirilecek.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bayrak Kodu</label>
              <input
                type="text"
                value={formData.flag}
                onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                placeholder="Örn: us, gb, ca"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
              <p className="text-xs text-gray-500 mt-1">Seçilen ülkenin bayrağı otomatik geliyor (ISO 3166-1 alpha-2 kodu).</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Durum</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>
          </div>
          {selectedCountry && (
            <p className="text-sm text-gray-600">
              {getCountryEmoji(selectedCountry.flag)} {selectedCountry.name} - slug: <span className="font-black">{selectedCountry.slug}</span>
            </p>
          )}
        </section>

        <section className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Genel Bilgiler</label>
            <textarea
              value={formData.generalInfo}
              onChange={(e) => setFormData({ ...formData, generalInfo: e.target.value })}
              rows={5}
              placeholder="Ülke vizesi hakkında detaylı tanıtım metni girin."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vize Türleri</label>
            <div className="space-y-4">
              {visaTypes.map((visaType, index) => (
                <div key={index} className="border-2 border-dashed border-pink-300 rounded-2xl p-4 space-y-4 bg-pink-50">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-black text-gray-800">Tür {index + 1}</p>
                    {visaTypes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVisaType(index)}
                        className="text-red-600 font-semibold text-sm hover:underline"
                      >
                        Kaldır
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Adı</label>
                      <input
                        type="text"
                        value={visaType.name}
                        onChange={(event) => handleVisaTypeChange(index, 'name', event.target.value)}
                        placeholder="Örn: F-1 Öğrenci Vizesi"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">İşlem Süresi</label>
                      <input
                        type="text"
                        value={visaType.processingTime}
                        onChange={(event) => handleVisaTypeChange(index, 'processingTime', event.target.value)}
                        placeholder="Örn: 2-4 hafta"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Açıklama</label>
                      <input
                        type="text"
                        value={visaType.description}
                        onChange={(event) => handleVisaTypeChange(index, 'description', event.target.value)}
                        placeholder="Kısa açıklama girin"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Gereksinimler</label>
                    <textarea
                      value={visaType.requirements}
                      onChange={(event) => handleVisaTypeChange(index, 'requirements', event.target.value)}
                      rows={3}
                      placeholder="Her satırda bir gereksinim olacak şekilde yazın"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addVisaType}
              className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-2xl border-2 border-dashed border-pink-400 text-pink-600 font-semibold hover:bg-pink-50 transition"
            >
              + Yeni Tür Ekle
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Başvuru Süreci</label>
            {processSteps.map((step, index) => (
              <div key={`process-${index}`} className="flex gap-3">
                <span className="w-10 flex-shrink-0 text-center font-black text-gray-700">{index + 1}.</span>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => updateListItem(setProcessSteps, index, e.target.value)}
                  placeholder="Adım açıklamasını yazın"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
                {processSteps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem(setProcessSteps, index)}
                    className="text-red-600 font-semibold text-sm hover:underline"
                  >
                    Sil
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem(setProcessSteps)}
              className="text-sm font-semibold text-emerald-600 hover:underline"
            >
              + Adım Ekle
            </button>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Gerekli Belgeler</label>
            {documentItems.map((doc, index) => (
              <div key={`doc-${index}`} className="flex gap-3">
                <span className="w-10 flex-shrink-0 text-center font-black text-gray-700">{index + 1}.</span>
                <input
                  type="text"
                  value={doc}
                  onChange={(e) => updateListItem(setDocumentItems, index, e.target.value)}
                  placeholder="Belge adını yazın"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
                {documentItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem(setDocumentItems, index)}
                    className="text-red-600 font-semibold text-sm hover:underline"
                  >
                    Sil
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem(setDocumentItems)}
              className="text-sm font-semibold text-emerald-600 hover:underline"
            >
              + Belge Ekle
            </button>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Önemli Notlar</label>
            {importantNotesItems.map((note, index) => (
              <div key={`note-${index}`} className="flex gap-3">
                <span className="w-10 flex-shrink-0 text-center font-black text-gray-700">{index + 1}.</span>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => updateListItem(setImportantNotesItems, index, e.target.value)}
                  placeholder="Notu yazın"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
                {importantNotesItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem(setImportantNotesItems, index)}
                    className="text-red-600 font-semibold text-sm hover:underline"
                  >
                    Sil
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem(setImportantNotesItems)}
              className="text-sm font-semibold text-emerald-600 hover:underline"
            >
              + Not Ekle
            </button>
          </div>
        </section>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/vize"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
