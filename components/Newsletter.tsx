'use client';

import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    // API çağrısı burada yapılacak
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
          <span className="text-white text-sm font-semibold">📧 E-posta Bülteni</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Haberlerden Haberdar Olun
        </h2>
        <p className="text-xl text-purple-50 mb-10">
          Yurtdışı eğitim fırsatları, promosyonlar ve güncel haberlerden ilk siz haberdar olun
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              className="flex-1 px-6 py-4 border-4 border-white/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white text-lg font-bold"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-white text-purple-600 font-black uppercase tracking-wider border-4 border-white hover:bg-purple-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[6px_6px_0_0_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Abone Ol'}
            </button>
          </div>
          
          {status === 'success' && (
            <p className="mt-6 text-purple-100 font-semibold text-lg">
              ✓ Başarıyla abone oldunuz!
            </p>
          )}
          {status === 'error' && (
            <p className="mt-6 text-red-200 font-semibold text-lg">
              Bir hata oluştu. Lütfen tekrar deneyin.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
