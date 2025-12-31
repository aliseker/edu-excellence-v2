import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://edu-excellence.com';
  
  const routes = [
    '',
    '/universite',
    '/dil-okulu',
    '/yaz-okulu',
    '/lise',
    '/master-mba',
    '/vize',
    '/iletisim',
    '/hakkimizda',
    '/blog',
  ];

  const countries = ['kanada', 'ingiltere', 'amerika', 'almanya', 'italya', 'fransa', 'avustralya', 'irlanda'];
  
  const countryRoutes = countries.map(country => `/universite/${country}`);

  return [
    ...routes.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...countryRoutes.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}









