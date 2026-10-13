// backend/src/middleware/legacyAuth.js
/**
 * Accepts BOTH the old adminToken/userToken cookies AND the new accessToken cookie.
 * Verifies with the same JWT_SECRET. Attaches { userId, role, email } to req.user
 * so the old controllers that expected req.user.userId keep working.
 *
 * Delete this file in Phase 2D.
 */
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

function tryVerify(token) {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function adminAuthMiddleware(req, res, next) {
  const token =
    req.cookies?.accessToken ||
    req.cookies?.adminToken;

  if (!token) return res.status(401).json({ ok: false, message: 'please login first' });

  const decoded = tryVerify(token);
  if (!decoded) return res.status(401).json({ ok: false, message: 'Invalid token' });

  req.user = {
    userId: decoded.sub || decoded.userId,
    email: decoded.email,
    role: decoded.role || 'admin',
  };
  next();
}

export function userAuthMiddleware(req, res, next) {
  const token =
    req.cookies?.accessToken ||
    req.cookies?.userToken;

  if (!token) return res.status(401).json({ message: 'Please login first' });

  const decoded = tryVerify(token);
  if (!decoded) return res.status(401).json({ message: 'Invalid token' });

  req.user = {
    userId: decoded.sub || decoded.userId,
    email: decoded.email,
    role: decoded.role || 'user',
  };
  next();
}

// Alias for the old name
export const authMiddleware = userAuthMiddleware;