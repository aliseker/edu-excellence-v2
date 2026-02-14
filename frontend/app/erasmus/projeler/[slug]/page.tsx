'use client';

import { use } from 'react';
import ErasmusContentPage from '@/components/ErasmusContentPage';

type Props = { params: Promise<{ slug: string }> };

export default function ErasmusProjelerSlugPage({ params }: Props) {
  const { slug } = use(params);
  return <ErasmusContentPage slug={slug} pageTitle="Projelerimiz" />;
}
