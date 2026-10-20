'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { fetchDataCompanies, fetchDataFacets } from '@/services/publicDataApi';

const EMPTY = { q: '', industry: '', country: '', city: '', employeesMin: '', employeesMax: '', foundedFrom: '', foundedTo: '' };

const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-400';

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">{label}</span>
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
  const requestId = useRef(0);
  const loadingRef = useRef(!initialData);
  // the server already rendered the first page; skip refetching it on mount
  const skipInitial = useRef(Boolean(initialData));

  useEffect(() => {
    if (initialData?.facets && !filters.country) return;
    fetchDataFacets(filters.country).then((f) => f && setFacets(f));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.country]);

  const load = useCallback(async (params, after) => {
    // a pending load-more must not fire with a cursor from before a filter change
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
  };
  const reset = () => {
    setFilters(EMPTY);
    setApplied(EMPTY);
  };

  const activeIndustry = facets.industries.find((i) => i.slug === applied.industry);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-[#0F1B3D] to-[#1d2f63] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {activeIndustry ? `${activeIndustry.label} companies` : 'Company Data'}
          </h1>
          <p className="mt-2 text-blue-100 max-w-2xl">
            Search our company database by name, industry, location, size and founding year
            {total ? ` — ${total.toLocaleString()} companies` : ''}.
          </p>
          <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <input
              className="flex-1 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Search company name…"
              aria-label="Search company name"
              value={filters.q}
              onChange={set('q')}
            />
            <button type="submit" className="bg-[#E11D2E] hover:bg-red-700 px-6 py-3 rounded-lg font-semibold">Search</button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[18rem_1fr] gap-6">
        <aside>
          <form onSubmit={submit} className="bg-white border rounded-xl p-4 space-y-4 lg:sticky lg:top-4">
            <h2 className="font-bold text-[#0F1B3D]">Filters</h2>
            <Field label="Industry">
              <select className={input} value={filters.industry} onChange={set('industry')}>
                <option value="">All industries</option>
                {facets.industries.map((i) => (
                  <option key={i.slug} value={i.slug}>{i.label || i.slug} ({i.count.toLocaleString()})</option>
                ))}
              </select>
            </Field>
            <Field label="Country">
              <select className={input} value={filters.country} onChange={set('country')}>
                <option value="">All countries</option>
                {facets.countries.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label} ({c.count.toLocaleString()})</option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <select className={input} value={filters.city} onChange={set('city')} disabled={!filters.country}>
                <option value="">{filters.country ? 'All cities' : 'Select a country first'}</option>
                {facets.cities.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label || c.slug} ({c.count.toLocaleString()})</option>
                ))}
              </select>
            </Field>
            <Field label="Employees">
              <div className="grid grid-cols-2 gap-2">
                <input className={input} type="number" min="0" placeholder="Min" value={filters.employeesMin} onChange={set('employeesMin')} />
                <input className={input} type="number" min="0" placeholder="Max" value={filters.employeesMax} onChange={set('employeesMax')} />
              </div>
            </Field>
            <Field label="Founded">
              <div className="grid grid-cols-2 gap-2">
                <input className={input} type="number" placeholder="From" value={filters.foundedFrom} onChange={set('foundedFrom')} />
                <input className={input} type="number" placeholder="To" value={filters.foundedTo} onChange={set('foundedTo')} />
              </div>
            </Field>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-[#E11D2E] text-white px-4 py-2 rounded-lg font-semibold">Apply</button>
              <button type="button" onClick={reset} className="border px-4 py-2 rounded-lg">Reset</button>
            </div>
          </form>
        </aside>

        <main>
          {error && <p className="mb-4 text-red-600">{error}</p>}

          <ul className="space-y-3">
            {companies.map((c) => (
              <li key={c._id}>
                <Link
                  href={`/data/${c.industrySlug}/${c.citySlug}/${c.slug}`}
                  className="flex gap-4 bg-white border rounded-xl p-4 hover:shadow-md hover:border-[#E11D2E]/40 transition"
                >
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt={`${c.name} logo`} className="w-14 h-14 rounded-lg object-contain bg-gray-50 border shrink-0" loading="lazy" />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-500 shrink-0">
                      {c.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h2 className="font-semibold text-[#0F1B3D] text-lg">{c.name}</h2>
                      {c.industry && <span className="text-xs bg-red-50 text-red-700 rounded-full px-2.5 py-0.5">{c.industry}</span>}
                    </div>
                    {c.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.description}</p>}
                    <p className="text-xs text-gray-500 mt-2 flex flex-wrap gap-x-4">
                      {(c.city || c.country) && <span>📍 {[c.city, c.country].filter(Boolean).join(', ')}</span>}
                      {c.employees ? <span>👥 {c.employees.toLocaleString()} employees</span> : null}
                      {c.foundedYear ? <span>Founded {c.foundedYear}</span> : null}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {!loading && !companies.length && !error && <p className="mt-8 text-gray-500">No companies match your filters.</p>}
          {loading && <p className="mt-8 text-gray-500">Loading…</p>}

          {cursor && !loading && (
            <div className="mt-8 text-center">
              <button disabled={loading} onClick={() => load(applied, cursor)} className="border border-[#E11D2E] text-[#E11D2E] px-6 py-2 rounded-lg font-semibold hover:bg-red-50">
                Load more
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
