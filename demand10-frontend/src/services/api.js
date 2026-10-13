// frontend/src/services/api.js
import { safeJson } from './apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const createErrorResponse = (message, status = null) => ({
  ok: false,
  message,
  status,
});

// ================================================================
//  HARDENED endpoints (Phase 1 security)
// ================================================================

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`fetchCategories: HTTP ${res.status}`);
      return [];
    }
    const data = await safeJson(res);
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error.message);
    return [];
  }
}

export const fetchHomepageCompanies = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/homepage-companies`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`fetchHomepageCompanies: HTTP ${res.status}`);
      return [];
    }
    const data = await safeJson(res);
    return data?.companies || [];
  } catch (error) {
    console.error('Failed to fetch homepage companies:', error.message);
    return [];
  }
};

// ================================================================
//  Everything below is unchanged from your existing api.js
//  (copy your current content here verbatim)
// ================================================================

export const fetchRelatedSubcategories = async (subcategorySlug, limit = 5) => {
  try {
    const res = await fetch(`${API_BASE_URL}/related-subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subcategorySlug, limit }),
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.subcategories || [];
  } catch (error) {
    console.error("Error fetching related subcategories:", error);
    return [];
  }
};

export const fetchBlogsSitemap = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-sitemapblog`);
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Fetch blogs sitemap error:", error);
    return [];
  }
};

export const fetchBlogs = async (page = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get?page=${page}`);
    if (!response.ok) {
      return { data: [], pagination: { total: 0, page: 1, totalPages: 0 } };
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch blogs error:", error);
    return { data: [], pagination: { total: 0, page: 1, totalPages: 0 } };
  }
};

export const fetchLatestBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/latest-posts`);
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Fetch latest blogs error:", error);
    return [];
  }
};

export const fetchSingelBlogs = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getById/${slug}`);
    const result = await response.json();
    if (!response.ok) {
      return createErrorResponse(result.message || "Failed to fetch blog", response.status);
    }
    return result;
  } catch (error) {
    console.error("Fetch single blog error:", error);
    return createErrorResponse("Failed to fetch blog");
  }
};

export const DataSetRequest = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response;
  } catch (error) {
    console.error("Data set request error:", error);
    throw error;
  }
};

export async function fetchCompanyDetail(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/companybyslug/${slug}`);
    if (!res.ok) return { ok: false, data: null };
    return await res.json();
  } catch (error) {
    console.error("Fetch company detail error:", error);
    return { ok: false, data: null };
  }
}

export async function fetchCompanyBySubcategoryAndSlug(subcategorySlug, companySlug) {
  try {
    const res = await fetch(`${API_BASE_URL}/companybyslug/${companySlug}`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`❌ API Error: ${res.status} - Failed to fetch company by slug`);
      return null;
    }
    const data = await res.json();
    if (data?.data) {
      data.data = {
        ...data.data,
        companyName: data.data.companyName || 'Unknown Company',
        description: data.data.description || '',
        foundedYear: data.data.foundedYear || null,
        employees: data.data.employees || 0,
        industries: Array.isArray(data.data.industries) ? data.data.industries : [],
        teamLeads: Array.isArray(data.data.teamLeads) ? data.data.teamLeads : [],
        companyCountry: data.data.companyCountry || '',
        image: data.data.image || '',
        website: data.data.website || '#',
      };
    }
    return data;
  } catch (error) {
    console.error("Error fetching company by slug:", error);
    return null;
  }
}

export const fetchRelatedCompanies = async (subcategoryId, excludeSlug) => {
  try {
    const res = await fetch(`${API_BASE_URL}/related-companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subcategory: subcategoryId, excludeSlug }),
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.companies || [];
  } catch (error) {
    console.error("Error fetching related companies:", error);
    return [];
  }
};

export async function fetchSubcategoriesByCategorySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/categorybyslug/${slug}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.subcategories || [];
  } catch (error) {
    console.error("Failed to fetch subcategories by category slug", error);
    return [];
  }
}

export async function fetchCompaniesForSitemap(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/sitemap-subcategory/${slug}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return { companies: [] };
    const data = await res.json();
    return {
      companies: data?.companies?.map(c => ({
        slug: c.slug,
        updatedAt: c.updatedAt || c.createdAt || null,
      })) || [],
    };
  } catch (error) {
    console.error("⚠️ Error fetching companies for sitemap:", error);
    return { companies: [] };
  }
}

export async function fetchCompanies(slug, page = 1, limit = 12, search = "", sponsoredOnly = false) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search && search.trim() !== "") params.append('search', search.trim());
    if (sponsoredOnly) params.append('sponsoredOnly', 'true');

    const res = await fetch(
      `${API_BASE_URL}/subcategories/companies/${slug}?${params.toString()}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' }, cache: 'no-store' }
    );

    if (!res.ok) {
      return {
        companies: [],
        pagination: { total: 0, page: 1, limit: 12, totalPages: 0, searchTerm: "" },
        name: '', description: '', categoryName: '',
      };
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching companies:", error);
    return {
      companies: [],
      pagination: { total: 0, page: 1, limit: 12, totalPages: 0, searchTerm: "" },
      name: '', description: '', categoryName: '',
    };
  }
}

export async function fetchSubcategoryDetails(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/detail/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error fetching subcategory details:", err);
    return null;
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error('Login failed:', error);
    return createErrorResponse("Network error during login");
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error('Signup failed:', error);
    return createErrorResponse("Network error during signup");
  }
};

export const getCompanyReviews = async (slug, page = 1, limit = 10) => {
  if (!slug || typeof slug !== 'string') {
    return { ok: false, message: "Invalid company slug" };
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/company-by-slug/${slug}/reviews?page=${page}&limit=${limit}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching company reviews:", error);
    return { ok: false, message: "Failed to fetch company reviews" };
  }
};

export const getCompanyReviewsById = async (companyId, page = 1, limit = 10) => {
  if (!companyId || typeof companyId !== 'string' || companyId === 'search' || companyId.length !== 24) {
    return { ok: false, message: "Invalid company ID format" };
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/company/${companyId}/reviews?page=${page}&limit=${limit}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching company reviews by ID:", error);
    return { ok: false, message: "Failed to fetch company reviews" };
  }
};

export const getCompanyBadgesForFrontend = async (companyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/badges/public/${companyId}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return { status: response.status, data: null, error: errorData.message };
    }
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error("Error fetching company badges:", error);
    return { status: 500, data: null, error: "Failed to fetch company badges" };
  }
};

export const updateCompanySponsorship = async (companyId, sponsor) => {
  try {
    const response = await fetch(`${API_BASE_URL}/company/${companyId}/sponsor`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sponsor }),
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error("Update company sponsorship error:", error);
    return { status: 500, data: null, error: "Failed to update company sponsorship" };
  }
};

export const searchHeroCompanies = async (query) => {
  try {
    if (!query || query.trim() === '') return { ok: true, data: [] };
    const response = await fetch(
      `${API_BASE_URL}/hero-search?company_name=${encodeURIComponent(query.trim())}`
    );
    return await response.json();
  } catch (error) {
    console.error("Hero search error:", error);
    return { ok: false, message: "Failed to search companies", data: [] };
  }
};

export const fetchSponsoredCompanies = async () => {
  try {
    return await fetchHomepageCompanies();
  } catch (error) {
    console.error("Error fetching homepage companies:", error);
    return [];
  }
};