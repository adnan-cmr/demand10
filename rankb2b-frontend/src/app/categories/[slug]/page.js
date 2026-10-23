import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchTopList, fetchTopLists } from '@/services/publicDataApi';
import { 
  ArrowLeft, 
  Trophy, 
  Layers, 
  ChevronRight, 
  Globe, 
  MapPin, 
  Users, 
  Building2,
  ExternalLink
} from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetchTopList(slug);
  const l = res?.list;
  if (!l) return { title: 'List not found' };
  return {
    title: `Top ${l.entries.length} ${l.title} | RankB2B`,
    description: l.description || `Top ${l.entries.length} companies: ${l.title}`,
    keywords: [...new Set([l.title, `top ${l.title}`, ...l.entries.flatMap((e) => [e.name, ...(e.keywords || []).slice(0, 5)])])].slice(0, 40),
    alternates: { canonical: `/categories/${slug}` },
  };
}

export default async function TopListPage({ params }) {
  const { slug } = await params;
  
  // Fetch the current list AND all lists (for the sidebar)
  const [listRes, allListsRes] = await Promise.all([
    fetchTopList(slug),
    fetchTopLists()
  ]);
  
  const list = listRes?.list;
  const allLists = allListsRes?.lists || [];
  
  if (!list) notFound();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* ── HEADER ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/categories" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#E11D2E] transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all categories
          </Link>
          
          <div className="flex items-start gap-4">
            <div className="p-4 bg-red-50 rounded-2xl hidden sm:block">
              <Trophy className="h-10 w-10 text-[#E11D2E]" />
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-[#E11D2E] text-xs font-bold uppercase tracking-wider mb-3">
                Top {list.entries.length} Ranking
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1B3D] leading-tight">
                {list.title}
              </h1>
              {list.description && (
                <p className="text-lg text-gray-600 mt-4 max-w-3xl">
                  {list.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT (3 Columns) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: Other Categories */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <Layers className="h-5 w-5 text-gray-400" />
                <h2 className="font-bold text-[#0F1B3D]">Other Categories</h2>
              </div>
              <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {allLists.map((l) => {
                  const isActive = l.slug === slug;
                  return (
                    <li key={l._id}>
                      <Link
                        href={`/categories/${l.slug}`}
                        className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors group ${
                          isActive 
                            ? 'bg-red-50 text-[#E11D2E] font-semibold' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#E11D2E]'
                        }`}
                      >
                        <span className="truncate pr-2">{l.title}</span>
                        {isActive ? (
                          <div className="h-1.5 w-1.5 rounded-full bg-[#E11D2E]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* MIDDLE CONTENT: The Top 10 List */}
          <div className="lg:col-span-6">
            <ol className="space-y-4">
              {list.entries.map((e, i) => (
                <li 
                  key={e._id} 
                  className="group relative bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-[#E11D2E]/40 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-5"
                >
                  {/* Rank Number */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm z-10">
                    <span className="text-lg font-black text-[#E11D2E]">{i + 1}</span>
                  </div>

                  {/* Logo */}
                  <div className="shrink-0 ml-4 sm:ml-0">
                    {e.logo ? (
                      <div className="w-20 h-20 rounded-xl border border-gray-100 bg-white p-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={e.logo} alt={e.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm text-2xl font-bold text-gray-400">
                        {e.name?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <h2 className="text-xl font-bold text-[#0F1B3D]">
                        {e.profilePath ? (
                          <Link href={e.profilePath} className="hover:text-[#E11D2E] transition-colors">
                            {e.name}
                          </Link>
                        ) : (
                          e.name
                        )}
                      </h2>
                      
                      {e.website && (
                        <a 
                          href={e.website} 
                          target="_blank" 
                          rel="noopener noreferrer nofollow" 
                          className="inline-flex items-center text-xs font-semibold text-[#E11D2E] bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                        >
                          Visit Website <ExternalLink className="ml-1.5 h-3 w-3" />
                        </a>
                      )}
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                      {e.industry && (
                        <div className="flex items-center text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                          <Building2 className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                          {e.industry}
                        </div>
                      )}
                      {(e.city || e.country) && (
                        <div className="flex items-center text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                          <MapPin className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                          {[e.city, e.country].filter(Boolean).join(', ')}
                        </div>
                      )}
                      {e.employees && (
                        <div className="flex items-center text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                          <Users className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                          {e.employees.toLocaleString()} emp
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {e.description && (
                      <p className="text-sm text-gray-600 mt-4 line-clamp-3 leading-relaxed">
                        {e.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* RIGHT SIDEBAR: Category Summary */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Highlight Card */}
              <div className="bg-gradient-to-br from-[#0F1B3D] to-[#1d2f63] rounded-2xl p-6 text-white shadow-xl">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Explore the Market</h3>
                <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                  Want to see more than just the top {list.entries.length}? Search our database of over 1 million companies.
                </p>
                <Link 
                  href="/data" 
                  className="block w-full text-center bg-[#E11D2E] hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Search Database
                </Link>
              </div>

              {/* Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-[#0F1B3D] mb-3">About this Ranking</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  This list is curated to highlight the industry leaders in <strong>{list.title}</strong>. 
                  Rankings are based on market presence, company size, and verified data.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}