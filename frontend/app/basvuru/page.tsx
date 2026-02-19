'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import { sanitizeInput, isValidEmail, isValidPhone } from '@/utils/sanitize';

export default function BasvuruPage() {
  const [formData, setFormData] = useState({
    programType: '',
    country: '',
    university: '',
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    educationLevel: '',
    gpa: '',
    languageScore: '',
    languageTest: '',
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
        programType: sanitizeInput(formData.programType),
        country: sanitizeInput(formData.country),
        university: sanitizeInput(formData.university),
        name: sanitizeInput(formData.name),
        email: formData.email.trim(),
        phone: sanitizeInput(formData.phone),
        birthDate: formData.birthDate,
        educationLevel: sanitizeInput(formData.educationLevel),
        gpa: sanitizeInput(formData.gpa),
        languageScore: sanitizeInput(formData.languageScore),
        languageTest: sanitizeInput(formData.languageTest),
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

      if (!isValidPhone(sanitizedData.phone)) {
        setSubmitStatus('error');
        alert('Lütfen geçerli bir telefon numarası girin.');
        setIsSubmitting(false);
        return;
      }

      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        programType: '',
        country: '',
        university: '',
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        educationLevel: '',
        gpa: '',
        languageScore: '',
        languageTest: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Geometric Style */}
      <section className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 text-white py-12 border-b-4 border-gray-900 overflow-hidden">
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
            <span className="transform skew-x-12 text-sm font-black uppercase tracking-wider">🚀 Başvuru Formu</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            YURTDIŞI EĞİTİM
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white/30 transform -skew-x-12 -z-10"></span>
              <span className="relative">BAŞVURUSU</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 font-medium max-w-2xl">
            Hayalinizdeki eğitimi bulun! Profesyonel danışmanlık hizmetimizle yanınızdayız.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
          {submitStatus === 'success' && (
            <div className="bg-green-500 text-white px-6 py-4 border-4 border-green-700 mb-6 transform -skew-x-2 shadow-lg">
              <div className="transform skew-x-2 font-bold text-sm uppercase tracking-wider">
                ✅ Başvurunuz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
              </div>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-500 text-white px-6 py-4 border-4 border-red-700 mb-6 transform -skew-x-2 shadow-lg">
              <div className="transform skew-x-2 font-bold text-sm uppercase tracking-wider">
                ❌ Bir hata oluştu. Lütfen tekrar deneyin.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Program Type */}
            <div>
              <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                Program Türü *
              </label>
              <select
                name="programType"
                value={formData.programType}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500"
              >
                <option value="">-- Seçiniz --</option>
                <option value="dil-okulu">Dil Okulu</option>
                <option value="yaz-okulu">Yaz Okulu</option>
                <option value="lise">Lise</option>
                <option value="universite">Üniversite</option>
                <option value="master">Master</option>
                <option value="mba">MBA</option>
                <option value="staj">Yurtdışı Staj</option>
                <option value="erasmus">Erasmus+</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <div>
                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                  Ülke *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500"
                >
                  <option value="">-- Seçiniz --</option>
                  <option value="kanada">🇨🇦 Kanada</option>
                  <option value="ingiltere">🇬🇧 İngiltere</option>
                  <option value="amerika">🇺🇸 Amerika</option>
                  <option value="almanya">🇩🇪 Almanya</option>
                  <option value="italya">🇮🇹 İtalya</option>
                  <option value="fransa">🇫🇷 Fransa</option>
                  <option value="ispanya">🇪🇸 İspanya</option>
                  <option value="avustralya">🇦🇺 Avustralya</option>
                  <option value="yeni-zelanda">🇳🇿 Yeni Zelanda</option>
                </select>
              </div>

              {/* University */}
              <div>
                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                  Üniversite/Okul
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="Üniversite adı (opsiyonel)"
                  className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Personal Info */}
            <div className="border-t-4 border-gray-900 pt-8">
              <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
                <h3 className="transform skew-x-12 text-lg font-black uppercase tracking-wider">👤 Kişisel Bilgiler</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                    Doğum Tarihi
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Education Info */}
            <div className="border-t-4 border-gray-900 pt-8">
              <div className="inline-block px-5 py-2.5 bg-violet-600 text-white border-4 border-violet-800 transform -skew-x-12 mb-6">
                <h3 className="transform skew-x-12 text-lg font-black uppercase tracking-wider">🎓 Eğitim Bilgileri</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                    Eğitim Seviyesi *
                  </label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500"
                  >
                    <option value="">-- Seçiniz --</option>
                    <option value="lise">Lise</option>
                    <option value="onlisans">Ön Lisans</option>
                    <option value="lisans">Lisans</option>
                    <option value="yuksek-lisans">Yüksek Lisans</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                    Not Ortalaması (GPA)
                  </label>
                  <input
                    type="number"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    max="4"
                    placeholder="4.00 üzerinden"
                    className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                    Dil Sınavı
                  </label>
                  <select
                    name="languageTest"
                    value={formData.languageTest}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500"
                  >
                    <option value="">-- Seçiniz --</option>
                    <option value="ielts">IELTS</option>
                    <option value="toefl">TOEFL</option>
                    <option value="pte">PTE Academic</option>
                    <option value="yok">Yok</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                    Dil Skoru
                  </label>
                  <input
                    type="text"
                    name="languageScore"
                    value={formData.languageScore}
                    onChange={handleChange}
                    placeholder="Örn: 7.5 (IELTS) veya 100 (TOEFL)"
                    className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">
                Mesajınız / Ek Bilgiler
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Eklemek istediğiniz bilgiler, sorularınız veya özel istekleriniz..."
                className="w-full px-5 py-4 border-4 border-gray-900 bg-white font-bold text-gray-900 focus:border-purple-600 focus:outline-none transition-all duration-200 hover:border-purple-500 placeholder:text-gray-400 resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative px-10 py-5 bg-purple-600 text-white font-black text-lg uppercase tracking-wider border-4 border-purple-800 hover:bg-purple-700 hover:border-purple-900 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    GÖNDERİLİYOR...
                  </>
                ) : (
                  <>
                    <span>Başvuruyu Gönder</span>
                    <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}





