'use client';

import { useState, useEffect } from 'react';
import Accordion from '@/components/Accordion';
import { apiService } from '@/services/api';

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
};

export default function SSSContent() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiService.getActiveFaqs();
        setFaqs(Array.isArray(data) ? (data as FaqItem[]) : []);
      } catch (e) {
        setError('Sorular yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-600 font-semibold">Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  const accordionItems = faqs.map((faq) => ({
    title: faq.question,
    content: faq.answer,
  }));

  if (accordionItems.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="font-semibold">Henüz soru eklenmemiş.</p>
      </div>
    );
  }

  return <Accordion items={accordionItems} defaultOpen={0} />;
}
