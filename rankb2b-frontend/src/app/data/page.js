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
  RotateCcw,
  ChevronDown,
  SlidersHorizontal,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Star,
  Award,
  Zap,
  MessageSquare
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

const TopFilterSelect = ({ icon: Icon, value, onChange, options, placeholder }) => (
  <div className="relative inline-block w-full sm:w-auto">
    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white hover:border-gray-400 transition-colors cursor-pointer">
      {Icon && <Icon className="h-4 w-4 text-gray-500 mr-2" />}
      <select 
        className="appearance-none bg-transparent text-sm font-medium text-gray-700 pr-6 focus:outline-none cursor-pointer w-full"
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.slug} value={o.slug}>{o.label || o.slug}</option>
        ))}
      </select>
      <ChevronDown className="h-4 w-4 text-gray-400 absolute right-4 pointer-events-none" />
    </div>
  </div>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if(e) e.preventDefault();
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
    <div className="bg-[#f8f9fa] min-h-screen pb-16 font-sans">
      
      {/* ── TOP SEARCH & FILTER BAR (STICKY) ── */}
      {/* FIX: Changed top-0 to top-[64px] to account for your global header. 
          Adjust 64px to match your exact header height (e.g., top-16 or top-[72px]). 
          Also added z-30 so it sits below the main header but above content. */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-gray-200 pt-4 pb-3 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeIndustry ? `${activeIndustry.label} Companies` : 'All Companies'}
              </h1>
              <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                {total ? total.toLocaleString() : '1,000+'} Companies
              </span>
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
               <button onClick={() => setShowMobileFilters(true)} className="lg:hidden flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
                 <SlidersHorizontal className="h-4 w-4" /> Filters
               </button>
               <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    className="w-full rounded-full pl-10 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent"
                    placeholder="Search company..."
                    value={filters.q}
                    onChange={set('q')}
                    onKeyDown={(e) => e.key === 'Enter' && submit(e)}
                  />
               </div>
            </div>
          </div>

          {/* Horizontal Filter Row */}
          <div className="flex flex-wrap items-center gap-3">
            <TopFilterSelect 
              icon={Building2} 
              value={filters.industry} 
              onChange={set('industry')} 
              options={facets.industries} 
              placeholder="Industry" 
            />
            <TopFilterSelect 
              icon={MapPin} 
              value={filters.country} 
              onChange={set('country')} 
              options={facets.countries} 
              placeholder="Country" 
            />
             <TopFilterSelect 
              icon={Users} 
              value={filters.employeesMin} 
              onChange={set('employeesMin')} 
              options={[{slug: '1-10', label: '1-10'}, {slug: '11-50', label: '11-50'}, {slug: '51-200', label: '51-200'}]} 
              placeholder="Employees" 
            />
             <TopFilterSelect 
              icon={Calendar} 
              value={filters.foundedFrom} 
              onChange={set('foundedFrom')} 
              options={[{slug: '2020', label: '2020+'}, {slug: '2010', label: '2010+'}, {slug: '2000', label: '2000+'}]} 
              placeholder="Founded" 
            />

            <button onClick={submit} className="bg-[#E11D2E] hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors ml-auto hidden sm:block">
              Apply
            </button>
            {(applied.industry || applied.country || applied.q) && (
              <button onClick={reset} className="text-sm font-medium text-gray-500 hover:text-[#E11D2E] flex items-center gap-1">
                <RotateCcw className="h-3 w-3" /> Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
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
            {companies.map((c) => {
              // Mock data to achieve the layout from the image
              const rating = c.rating || 4.5;
              const reviews = c.reviews || 12;
              const minProject = c.minProject || '$5,000+';
              const hourlyRate = c.hourlyRate || '$150 - $199 / hr';
              const employeeCount = c.employees ? `${c.employees.toLocaleString()}` : '250 - 999';
              const services = c.services?.slice(0, 3) || ['IT Managed Services', 'AI Consulting', 'Cybersecurity'];
              const servicePercentages = [70, 20, 10];
              const locationStr = [c.city, c.country].filter(Boolean).join(', ') || 'Serves India';

              return (
                <Link
                  key={c._id}
                  href={`/data/${c.industrySlug}/${c.citySlug}/${c.slug}`}
                  className="block bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                      
                      {/* Left Column (Logo & Info) */}
                      <div className="lg:w-1/3 shrink-0">
                        <div className="flex items-start gap-4">
                          {c.logo ? (
                            <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 p-1.5 flex items-center justify-center shadow-sm shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={c.logo} alt={`${c.name} logo`} className="max-w-full max-h-full object-contain" />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-[#0F1B3D] flex items-center justify-center text-2xl font-extrabold text-white shrink-0 shadow-sm">
                              {c.name?.[0]?.toUpperCase()}
                            </div>
                          )}
                          
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 leading-tight flex items-center gap-2 flex-wrap group-hover:text-[#E11D2E] transition-colors">
                              {c.name}
                              <CheckCircle2 className="h-4 w-4 text-[#E11D2E] fill-[#E11D2E] text-white" title="Verified" />
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center text-[#E11D2E]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-sm font-bold text-gray-900">{rating.toFixed(1)}</span>
                              <span className="text-sm text-gray-500">({reviews} reviews)</span>
                            </div>
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
                            <span>Location: <strong className="text-gray-900">{locationStr}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column (Services & Description) */}
                      <div className="lg:w-2/3 lg:border-l lg:border-gray-100 lg:pl-8 mt-6 lg:mt-0">
                        <div className="grid md:grid-cols-2 gap-8">
                          
                          {/* Services Bar Chart */}
                          <div>
                            <h3 className="text-xs font-bold text-gray-900 mb-4 flex items-center gap-1 uppercase tracking-wide">
                              Services Provided
                              <span className="text-gray-400 font-normal text-[10px] border border-gray-200 rounded-full w-4 h-4 flex items-center justify-center">?</span>
                            </h3>
                            <div className="space-y-4">
                              {services.map((service, idx) => (
                                <div key={idx} className="mb-3">
                                  <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="flex items-center gap-1.5 font-medium text-gray-700">
                                      <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-[#0F1B3D]' : idx === 1 ? 'bg-[#5B7AB5]' : 'bg-[#8DA6C9]'}`} />
                                      {service}
                                    </span>
                                    <span className="text-gray-500 text-xs font-semibold">{servicePercentages[idx] || 10}%</span>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div className={`${idx === 0 ? 'bg-[#0F1B3D]' : idx === 1 ? 'bg-[#5B7AB5]' : 'bg-[#8DA6C9]'} h-1.5 rounded-full`} style={{ width: `${servicePercentages[idx] || 10}%` }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button className="text-sm text-[#0F1B3D] font-semibold mt-2 hover:underline flex items-center">
                              See all {services.length} services <ChevronDown className="h-4 w-4 ml-1" />
                            </button>
                          </div>

                          {/* Description */}
                          <div>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-5">
                              {c.description || `At ${c.name}, we are a comprehensive technology services provider specializing in IT Managed Services and ERP consulting. We focus on Sage systems and offer a full suite of services to help businesses optimize their operations. Our team is highly rated by clients for project timeliness, clarity, and expertise.`}
                            </p>
                            <button className="text-sm text-[#0F1B3D] font-semibold mt-3 hover:underline flex items-center">
                              See all {reviews} projects <ChevronDown className="h-4 w-4 ml-1" />
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-xl">
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        Detail-oriented
                      </span>
                      <span className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                        <Star className="h-4 w-4 text-gray-400" />
                        4.5 out of 5.0 rating for cost
                      </span>
                      <span className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                        <Zap className="h-4 w-4 text-gray-400" />
                        Very responsive
                      </span>
                      <span className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                        <Award className="h-4 w-4 text-gray-400" />
                        Completed projects in 2 countries
                      </span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                      <button className="flex-1 sm:flex-none border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-2 rounded-lg text-sm transition-colors">
                        View Profile
                      </button>
                      <a 
                        href={c.website || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer nofollow" 
                        className="flex-1 sm:flex-none bg-[#E11D2E] hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty / Loading States */}
          {!loading && !companies.length && !error && (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
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
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-bold transition-colors shadow-sm"
              >
                Load More Companies
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}