import DataExplorer from '@/Componenets/Data/DataExplorer';
import { fetchDataCompanies, fetchDataFacets } from '@/services/publicDataApi';

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const industrySlug = typeof sp?.industry === 'string' ? sp.industry : '';
  const facets = await fetchDataFacets();
  const industry = facets?.industries?.find((i) => i.slug === industrySlug);
  const title = industry ? `${industry.label} Companies` : 'Company Data – Search & Filter Companies';
  const description = industry
    ? `Browse ${industry.count.toLocaleString()} ${industry.label.toLowerCase()} companies. Filter by location, size and founding year.`
    : 'Browse and filter companies by industry, location, size and founding year.';
  const keywords = [
    'company data',
    'company directory',
    'B2B company database',
    ...(facets?.industries || []).slice(0, 10).map((i) => `${i.label} companies`),
    ...(facets?.countries || []).slice(0, 5).map((c) => `companies in ${c.label}`),
  ];
  return {
    title,
    description,
    keywords,
    alternates: { canonical: industry ? `/data?industry=${industrySlug}` : '/data' },
    openGraph: { title, description, type: 'website', siteName: 'Demand10' },
  };
}

export default async function DataPage({ searchParams }) {
  const sp = await searchParams;
  const industry = typeof sp?.industry === 'string' ? sp.industry : '';
  const [first, facets] = await Promise.all([
    fetchDataCompanies({ industry, limit: 24 }),
    fetchDataFacets(),
  ]);
  const initialData = first?.ok && facets
    ? { companies: first.companies, nextCursor: first.nextCursor ?? null, total: first.total ?? null, facets }
    : null;
  return <DataExplorer initialIndustry={industry} initialData={initialData} />;
}
