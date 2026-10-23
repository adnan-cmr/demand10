'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { fetchDataCompanies, fetchDataFacets } from '@/services/publicDataApi';
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar, 
  Building2, 
  Filter, 
  RotateCcw,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';

const EMPTY = { q: '', industry: '', country: '', city: '', employeesMin: '', employeesMax: '', foundedFrom: '', foundedTo: '' };

const inputBase = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent transition-all';

const Field = ({ label, icon: Icon, children }) => (
  <label className="block">
    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </span>
    {children}
  </label>
);

export default function DataExplorer({ initialIndustry = '', initialData = null }) {
  const start = { ...EMPTY, industry: initialIndustry };
  const [filters, setFilters] = useState(start);
  const [applied, setApplied] = useState(start);
  const [facets, setFacets] = useState(initialData?.facets || { industries: [], countries: [], cities: [] });
  const [companies, setCompanies] = useState(initialData?.companies || []);
  const [cursor, setCursor] = useState(initialData?.nextCursor ?? null);
  const [total, setTotal] = useState(initialData?.total ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const requestId = useRef(0);
  const loadingRef = useRef(!initialData);
  const skipInitial = useRef(Boolean(initialData));

  useEffect(() => {
    if (initialData?.facets && !filters.country) return;
    fetchDataFacets(filters.country).then((f) => f && setFacets(f));
  }, [filters.country]);

  const load = useCallback(async (params, after) => {
    if (after && loadingRef.current) return;
    const id = ++requestId.current;
    loadingRef.current = true;
    if (!after) setCursor(null);
    setLoading(true);
    setError('');
    
    const res = await fetchDataCompanies({ ...params, after });
    if (id !== requestId.current) return;
    
    if (!res?.ok) {
      setError('Could not load data. Please try again.');
    } else {
      setCompanies((prev) => (after ? [...prev, ...res.companies] : res.companies));
      setCursor(res.nextCursor);
      if (!after) setTotal(res.total ?? null);
    }
    loadingRef.current = false;
    setLoading(false);
  }, []);

  useEffect(() => {
    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }
    load(applied, undefined);
  }, [applied, load]);

  const set = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value, ...(k === 'country' ? { city: '' } : {}) }));
  
  const submit = (e) => {
    e.preventDefault();
    setApplied(filters);
    setShowMobileFilters(false);
  };
  
  const reset = () => {
    setFilters(EMPTY);
    setApplied(EMPTY);
  };

  const activeIndustry = facets.industries.find((i) => i.slug === applied.industry);

  const FilterSidebar = () => (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h2 className="font-bold text-lg text-[#0F1B3D] flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-400" /> Filters
        </h2>
        <button type="button" onClick={reset} className="text-xs font-semibold text-gray-500 hover:text-[#E11D2E] flex items-center gap-1">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <Field label="Industry" icon={Building2}>
        <select className={inputBase} value={filters.industry} onChange={set('industry')}>
          <option value="">All industries</option>
          {facets.industries.map((i) => (
            <option key={i.slug} value={i.slug}>{i.label || i.slug} ({i.count.toLocaleString()})</option>
          ))}
        </select>
      </Field>

      <Field label="Country" icon={MapPin}>
        <select className={inputBase} value={filters.country} onChange={set('country')}>
          <option value="">All countries</option>
          {facets.countries.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label} ({c.count.toLocaleString()})</option>
          ))}
        </select>
      </Field>

      <Field label="City" icon={MapPin}>
        <select className={inputBase} value={filters.city} onChange={set('city')} disabled={!filters.country}>
          <option value="">{filters.country ? 'All cities' : 'Select a country first'}</option>
          {facets.cities.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label || c.slug} ({c.count.toLocaleString()})</option>
          ))}
        </select>
      </Field>

      <Field label="Employees" icon={Users}>
        <div className="grid grid-cols-2 gap-2">
          <input className={inputBase} type="number" min="0" placeholder="Min" value={filters.employeesMin} onChange={set('employeesMin')} />
          <input className={inputBase} type="number" min="0" placeholder="Max" value={filters.employeesMax} onChange={set('employeesMax')} />
        </div>
      </Field>

      <Field label="Founded Year" icon={Calendar}>
        <div className="grid grid-cols-2 gap-2">
          <input className={inputBase} type="number" placeholder="From" value={filters.foundedFrom} onChange={set('foundedFrom')} />
          <input className={inputBase} type="number" placeholder="To" value={filters.foundedTo} onChange={set('foundedTo')} />
        </div>
      </Field>

      <button type="submit" className="w-full bg-[#E11D2E] hover:bg-red-700 text-white px-4 py-3 rounded-xl font-bold transition-colors shadow-md">
        Apply Filters
      </button>
    </form>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* ── SEARCH HERO ── */}
      <section className="bg-gradient-to-r from-[#0F1B3D] to-[#1d2f63] text-white pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {activeIndustry ? `${activeIndustry.label} Companies` : 'Company Database'}
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Search our database of over {total ? total.toLocaleString() : '1 million'} verified companies. Filter by industry, location, size, and founding year.
          </p>
          
          <form onSubmit={submit} className="mt-8 max-w-3xl flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                className="w-full rounded-xl pl-12 pr-4 py-4 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#E11D2E] shadow-lg border-none"
                placeholder="Search company name…"
                value={filters.q}
                onChange={set('q')}
              />
            </div>
            <button type="submit" className="bg-[#E11D2E] hover:bg-red-700 px-8 py-4 rounded-xl font-bold text-base transition-colors shadow-lg">
              Search
            </button>
            <button 
              type="button" 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Filter className="h-5 w-5" /> Filters
            </button>
          </form>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid lg:grid-cols-[20rem_1fr] gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Sidebar Drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
              <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto p-4 animate-slide-in-right">
                <button onClick={() => setShowMobileFilters(false)} className="mb-4 text-gray-500 font-semibold">Close</button>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Company List */}
          <main>
            {error && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">{error}</div>}

            <div className="space-y-4">
              {companies.map((c) => (
                <Link
                  key={c._id}
                  href={`/data/${c.industrySlug}/${c.citySlug}/${c.slug}`}
                  className="group flex flex-col sm:flex-row gap-5 bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#E11D2E]/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Logo */}
                  <div className="shrink-0">
                    {c.logo ? (
                      <div className="w-16 h-16 rounded-xl border border-gray-100 bg-gray-50 p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.logo} alt={`${c.name} logo`} className="max-w-full max-h-full object-contain" loading="lazy" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400">
                        {c.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-xl font-bold text-[#0F1B3D] group-hover:text-[#E11D2E] transition-colors">
                          {c.name}
                        </h2>
                        {c.industry && (
                          <span className="inline-block mt-1 text-xs font-semibold bg-red-50 text-[#E11D2E] rounded-md px-2 py-0.5">
                            {c.industry}
                          </span>
                        )}
                      </div>
                    </div>

                    {c.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                        {c.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-medium text-gray-500">
                      {(c.city || c.country) && (
                        <div className="flex items-center">
                          <MapPin className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                          {[c.city, c.country].filter(Boolean).join(', ')}
                        </div>
                      )}
                      {c.employees && (
                        <div className="flex items-center">
                          <Users className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                          {c.employees.toLocaleString()} employees
                        </div>
                      )}
                      {c.foundedYear && (
                        <div className="flex items-center">
                          <Calendar className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                          Founded {c.foundedYear}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="hidden sm:flex items-center justify-center w-10 text-gray-300 group-hover:text-[#E11D2E] transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty / Loading States */}
            {!loading && !companies.length && !error && (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700">No companies found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                <button onClick={reset} className="mt-6 text-[#E11D2E] font-semibold hover:underline">
                  Clear all filters
                </button>
              </div>
            )}

            {loading && (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E11D2E]"></div>
              </div>
            )}

            {/* Load More */}
            {cursor && !loading && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => load(applied, cursor)} 
                  className="bg-white border-2 border-[#E11D2E] text-[#E11D2E] hover:bg-red-50 px-8 py-3 rounded-xl font-bold transition-colors shadow-sm"
                >
                  Load More Companies
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}