// backend/src/middleware/errorHandler.js
import { env } from '../config/env.js';
import logger from '../utils/logger.js';

export default function errorHandler(err, req, res, next) {
  logger.error({ err, requestId: req.id }, 'Unhandled request error');
  if (res.headersSent) return next(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    ok: false,
    message: Array.isArray(err.publicMessage) ? 'Request validation failed' : (err.publicMessage || 'Server error'),
    details: Array.isArray(err.publicMessage) ? err.publicMessage : undefined,
    error: env.isProd ? undefined : err.message,
  });
}