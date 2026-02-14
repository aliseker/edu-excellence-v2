'use client';

import { useEffect, useState } from 'react';
import { apiService, SiteSettingsUpdatePayload } from '@/services/api';

type SiteSettingsForm = {
  id: number;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedInUrl: string;
  whatsAppPhoneNumber: string;
  whatsAppMessageText: string;
  contactAddress: string;
  contactPhoneNumber: string;
  contactEmail: string;
};

const initialForm: SiteSettingsForm = {
  id: 0,
  facebookUrl: '',
  twitterUrl: '',
  instagramUrl: '',
  linkedInUrl: '',
  whatsAppPhoneNumber: '',
  whatsAppMessageText: '',
  contactAddress: '',
  contactPhoneNumber: '',
  contactEmail: '',
};

export default function SiteAyarlarPage() {
  const [form, setForm] = useState<SiteSettingsForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const settings = await apiService.getSiteSettings();
      setForm({
        id: settings?.id ?? 0,
        facebookUrl: settings?.facebookUrl ?? '',
        twitterUrl: settings?.twitterUrl ?? '',
        instagramUrl: settings?.instagramUrl ?? '',
        linkedInUrl: settings?.linkedInUrl ?? '',
        whatsAppPhoneNumber: settings?.whatsAppPhoneNumber ?? '',
        whatsAppMessageText: settings?.whatsAppMessageText ?? '',
        contactAddress: settings?.contactAddress ?? '',
        contactPhoneNumber: settings?.contactPhoneNumber ?? '',
        contactEmail: settings?.contactEmail ?? '',
      });
    } catch (err) {
      console.error('Site ayarları yüklenirken hata oluştu:', err);
      setError('Site ayarları yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof SiteSettingsForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const payload: SiteSettingsUpdatePayload = {
        facebookUrl: form.facebookUrl.trim() || null,
        twitterUrl: form.twitterUrl.trim() || null,
        instagramUrl: form.instagramUrl.trim() || null,
        linkedInUrl: form.linkedInUrl.trim() || null,
        whatsAppPhoneNumber: form.whatsAppPhoneNumber.trim() || null,
        whatsAppMessageText: form.whatsAppMessageText.trim() || null,
        contactAddress: form.contactAddress.trim() || null,
        contactPhoneNumber: form.contactPhoneNumber.trim() || null,
        contactEmail: form.contactEmail.trim() || null,
      };

      const updated = await apiService.updateSiteSettings(form.id || 0, payload);

      setForm((prev) => ({
        ...prev,
        id: updated?.id ?? prev.id,
      }));
      setSuccess('Site ayarları başarıyla kaydedildi.');
    } catch (err) {
      console.error('Site ayarları kaydedilirken hata oluştu:', err);
      setError('Kaydetme sırasında bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Site Ayarları</h1>
          <p className="text-slate-600 mt-1">Sosyal medya linklerini ve WhatsApp yönlendirmesini yönetin</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {success}
        </div>
      )}

      {isLoading ? (
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 border border-slate-200 text-center">
          <div className="text-4xl mb-3">⏳</div>
          <p className="font-semibold text-slate-700">Yükleniyor...</p>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-slate-200 space-y-6">
          <section className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">Sosyal Medya Linkleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Facebook URL</label>
                <input
                  type="url"
                  value={form.facebookUrl}
                  onChange={(e) => handleChange('facebookUrl', e.target.value)}
                  placeholder="https://www.facebook.com/..."
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Twitter/X URL</label>
                <input
                  type="url"
                  value={form.twitterUrl}
                  onChange={(e) => handleChange('twitterUrl', e.target.value)}
                  placeholder="https://x.com/..."
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={form.instagramUrl}
                  onChange={(e) => handleChange('instagramUrl', e.target.value)}
                  placeholder="https://www.instagram.com/..."
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={form.linkedInUrl}
                  onChange={(e) => handleChange('linkedInUrl', e.target.value)}
                  placeholder="https://www.linkedin.com/company/..."
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">WhatsApp Ayarları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Telefon Numarası</label>
                <input
                  type="text"
                  value={form.whatsAppPhoneNumber}
                  onChange={(e) => handleChange('whatsAppPhoneNumber', e.target.value)}
                  placeholder="905551234567"
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Varsayılan Mesaj</label>
                <input
                  type="text"
                  value={form.whatsAppMessageText}
                  onChange={(e) => handleChange('whatsAppMessageText', e.target.value)}
                  placeholder="Merhaba, bilgi almak istiyorum."
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">İletişim Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Adres</label>
                <textarea
                  value={form.contactAddress}
                  onChange={(e) => handleChange('contactAddress', e.target.value)}
                  placeholder="Tahılpazarı Mahallesi, 477 sk.&#10;Yerebakan İş Merkezi, No-302&#10;Muratpaşa, Antalya / Türkiye"
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Telefon</label>
                <input
                  type="text"
                  value={form.contactPhoneNumber}
                  onChange={(e) => handleChange('contactPhoneNumber', e.target.value)}
                  placeholder="+90 505 446 90 07"
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  placeholder="info@edu-excellence.net"
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
