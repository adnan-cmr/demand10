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

// One refresh at a time: concurrent requests that hit TOKEN_EXPIRED share this promise,
// so the backend only rotates the refresh token once.
let refreshInFlight = null;

function refreshSession() {
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${API_BASE}/auth/refresh`, { method: 'POST', credentials: 'include' })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

/**
 * fetch + safe parse + credentials. Never throws.
 * Failures: { ok:false, status, message } for HTTP errors (status >= 500 means server error),
 * { ok:false, networkError:true, message } when the server could not be reached.
 */
export async function request(path, options = {}) {
  const send = () => fetch(`${API_BASE}${path}`, { credentials: 'include', ...options });
  try {
    let res = await send();

    if (res.status === 401) {
      const body = await res.clone().json().catch(() => ({}));
      if (body.code === 'TOKEN_EXPIRED' && (await refreshSession())) {
        res = await send();
      }
    }

    const data = await safeJson(res);
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        serverError: res.status >= 500,
        code: data?.code,
        message: data?.message || `HTTP ${res.status}`,
      };
    }
    return data || { ok: true };
  } catch (err) {
    console.error(`request(${path}) failed:`, err.message);
    return { ok: false, networkError: true, message: 'Network error. Check your connection.' };
  }
}
