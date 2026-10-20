// Public data endpoints (safe on the server and in the browser; no auth).
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const qs = (params) => {
  const sp = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') sp.set(k, v);
  });
  const s = sp.toString();
  return s ? `?${s}` : '';
};

async function publicGet(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const fetchDataCompanies = (params) => publicGet(`/data/companies${qs(params)}`);
export const fetchDataFacets = (country) => publicGet(`/data/facets${qs({ country })}`);
export const fetchDataCompany = (industry, city, slug) =>
  publicGet(`/data/companies/${encodeURIComponent(industry)}/${encodeURIComponent(city)}/${encodeURIComponent(slug)}`);
export const fetchTopLists = () => publicGet('/data/top-lists');
export const fetchTopList = (slug) => publicGet(`/data/top-lists/${encodeURIComponent(slug)}`);

// Admin screens dispatch this after changing top lists so the navbar can refetch.
export const TOP_LISTS_CHANGED = 'toplists:changed';
