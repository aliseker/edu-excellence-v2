'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import { sanitizeInput, isValidEmail, isValidPhone } from '@/utils/sanitize';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Sanitize and validate inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: formData.email.trim(),
        phone: formData.phone ? sanitizeInput(formData.phone) : '',
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message)
      };

      // Validate required fields
      if (!sanitizedData.name || sanitizedData.name.length < 2) {
        setSubmitStatus('error');
        alert('Lütfen geçerli bir ad soyad girin (en az 2 karakter).');
        setIsSubmitting(false);
        return;
      }

      if (!isValidEmail(sanitizedData.email)) {
        setSubmitStatus('error');
        alert('Lütfen geçerli bir e-posta adresi girin.');
        setIsSubmitting(false);
        return;
      }

      if (sanitizedData.phone && !isValidPhone(sanitizedData.phone)) {
        setSubmitStatus('error');
        alert('Lütfen geçerli bir telefon numarası girin.');
        setIsSubmitting(false);
        return;
      }

      if (!sanitizedData.message || sanitizedData.message.length < 10) {
        setSubmitStatus('error');
        alert('Mesajınız en az 10 karakter olmalıdır.');
        setIsSubmitting(false);
        return;
      }

      // API çağrısı burada yapılacak - SMTP ile iletişim maili gönderilecek
      // Email başlığı: "İletişim Formu - Edu-Excellence"
      // Admin panelden email adresi belirlenecek
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">📧 İletişim</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            BİZE ULAŞIN
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">SORULARINIZ İÇİN</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 font-medium max-w-2xl">
            Yurtdışı eğitim hakkında merak ettikleriniz için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-8">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">✉️ İletişim Formu</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-4 border-gray-900 focus:border-purple-600 focus:outline-none font-medium text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                  E-posta *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-4 border-gray-900 focus:border-purple-600 focus:outline-none font-medium text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-4 border-gray-900 focus:border-purple-600 focus:outline-none font-medium text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                  Konu *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-4 border-gray-900 focus:border-purple-600 focus:outline-none font-medium text-gray-900 bg-white"
                >
                  <option value="">Konu Seçiniz</option>
                  <option value="dil-okulu">Dil Okulu</option>
                  <option value="yaz-okulu">Yaz Okulu</option>
                  <option value="universite">Yurtdışı Üniversite</option>
                  <option value="master-mba">Master / MBA</option>
                  <option value="staj">Yurtdışı Staj</option>
                  <option value="erasmus">Erasmus+</option>
                  <option value="lise">Lise</option>
                  <option value="vize">Vize Danışmanlığı</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                  Mesajınız *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-4 border-gray-900 focus:border-purple-600 focus:outline-none font-medium text-gray-900 resize-none"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border-4 border-green-600 text-green-900 px-6 py-4 font-bold">
                  ✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-100 border-4 border-red-600 text-red-900 px-6 py-4 font-bold">
                  ✗ Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan telefon/email ile iletişime geçin.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-black text-lg uppercase tracking-wider border-4 border-gray-900 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-x-1 hover:-translate-y-1"
              >
                {isSubmitting ? 'GÖNDERİLİYOR...' : 'GÖNDER'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
              <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-8">
                <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📍 İletişim Bilgileri</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-14 h-14 bg-blue-100 border-4 border-blue-300 flex items-center justify-center flex-shrink-0 transform -skew-x-1">
                    <svg className="w-7 h-7 text-blue-600 transform skew-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-black text-gray-900 mb-2 text-lg uppercase">Adres</h3>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      Tahılpazarı Mahallesi, 477 sk.
                      <br />
                      Yerebakan İş Merkezi,
                      <br />
                      No-302
                      <br />
                      Muratpaşa, Antalya / Türkiye
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-14 h-14 bg-green-100 border-4 border-green-300 flex items-center justify-center flex-shrink-0 transform -skew-x-1">
                    <svg className="w-7 h-7 text-green-600 transform skew-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-black text-gray-900 mb-2 text-lg uppercase">Telefon</h3>
                    <a href="tel:+905054469007" className="text-gray-700 font-bold text-lg hover:text-purple-600 transition-colors">
                      +90 505 446 90 07
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-14 h-14 bg-purple-100 border-4 border-purple-300 flex items-center justify-center flex-shrink-0 transform -skew-x-1">
                    <svg className="w-7 h-7 text-purple-600 transform skew-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-black text-gray-900 mb-2 text-lg uppercase">E-posta</h3>
                    <a href="mailto:info@edu-excellence.net" className="text-gray-700 font-bold text-lg hover:text-purple-600 transition-colors">
                      info@edu-excellence.net
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] p-8 md:p-10 text-white">
              <div className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-6">
                <h3 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🕐 Çalışma Saatleri</h3>
              </div>
              <div className="space-y-3 font-medium text-lg">
                <div className="flex justify-between border-b-2 border-white/20 pb-2">
                  <span className="font-bold">Pazartesi - Cuma</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between border-b-2 border-white/20 pb-2">
                  <span className="font-bold">Cumartesi</span>
                  <span>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Pazar</span>
                  <span>Kapalı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
