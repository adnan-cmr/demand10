import { fetchTopLists, fetchDataFacets } from '@/services/publicDataApi';

export default async function sitemap() {
  const baseUrl = 'https://rankb2b.com';

  // 1. Static pages
  const routes = ['', '/data', '/categories', '/privacy-policy', '/term-policies'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic Categories
  const listsRes = await fetchTopLists();
  const lists = listsRes?.lists || [];
  const categoryRoutes = lists.map((list) => ({
    url: `${baseUrl}/categories/${list.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Dynamic Industries (Optional, but great for SEO)
  const facetsRes = await fetchDataFacets();
  const industries = facetsRes?.industries || [];
  const industryRoutes = industries.map((ind) => ({
    url: `${baseUrl}/data?industry=${ind.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...industryRoutes];
}