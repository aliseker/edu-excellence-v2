'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiService } from '@/services/api';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatsAppPhoneNumber, setWhatsAppPhoneNumber] = useState('');
  const [whatsAppMessageText, setWhatsAppMessageText] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await apiService.getSiteSettings();
        if (settings?.whatsAppPhoneNumber?.trim()) {
          setWhatsAppPhoneNumber(settings.whatsAppPhoneNumber.trim());
        }
        if (settings?.whatsAppMessageText?.trim()) {
          setWhatsAppMessageText(settings.whatsAppMessageText.trim());
        }
      } catch (error) {
        console.error('WhatsApp ayarları alınamadı:', error);
      }
    };

    loadSettings();
  }, []);

  const whatsappUrl = useMemo(() => {
    const cleanedNumber = whatsAppPhoneNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(whatsAppMessageText)}`;
  }, [whatsAppPhoneNumber, whatsAppMessageText]);

  const hasWhatsAppConfig = useMemo(() => {
    return whatsAppPhoneNumber.replace(/\D/g, '').length > 0;
  }, [whatsAppPhoneNumber]);

  if (!hasWhatsAppConfig) {
    return null;
  }

  const openWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Bilgi paneli - tıklanınca açılır */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-[60] w-[260px] max-w-[calc(100vw-3rem)] bg-white border-2 border-gray-800 shadow-[6px_6px_0_0_rgba(0,0,0,0.12)] rounded-md overflow-hidden">
          {/* Header - kompakt */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-2.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <div className="min-w-0">
                <p className="text-white font-bold text-xs uppercase tracking-wide truncate">EduExcellence</p>
                <p className="text-green-100 text-[10px] font-semibold flex items-center gap-0.5">
                  <span className="w-1 h-1 bg-green-300 rounded-full animate-pulse flex-shrink-0" />
                  Çevrimiçi
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-white hover:bg-white/20 rounded transition-colors"
              aria-label="Paneli kapat"
            >
              <span className="text-lg font-black leading-none">×</span>
            </button>
          </div>

          {/* Mesaj alanı - kısa */}
          <div className="p-2.5 bg-gray-50 border-b border-gray-200">
            <p className="text-gray-800 font-semibold text-xs">👋 Merhaba!</p>
            <p className="text-gray-600 text-[11px] leading-snug mt-0.5">
              {whatsAppMessageText || 'Sorularınız için WhatsApp yazın.'}
            </p>
          </div>

          {/* WhatsApp butonu - kompakt */}
          <div className="p-2.5">
            <button
              type="button"
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wide border-2 border-green-800 shadow-[3px_3px_0_0_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Sohbet Başlat
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp butonu - direkt link yerine panel açar, sitedeki buton stiline uyumlu */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-green-600 hover:bg-green-700 border-4 border-green-800 shadow-[6px_6px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 flex items-center justify-center rounded-full"
        aria-label="WhatsApp bilgi panelini aç"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-xs font-black rounded-full border-2 border-white">
          1
        </span>
      </button>
    </>
  );
};

export default WhatsAppWidget;
