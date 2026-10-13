import { authenticate, requireAdmin } from './auth.js';

export const adminAuthMiddleware = (req, res, next) =>
  authenticate(req, res, (error) => {
    if (error) return next(error);
    return requireAdmin(req, res, next);
  });