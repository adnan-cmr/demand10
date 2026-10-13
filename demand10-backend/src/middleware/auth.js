// backend/src/middleware/auth.js
import { verifyAccessToken } from '../utils/tokens.js';

/**
 * Authenticate using the access token cookie.
 * Attaches req.user = { userId, role }.
 */
export function authenticate(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) {
    return res.status(401).json({
      ok: false,
      code: 'NO_TOKEN',
      message: 'Not authenticated',
    });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { userId: payload.sub, role: payload.role };
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        ok: false,
        code: 'TOKEN_EXPIRED',
        message: 'Access token expired',
      });
    }
    return res.status(401).json({
      ok: false,
      code: 'INVALID_TOKEN',
      message: 'Invalid token',
    });
  }
}

/**
 * Optional auth — attaches req.user if token valid, but does not block.
 */
export function optionalAuth(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) return next();
  try {
    const payload = verifyAccessToken(token);
    req.user = { userId: payload.sub, role: payload.role };
  } catch {
    // ignore
  }
  next();
}

/**
 * Require one of the given roles.
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: 'Not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        ok: false,
        message: 'Insufficient permissions',
      });
    }
    next();
  };
}

export const requireAdmin = requireRole('admin', 'superadmin');
export const requireSuperAdmin = requireRole('superadmin');
export const requireVendorOrAdmin = requireRole('vendor', 'admin', 'superadmin');