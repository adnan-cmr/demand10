// frontend/src/services/apiClient.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Safely parse a fetch response as JSON.
 * Returns null on non-JSON or error responses instead of throwing.
 * Prevents "<html> is not valid JSON" crashes when backend returns 502/504.
 */
export async function safeJson(res) {
  try {
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      const preview = (await res.text()).slice(0, 120);
      console.error(`Non-JSON response [${res.status}]:`, preview);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('safeJson parse error:', err.message);
    return null;
  }
}

/**
 * fetch + safe parse + credentials. Never throws.
 */
export async function request(path, options = {}) {
  try {
    let res = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      ...options,
    });

    if (res.status === 401) {
      const body = await res.clone().json().catch(() => ({}));
      if (body.code === 'TOKEN_EXPIRED') {
        const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (refreshRes.ok) {
          res = await fetch(`${API_BASE}${path}`, {
            credentials: 'include',
            ...options,
          });
        }
      }
    }

    const data = await safeJson(res);
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        message: data?.message || `HTTP ${res.status}`,
      };
    }
    return data || { ok: true };
  } catch (err) {
    console.error(`request(${path}) failed:`, err.message);
    return { ok: false, message: 'Network error' };
  }
}