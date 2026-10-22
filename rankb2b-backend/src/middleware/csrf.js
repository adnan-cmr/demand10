import { isAllowedOrigin } from '../config/origins.js';

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);

// Cookie auth is vulnerable to cross-site writes, so state-changing requests that
// carry an Origin (or Referer) must come from a trusted site. Requests with neither
// header (curl, server-to-server), and requests with an opaque "null" origin (mobile
// webviews, Electron, file://) cannot be a browser CSRF and are let through.
export default function originGuard(req, res, next) {
  if (SAFE.has(req.method)) return next();

  let origin = req.headers.origin;

  // Opaque origins cannot forge cookies cross-site; pass through.
  if (origin === 'null' || origin === 'undefined') return next();

  if (!origin && req.headers.referer) {
    try {
      origin = new URL(req.headers.referer).origin;
    } catch {
      // Malformed Referer — treat as no origin (browser quirk, not CSRF).
      return next();
    }
    // Referer may itself be the literal string "null" from a sandboxed context.
    if (origin === 'null' || origin === 'undefined') return next();
  }

  if (!origin) return next();
  if (isAllowedOrigin(origin)) return next();
  return res
    .status(403)
    .json({ ok: false, code: 'BAD_ORIGIN', message: 'Cross-site request blocked' });
}