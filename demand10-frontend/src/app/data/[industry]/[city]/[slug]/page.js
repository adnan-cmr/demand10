import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchDataCompany } from '@/services/publicDataApi';

const SITE = 'https://demand10.com';

const location = (c) => [c.city, c.state, c.country].filter(Boolean).join(', ');

const buildDescription = (c) =>
  (c.description || '').slice(0, 160) ||
  `${c.name}${c.industry ? ` is a ${c.industry.toLowerCase()} company` : ' company profile'}${
    location(c) ? ` based in ${location(c)}` : ''
  }${c.employees ? ` with ${c.employees.toLocaleString()} employees` : ''}. View company details, technologies and similar companies.`;

export async function generateMetadata({ params }) {
  const { industry, city, slug } = await params;
  const res = await fetchDataCompany(industry, city, slug);
  const c = res?.company;
  if (!c) return { title: 'Company not found', robots: { index: false } };

  const title = `${c.name}${c.city ? ` – ${c.city}` : ''}${c.industry ? ` | ${c.industry}` : ''} Company Profile`;
  const description = buildDescription(c);
  const path = `/data/${industry}/${city}/${slug}`;
  // Imported keywords are used for SEO only and are never rendered on the page.
  const keywords = [
    ...(c.keywords || []),
    c.name,
    c.industry,
    c.city && `${c.industry || 'companies'} in ${c.city}`,
    ...(c.technologies || []).slice(0, 5),
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: `${SITE}${path}`,
      title,
      description,
      siteName: 'Demand10',
      ...(c.logo ? { images: [{ url: c.logo, alt: `${c.name} logo` }] } : {}),
    },
    twitter: { card: 'summary', title, description, ...(c.logo ? { images: [c.logo] } : {}) },
  };
}

const ext = (url) =>
  url ? (
    <a href={url} target="_blank" rel="noopener noreferrer nofollow" className="text-[#E11D2E] hover:underline break-all">
      {url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
    </a>
  ) : null;

const Stat = ({ label, value }) =>
  value ? (
    <div className="px-5 py-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 font-semibold text-[#0F1B3D] truncate">{value}</p>
    </div>
  ) : null;

const Detail = ({ label, children }) =>
  children ? (
    <div className="py-3 border-b last:border-0">
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 break-words">{children}</dd>
    </div>
  ) : null;

const Chips = ({ items, tone = 'bg-gray-100 text-gray-700' }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((t) => (
      <span key={t} className={`text-xs rounded-full px-3 py-1 ${tone}`}>{t}</span>
    ))}
  </div>
);

const Section = ({ title, children }) => (
  <section className="bg-white border rounded-xl p-6">
    <h2 className="text-lg font-bold text-[#0F1B3D] mb-3">{title}</h2>
    {children}
  </section>
);

const employeeBand = (n) => {
  if (!n) return null;
  if (n < 10) return '1–10';
  if (n < 50) return '10–50';
  if (n < 200) return '50–200';
  if (n < 1000) return '200–1,000';
  if (n < 5000) return '1,000–5,000';
  return '5,000+';
};

export default async function CompanyPage({ params }) {
  const { industry, city, slug } = await params;
  const res = await fetchDataCompany(industry, city, slug);
  const c = res?.company;
  if (!c) notFound();
  const similar = res.similar || [];

  const path = `/data/${industry}/${city}/${slug}`;
  const addr = c.address || [c.street, c.city, c.state, c.postalCode, c.country].filter(Boolean).join(', ');
  const about =
    c.description ||
    `${c.name}${c.industry ? ` operates in the ${c.industry.toLowerCase()} industry` : ''}${
      location(c) ? ` and is headquartered in ${location(c)}` : ''
    }.`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: c.name,
      url: c.website,
      logo: c.logo,
      description: buildDescription(c),
      foundingDate: c.foundedYear ? String(c.foundedYear) : undefined,
      numberOfEmployees: c.employees ? { '@type': 'QuantitativeValue', value: c.employees } : undefined,
      industry: c.industry,
      naics: c.naics,
      keywords: c.keywords?.length ? c.keywords.join(', ') : undefined,
      sameAs: [c.linkedin, c.facebook, c.twitter].filter(Boolean),
      address: {
        '@type': 'PostalAddress',
        streetAddress: c.street,
        addressLocality: c.city,
        addressRegion: c.state,
        postalCode: c.postalCode,
        addressCountry: c.country,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Company Data', item: `${SITE}/data` },
        { '@type': 'ListItem', position: 2, name: c.industry || industry, item: `${SITE}/data?industry=${industry}` },
        { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE}${path}` },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <div className="bg-gradient-to-r from-[#0F1B3D] to-[#1d2f63] text-white">
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-24">
          <nav aria-label="Breadcrumb" className="text-sm text-blue-100/80">
            <Link href="/data" className="hover:underline">Company Data</Link>
            <span className="mx-2">/</span>
            <Link href={`/data?industry=${industry}`} className="hover:underline">{c.industry || industry}</Link>
            <span className="mx-2">/</span>
            <span>{c.city || city}</span>
          </nav>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
            {c.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.logo} alt={`${c.name} logo`} className="w-24 h-24 rounded-xl object-contain bg-white p-2 shadow-lg" />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-white/10 flex items-center justify-center text-4xl font-bold">
                {c.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold">{c.name}</h1>
              <p className="mt-1 text-blue-100">{[c.industry, location(c)].filter(Boolean).join(' · ')}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {c.website && (
                  <a href={c.website} target="_blank" rel="noopener noreferrer nofollow" className="bg-[#E11D2E] hover:bg-red-700 px-5 py-2 rounded-lg font-semibold text-sm">
                    Visit website
                  </a>
                )}
                {c.linkedin && (
                  <a href={c.linkedin} target="_blank" rel="noopener noreferrer nofollow" className="border border-white/40 hover:bg-white/10 px-5 py-2 rounded-lg font-semibold text-sm">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-14">
        <div className="bg-white border rounded-xl shadow-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0">
          <Stat label="Employees" value={c.employees ? `${c.employees.toLocaleString()}${employeeBand(c.employees) ? ` (${employeeBand(c.employees)})` : ''}` : null} />
          <Stat label="Founded" value={c.foundedYear} />
          <Stat label="Industry" value={c.industry} />
          <Stat label="Headquarters" value={[c.city, c.country].filter(Boolean).join(', ')} />
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6 pb-12">
          <div className="lg:col-span-2 space-y-6">
            <Section title={`About ${c.name}`}>
              <p className="text-gray-700 leading-relaxed">{about}</p>
            </Section>

            {c.technologies?.length > 0 && (
              <Section title="Technology stack">
                <Chips items={c.technologies} />
              </Section>
            )}
            {c.services?.length > 0 && (
              <Section title="Services">
                <Chips items={c.services} tone="bg-red-50 text-red-700" />
              </Section>
            )}
            {c.partners?.length > 0 && (
              <Section title="Partners">
                <Chips items={c.partners} tone="bg-blue-50 text-blue-800" />
              </Section>
            )}

            {similar.length > 0 && (
              <Section title={`Similar ${c.industry ? `${c.industry.toLowerCase()} ` : ''}companies`}>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {similar.map((s) => (
                    <li key={s._id}>
                      <Link
                        href={`/data/${s.industrySlug}/${s.citySlug}/${s.slug}`}
                        className="flex items-center gap-3 border rounded-lg p-3 hover:shadow-md hover:border-[#E11D2E]/40 transition"
                      >
                        {s.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.logo} alt="" className="w-10 h-10 rounded object-contain bg-gray-50" loading="lazy" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                            {s.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-[#0F1B3D] truncate">{s.name}</p>
                          <p className="text-xs text-gray-500 truncate">{[s.city, s.country].filter(Boolean).join(', ')}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#0F1B3D]">Company details</h2>
              <dl className="mt-2">
                <Detail label="Website">{ext(c.website)}</Detail>
                <Detail label="Headquarters">{addr}</Detail>
                <Detail label="LinkedIn">{ext(c.linkedin)}</Detail>
                <Detail label="Facebook">{ext(c.facebook)}</Detail>
                <Detail label="Twitter">{ext(c.twitter)}</Detail>
                <Detail label="SIC code">{c.sic}</Detail>
                <Detail label="NAICS code">{c.naics}</Detail>
              </dl>
            </div>
            <div className="bg-[#0F1B3D] text-white rounded-xl p-6">
              <h2 className="font-bold">Discover more companies</h2>
              <p className="text-sm text-blue-100 mt-1">Filter by industry, location, size and founding year.</p>
              <Link href={`/data?industry=${industry}`} className="inline-block mt-4 bg-[#E11D2E] px-4 py-2 rounded-lg text-sm font-semibold">
                Browse {c.industry || 'companies'}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
