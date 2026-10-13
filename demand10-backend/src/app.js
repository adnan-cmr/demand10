// backend/src/app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import { env } from './config/env.js';
import { generalLimiter } from './middleware/rateLimit.js';
import { isDbConnected } from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// ── Route groups ─────────────────────────────────────────
import authRoutes         from './features/auth/routes.js';
import usersRoutes        from './features/users/routes.js';
import claimsRoutes       from './features/claims/routes.js';
import listingsRoutes     from './features/listings/routes.js';
import reviewsRoutes      from './features/reviews/routes.js';
import badgesRoutes       from './features/badges/routes.js';
import categoriesRoutes   from './features/categories/routes.js';
import companiesRoutes    from './features/companies/routes.js';
import blogRoutes         from './features/blog/routes.js';
import requestsRoutes     from './features/requests/routes.js';
import cacheRoutes        from './features/cache/routes.js';

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

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, origin);
      if (!env.isProd) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type', 'Authorization', 'X-Requested-With',
      'Accept', 'Origin', 'Cookie',
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400,
    optionsSuccessStatus: 200,
  })
);
app.options(/.*/, cors());

// ── Security / parsing ──────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,   // tighten in Phase 4
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
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    db: isDbConnected() ? 'up' : 'down',
    uptime: process.uptime(),
  });
});

app.get('/', (req, res) => res.json({ message: 'Server is running' }));

// ── Rate limits ─────────────────────────────────────────
app.use(generalLimiter);

// ── Routes ──────────────────────────────────────────────
const v1 = express.Router();
v1.use(authRoutes);
v1.use(usersRoutes);
v1.use(claimsRoutes);
v1.use(listingsRoutes);
v1.use(reviewsRoutes);
v1.use(badgesRoutes);
v1.use(categoriesRoutes);
v1.use(companiesRoutes);
v1.use(blogRoutes);
v1.use(requestsRoutes);
v1.use(cacheRoutes);

app.use('/api/v1', v1);

// 404 
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Errors
app.use(errorHandler);

export default app;