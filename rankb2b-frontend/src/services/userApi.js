// Auth client: the single place for sign-in, sign-out and session checks.
import { request } from './apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const createErrorResponse = (message, status = null) => ({ ok: false, message, status });

const postJson = async (path, body, errorMessage) => {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return { response, data: await response.json() };
  } catch (error) {
    console.error(`${path} error:`, error);
    return { error: createErrorResponse(errorMessage) };
  }
};

export const userSignup = async (userData) => {
  const { data, error } = await postJson('/auth/register', userData, 'Network error during signup');
  return error || data;
};

export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${encodeURIComponent(token)}`);
    return await response.json();
  } catch (error) {
    console.error('Email verification error:', error);
    return createErrorResponse('Network error during email verification');
  }
};

export const userLogin = async (loginData) => {
  const { response, data, error } = await postJson('/auth/login', loginData, 'Network error during login');
  if (error) return error;
  if (data.ok && typeof window !== 'undefined') {
    window.localStorage.setItem('demand10.user', JSON.stringify(data.user));
  }
  if (response.status === 403) {
    return { ok: false, message: data.message || 'Your account has been blocked. Please contact the support team.' };
  }
  return data;
};

export const userLogout = async () => {
  const { data, error } = await postJson('/auth/logout', {}, 'Network error during logout');
  if (typeof window !== 'undefined') window.localStorage.removeItem('demand10.user');
  return error || data;
};

export const forgotPassword = async (email) => {
  const { data, error } = await postJson('/auth/forgot-password', { email }, 'Network error during forgot password request');
  return error || data;
};

export const resetPassword = async (token, newPassword) => {
  const { data, error } = await postJson('/auth/reset-password', { token, newPassword }, 'Network error during password reset');
  return error || data;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Session check used by the navbar and the admin dashboard.
 * Returns { ok:true, user } when signed in. Otherwise { ok:false, status, unauthenticated }:
 * unauthenticated=true means 401/403 (really signed out); false means a server or network
 * problem, so callers should not treat the user as logged out.
 */
export const checkUserAuth = async (attempts = 3) => {
  let result;
  for (let i = 0; i < attempts; i++) {
    result = await request('/auth/me', { cache: 'no-store' });
    if (result.ok) return result;
    if (!result.serverError && !result.networkError) break;
    if (i < attempts - 1) await sleep(400 * (i + 1));
  }
  return { ...result, unauthenticated: result.status === 401 || result.status === 403 };
};
