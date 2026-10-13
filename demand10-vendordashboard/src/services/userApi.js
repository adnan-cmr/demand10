import { safeJson } from './apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const createErrorResponse = (message, status = null) => ({
  ok: false,
  message,
  status,
});

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



// User authentication API functions
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    return createErrorResponse("Network error during login");
  }
};
// User Authentication APIs
export const userSignup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    return createErrorResponse("Network error during signup");
  }
};

// Verify email
export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/verify-email?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Email verification error:", error);
    return createErrorResponse("Network error during email verification");
  }
};

export const userLogin = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    
    // Special handling for blocked users (403 status)
    if (response.status === 403) {
      return {
        ok: false,
        message: data.message || "Your account has been blocked. Please contact the support team."
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
    const response = await fetch(`${API_BASE_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    return createErrorResponse("Network error during logout");
  }
};

export const checkUserAuth = async (retryCount = 0) => {
  try {
    // Add a small delay to ensure cookies are properly set
    if (retryCount === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Retry up to 3 times for 500 errors
      if (response.status >= 500 && retryCount < 3) {
        await new Promise(resolve => setTimeout(resolve, 500 * (retryCount + 1)));
        return checkUserAuth(retryCount + 1);
      }
      
      // For 401 errors (unauthorized), return a specific response
      if (response.status === 401) {
        return createErrorResponse("Not authenticated", 401);
      }
      
      return createErrorResponse(`HTTP error! status: ${response.status}`, response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Authentication check error:", error);
    
    // Retry up to 3 times for network errors
    if (retryCount < 3) {
      await new Promise(resolve => setTimeout(resolve, 500 * (retryCount + 1)));
      return checkUserAuth(retryCount + 1);
    }
    
    return createErrorResponse("Authentication check failed");
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Forgot password error:", error);
    return createErrorResponse("Network error during forgot password request");
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Reset password error:", error);
    return createErrorResponse("Network error during password reset");
  }
};

// Company Claim APIs
export const submitCompanyClaim = async (claimData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/claim/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(claimData),
    });

    const data = await response.json();
    return data;
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
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get user claims error:", error);
    return createErrorResponse("Network error during claims fetch");
  }
};

// User Reviews API
export const getUserReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user-reviews`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get user reviews error:", error);
    return createErrorResponse("Network error during reviews fetch");
  }
};

// Vendor Company Reviews API - Get reviews for companies the vendor can edit
export const getVendorCompanyReviews = async (page = 1, limit = 10, companyId = null) => {
  try {
    let url = `${API_BASE_URL}/vendor-company-reviews?page=${page}&limit=${limit}`;
    if (companyId) {
      url += `&companyId=${companyId}`;
    }
    
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get vendor company reviews error:", error);
    return createErrorResponse("Network error during vendor reviews fetch");
  }
};

// Updated to use slug instead of companyId
export const checkEditAccess = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/claim/access-by-slug/${slug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Check edit access error:", error);
    return createErrorResponse("Network error during access check");
  }
};

// Get company data by ID
export const getCompanyById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/company/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get company by ID error:", error);
    return createErrorResponse("Network error during company fetch");
  }
};

// Get company data by slug
export const getCompanyBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/companybyslug/${slug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get company by slug error:", error);
    return createErrorResponse("Network error during company fetch by slug");
  }
};

// Update company data with JSON
export const updateCompanyData = async (slug, companyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/updateCompanyTeamBySlug/${slug}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Update company data error:", error);
    return createErrorResponse("Network error during company update");
  }
};

// Update company data with image upload (FormData)
export const updateCompanyWithImage = async (slug, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/updateCompanyTeamBySlug/${slug}`, {
      method: "PUT",
      credentials: "include",
      // Don't set Content-Type header - let browser set it with boundary
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Update company with image error:", error);
    return createErrorResponse("Network error during company update with image");
  }
};

// Get categories with subcategories
export const getCategoriesWithSubcategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/listing/categories-with-subcategories`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get categories error:", error);
    return createErrorResponse("Network error during categories fetch");
  }
};

// Fetch categories function (added for Navbar)
// export async function fetchCategories() {
//   try {
//     const res = await fetch(`${API_BASE_URL}/categories`, {
//       cache: "no-store",
//     });

//     const data = await res.json();
//     return data?.data || [];
//   } catch (error) {
//     console.error("Failed to fetch categories", error);
//     return [];
//   }
// };

// Submit company listing
export const submitCompanyListing = async (listingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/listing/submit`, {
      method: "POST",
      credentials: "include",
      body: listingData, // listingData is already FormData
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Submit company listing error:", error);
    return createErrorResponse("Network error during company listing submission");
  }
};

// Search companies
export const searchCompanies = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search-companies?query=${query}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Search companies error:", error);
    return createErrorResponse("Network error during company search");
  }
};

// Submit review
export const submitReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Submit review error:", error);
    return createErrorResponse("Network error during review submission");
  }
};

// Badge API functions
export const getCompanyBadgesForFrontend = async (companyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/badges/public/${companyId}`, {
      method: "GET",
      credentials: "include", // Include cookies for authentication
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch company badges:", errorData.message);
      return { status: response.status, data: null, error: errorData.message };
    }

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error("Error fetching company badges:", error);
    return { status: 500, data: null, error: "Failed to fetch company badges" };
  }
};