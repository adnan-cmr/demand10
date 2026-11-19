import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchDataCompany } from '@/services/publicDataApi';
import { 
  Globe, 
  Linkedin, 
  MapPin, 
  Users, 
  Calendar, 
  Building2, 
  ChevronRight,
  Star,
  CheckCircle2,
  DollarSign,
  Briefcase
} from 'lucide-react';

const SITE = 'https://rankb2b.com';

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
      siteName: 'RankB2B',
      ...(c.logo ? { images: [{ url: c.logo, alt: `${c.name} logo` }] } : {}),
    },
    twitter: { card: 'summary', title, description, ...(c.logo ? { images: [c.logo] } : {}) },
  };
}

// Helper to render star ratings
const StarRating = ({ rating = 4.5, reviews = 0 }) => {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex items-center text-[#E11D2E]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-4 w-4 ${star <= Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <span className="text-sm font-bold text-gray-900">{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">({reviews} reviews)</span>
    </div>
  );
};

// Helper to render the progress bar stats
const ServiceBar = ({ label, percentage, color = 'bg-[#0F1B3D]' }) => (
  <div className="mb-3">
    <div className="flex items-center justify-between text-sm mb-1">
      <span className="flex items-center gap-1.5 font-medium text-gray-700">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        {label}
      </span>
      <span className="text-gray-500 text-xs font-semibold">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

export default async function CompanyPage({ params }) {
  const { industry, city, slug } = await params;
  const res = await fetchDataCompany(industry, city, slug);
  const c = res?.company;
  if (!c) notFound();
  const similar = res.similar || [];

  const path = `/data/${industry}/${city}/${slug}`;
  
  // Mock data for the new design (replace with actual data fields if available)
  const rating = c.rating || 4.5;
  const reviews = c.reviews || 12;
  const hourlyRate = c.hourlyRate || '$150 - $199 / hr';
  const minProject = c.minProject || '$5,000+';
  const employeeCount = c.employees ? `${c.employees.toLocaleString()}` : '250 - 999';
  const services = c.services?.slice(0, 3) || ['IT Managed Services', 'AI Consulting', 'Cybersecurity'];
  
  // Mock percentages for the bars
  const servicePercentages = [70, 20, 10]; 

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
    <div className="bg-gray-50 min-h-screen pb-16 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      {/* Top Navigation / Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-gray-500 flex items-center flex-wrap gap-2">
            <Link href="/data" className="hover:text-[#E11D2E] transition-colors">All Companies</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/data?industry=${industry}`} className="hover:text-[#E11D2E] transition-colors">{c.industry || industry}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{c.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* Main Profile Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left Column (Logo & Info) */}
              <div className="lg:w-1/3 shrink-0">
                <div className="flex items-start gap-4">
                  {c.logo ? (
                    <div className="w-20 h-20 rounded-xl bg-white border border-gray-100 p-2 flex items-center justify-center shadow-sm shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.logo} alt={`${c.name} logo`} className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-[#0F1B3D] flex items-center justify-center text-3xl font-extrabold text-white shrink-0 shadow-sm">
                      {c.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight flex items-center gap-2 flex-wrap">
                      {c.name}
                      <CheckCircle2 className="h-5 w-5 text-[#E11D2E] fill-[#E11D2E] text-white" title="Verified" />
                    </h1>
                    <StarRating rating={rating} reviews={reviews} />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>Min. project size: <strong className="text-gray-900">{minProject}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span>Hourly Rate: <strong className="text-gray-900">{hourlyRate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>Employees: <strong className="text-gray-900">{employeeCount}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>Location: <strong className="text-gray-900">{location(c) || 'Global'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column (Services & Description) */}
              <div className="lg:w-2/3 lg:border-l lg:border-gray-100 lg:pl-8 mt-6 lg:mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Services Bar Chart */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-1">
                      SERVICES PROVIDED
                      <span className="text-gray-400 font-normal text-xs border border-gray-200 rounded-full w-4 h-4 flex items-center justify-center">?</span>
                    </h3>
                    <div className="space-y-4">
                      {services.map((service, idx) => (
                        <ServiceBar 
                          key={idx} 
                          label={service} 
                          percentage={servicePercentages[idx] || 10} 
                          color={idx === 0 ? 'bg-[#0F1B3D]' : idx === 1 ? 'bg-[#5B7AB5]' : 'bg-[#8DA6C9]'}
                        />
                      ))}
                    </div>
                    <button className="text-sm text-[#E11D2E] font-semibold mt-2 hover:underline flex items-center">
                      See all {services.length} services <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
                      {c.description || `At ${c.name}, we are a comprehensive technology services provider specializing in IT Managed Services and ERP consulting. We focus on Sage systems and offer a full suite of services to help businesses optimize their operations. Our team is highly rated by clients for project timeliness, clarity, and expertise.`}
                    </p>
                    <button className="text-sm text-[#E11D2E] font-semibold mt-3 hover:underline flex items-center">
                      See all {reviews} projects <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
               <span className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
                 <CheckCircle2 className="h-4 w-4 text-gray-400" />
                 Detail-oriented
               </span>
               <span className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
                 <Star className="h-4 w-4 text-gray-400" />
                 4.5 out of 5.0 rating
               </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                View Profile
              </button>
              <a 
                href={c.website || '#'} 
                target="_blank" 
                rel="noopener noreferrer nofollow" 
                className="flex-1 sm:flex-none bg-[#E11D2E] hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors text-center"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#0F1B3D] mb-4">Company Details</h2>
                <dl className="space-y-4">
                    {c.foundedYear && (
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <dt className="text-sm text-gray-500">Founded</dt>
                            <dd className="text-sm font-medium text-gray-900">{c.foundedYear}</dd>
                        </div>
                    )}
                    {c.linkedin && (
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <dt className="text-sm text-gray-500">LinkedIn</dt>
                            <dd className="text-sm font-medium text-[#E11D2E] hover:underline truncate max-w-[200px]">
                                <a href={c.linkedin} target="_blank" rel="noopener noreferrer">{c.linkedin.replace('https://', '')}</a>
                            </dd>
                        </div>
                    )}
                     {c.sic && (
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <dt className="text-sm text-gray-500">SIC Code</dt>
                            <dd className="text-sm font-medium text-gray-900">{c.sic}</dd>
                        </div>
                    )}
                    {c.naics && (
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <dt className="text-sm text-gray-500">NAICS Code</dt>
                            <dd className="text-sm font-medium text-gray-900">{c.naics}</dd>
                        </div>
                    )}
                </dl>
            </div>

            {similar.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#0F1B3D] mb-4">Similar Companies</h2>
                    <div className="space-y-4">
                        {similar.slice(0, 3).map((s) => (
                            <Link key={s._id} href={`/data/${s.industrySlug}/${s.citySlug}/${s.slug}`} className="flex items-center gap-4 group">
                                {s.logo ? (
                                    <div className="w-10 h-10 rounded border border-gray-100 p-1 bg-white flex-shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={s.logo} alt="" className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-500 flex-shrink-0">
                                        {s.name?.[0]}
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-sm text-gray-900 group-hover:text-[#E11D2E] transition-colors">{s.name}</p>
                                    <p className="text-xs text-gray-500">{location(s)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}