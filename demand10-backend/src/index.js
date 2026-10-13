// backend/index.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';

import { env } from './config/env.js';
import connectDB, { isDbConnected } from './config/db.js';
import { connectRedis } from './config/redisClient.js';
import { authLimiter, generalLimiter } from './middleware/rateLimit.js';

// ── Auth (new) ─────────────────────────────────────────
import authRoutes from './features/auth/authRoutes.js';
import adminUserRoutes from './features/auth/adminUserRoutes.js';

// ── Other feature routers (still under ./Router during transition) ──
import userRoutes           from './Router/UserRoutes.js';
import companyClaimRoutes   from './Router/CompanyClaimRoutes.js';
import PostRoute            from './Router/PostRoutes.js';
import RequestRoute         from './Router/RequestRoute.js';
import CategoryRoute        from './Router/CategoryRoute.js';
import CompanyTeamUpload    from './Router/CompanyTeamRoute.js';
import cacheRoutes          from './Router/ClearCache.js';
import companyListingRoutes from './Router/CompanyListingRoutes.js';
import reviewRoutes         from './Router/ReviewRoutes.js';
import badgeRoutes          from './Router/BadgeRoutes.js';
import heroSearchRoutes     from './Router/HeroSearchRoutes.js';

const app = express();
app.set('trust proxy', 1);

// ── CORS ────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3006',
  'http://localhost:5173',
  'https://admin.demand10.com',
  'https://demand10.com',
  'https://www.demand10.com',
  'https://api.demand10.com',
  'https://vendor.demand10.com',
];

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, origin);
    if (!env.isProd) return cb(null, true);
    return cb(null, false);
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
  contentSecurityPolicy: false,
}));
app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// ── Static ──────────────────────────────────────────────
app.use('/badges', express.static(path.join(process.cwd(), 'public', 'badges'), { maxAge: '7d' }));
app.use('/sponsor-badges', express.static(path.join(process.cwd(), 'public', 'sponsor-badges'), { maxAge: '7d' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), { maxAge: '7d' }));

// ── Health ──────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ ok: true, db: isDbConnected() ? 'up' : 'down' }));
app.get('/', (req, res) => res.json({ message: 'Server is running' }));

// ── Rate limits ─────────────────────────────────────────
app.use(generalLimiter);

// ── Routes ──────────────────────────────────────────────
// Auth (new, feature-based)
app.use('/api/v1', authRoutes);        // /auth/*       endpoints
app.use('/api/v1', adminUserRoutes);   // /admin/users  endpoints

// Everything else (still legacy routing during Phase 2)
app.use('/api/v1', userRoutes);
app.use('/api/v1', companyClaimRoutes);
app.use('/api/v1', companyListingRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1', badgeRoutes);
app.use('/api/v1', heroSearchRoutes);
app.use('/api/v1', PostRoute);
app.use('/api/v1', RequestRoute);
app.use('/api/v1', CategoryRoute);
app.use('/api/v1', CompanyTeamUpload);
app.use('/api/v1', cacheRoutes);

// ── 404 ─────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ ok: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ── Errors ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  const origin = req.headers.origin;
  if (origin && (allowedOrigins.includes(origin) || !env.isProd)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (res.headersSent) return next(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    ok: false,
    message: 'Server error',
    error: env.isProd ? 'Internal server error' : err.message,
  });
});

// ── Boot ────────────────────────────────────────────────
(async () => {
  await connectDB();
  const PORT = env.PORT;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  connectRedis().catch((e) =>
    console.error('⚠️ Redis connection failed, running without cache:', e.message)
  );
})();

export default app;