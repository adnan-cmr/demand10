// frontend/src/services/userApi.js
import { safeJson } from './apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const createErrorResponse = (message, status = null) => ({
  ok: false,
  message,
  status,
});

// ================================================================
//  HARDENED endpoints
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

// ================================================================
//  Auth
// ================================================================

export const userSignup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Signup error:", error);
    return createErrorResponse("Network error during signup");
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${encodeURIComponent(token)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Email verification error:", error);
    return createErrorResponse("Network error during email verification");
  }
};

export const userLogin = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    if (data.ok && typeof window !== 'undefined') {
      window.localStorage.setItem('demand10.user', JSON.stringify(data.user));
    }
    if (response.status === 403) {
      return {
        ok: false,
        message: data.message || "Your account has been blocked. Please contact the support team.",
      };
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return createErrorResponse("Network error during login");
  }
};

export const userLogout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('demand10.user');
    }
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    return createErrorResponse("Network error during logout");
  }
};

export const checkUserAuth = async (retryCount = 0) => {
  try {
    if (retryCount === 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      if (response.status >= 500 && retryCount < 3) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (retryCount + 1)));
        return checkUserAuth(retryCount + 1);
      }
      if (response.status === 401) {
        return createErrorResponse("Not authenticated", 401);
      }
      return createErrorResponse(`HTTP error! status: ${response.status}`, response.status);
    }
    return await response.json();
  } catch (error) {
    console.error("Authentication check error:", error);
    if (retryCount < 3) {
      await new Promise((resolve) => setTimeout(resolve, 500 * (retryCount + 1)));
      return checkUserAuth(retryCount + 1);
    }
    return createErrorResponse("Authentication check failed");
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (error) {
    console.error("Forgot password error:", error);
    return createErrorResponse("Network error during forgot password request");
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    return await response.json();
  } catch (error) {
    console.error("Reset password error:", error);
    return createErrorResponse("Network error during password reset");
  }
};

// ================================================================
//  Claims
// ================================================================

export const submitCompanyClaim = async (claimData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/claim/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(claimData),
    });
    return await response.json();
  } catch (error) {
    console.error("Company claim submission error:", error);
    return createErrorResponse("Network error during claim submission");
  }
};

export const getUserClaims = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/claims/user`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Get user claims error:", error);
    return createErrorResponse("Network error during claims fetch");
  }
};

export const getUserReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user-reviews`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Get user reviews error:", error);
    return createErrorResponse("Network error during reviews fetch");
  }
};

export const getVendorCompanyReviews = async (page = 1, limit = 10, companyId = null) => {
  try {
    let url = `${API_BASE_URL}/vendor-company-reviews?page=${page}&limit=${limit}`;
    if (companyId) url += `&companyId=${companyId}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Get vendor company reviews error:", error);
    return createErrorResponse("Network error during vendor reviews fetch");
  }
};

export const checkEditAccess = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/claim/access-by-slug/${slug}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Check edit access error:", error);
    return createErrorResponse("Network error during access check");
  }
};

// ================================================================
//  Companies
// ================================================================

export const getCompanyById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/company/${id}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Get company by ID error:", error);
    return createErrorResponse("Network error during company fetch");
  }
};

export const getCompanyBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/companybyslug/${slug}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Get company by slug error:", error);
    return createErrorResponse("Network error during company fetch by slug");
  }
};

export const updateCompanyData = async (slug, companyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/updateCompanyTeamBySlug/${slug}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(companyData),
    });
    return await response.json();
  } catch (error) {
    console.error("Update company data error:", error);
    return createErrorResponse("Network error during company update");
  }
};

export const updateCompanyWithImage = async (slug, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/updateCompanyTeamBySlug/${slug}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Update company with image error:", error);
    return createErrorResponse("Network error during company update with image");
  }
};

// ================================================================
//  Listing
// ================================================================

export const getCategoriesWithSubcategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/listing/categories-with-subcategories`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Get categories error:", error);
    return createErrorResponse("Network error during categories fetch");
  }
};

export const submitCompanyListing = async (listingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/listing/submit`, {
      method: "POST",
      credentials: "include",
      body: listingData,
    });
    return await response.json();
  } catch (error) {
    console.error("Submit company listing error:", error);
    return createErrorResponse("Network error during company listing submission");
  }
};

export const searchCompanies = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/review-search-companies?query=${encodeURIComponent(query)}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Search companies error:", error);
    return createErrorResponse("Network error during company search");
  }
};

export const submitReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    return await response.json();
  } catch (error) {
    console.error("Submit review error:", error);
    return createErrorResponse("Network error during review submission");
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