// backend/src/middleware/errorHandler.js
import { env } from '../config/env.js';

export default function errorHandler(err, req, res, next) {
  console.error('[errorHandler]', err);
  if (res.headersSent) return next(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    ok: false,
    message: err.publicMessage || 'Server error',
    error: env.isProd ? undefined : err.message,
  });
}