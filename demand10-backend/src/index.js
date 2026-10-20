// backend/index.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import crypto from 'crypto';
import pinoHttp from 'pino-http';

import { env } from './config/env.js';
import connectDB, { isDbConnected } from './config/db.js';
import { authLimiter, generalLimiter } from './middleware/rateLimit.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './utils/logger.js';
import { isAllowedOrigin } from './config/origins.js';
import originGuard from './middleware/csrf.js';
import { cookieConfig } from './utils/cookies.js';

// ── Auth (new) ─────────────────────────────────────────
import authRoutes from './features/auth/authRoutes.js';
import adminUserRoutes from './features/auth/adminUserRoutes.js';

// ── Other feature routers (still under ./Router during transition) ──
import userRoutes           from './Router/UserRoutes.js';
import dataRoutes           from './Router/DataRoutes.js';

const app = express();
app.set('trust proxy', 1);
app.use(pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id'] || crypto.randomUUID(),
}));
app.use((req, res, next) => {
  res.setHeader('x-request-id', req.id);
  next();
});

// ── CORS ────────────────────────────────────────────────
app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    return cb(null, isAllowedOrigin(origin) ? origin : false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400,
  optionsSuccessStatus: 200,
}));
app.options(/.*/, cors());

// ── Security ────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com', 'https://api.rankb2b.com'],
      connectSrc: [
         "'self'",
        'https://api.rankb2b.com',
        'https://rankb2b.com',
        'https://www.rankb2b.com',
],
      frameAncestors: ["'none'"],
    },
  },
}));
app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// ── Static ──────────────────────────────────────────────

// ── Health ──────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ ok: true, db: isDbConnected() ? 'up' : 'down' }));
app.get('/', (req, res) => res.json({ message: 'Server is running' }));

// ── Rate limits ─────────────────────────────────────────
app.use(generalLimiter);
app.use('/api/v1', originGuard);

// ── Routes ──────────────────────────────────────────────
// Auth (new, feature-based)
app.use('/api/v1', authRoutes);        // /auth/*       endpoints
app.use('/api/v1', adminUserRoutes);   // /admin/users  endpoints

// Everything else (still legacy routing during Phase 2)
app.use('/api/v1', userRoutes);
app.use('/api/v1', dataRoutes);

// ── 404 ─────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ ok: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ── Errors ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (res.headersSent) return next(err);
  return errorHandler(err, req, res, next);
});

// ── Boot ────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  if (env.isProd && !/^https:/i.test(env.FRONTEND_URL)) {
    logger.warn('FRONTEND_URL is not https; secure cookies will be rejected by browsers over plain HTTP');
  }
  if (cookieConfig.sameSite === 'none' && !cookieConfig.secure) {
    logger.warn('SameSite=None requires Secure cookies');
  }
  (async () => {
    await connectDB();
    const PORT = env.PORT;
    app.listen(PORT, () => logger.info({ port: PORT }, 'Server running'));
  })();
}

export default app;