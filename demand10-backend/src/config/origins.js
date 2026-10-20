import { env } from './env.js';

export const allowedOrigins = [
  // Development
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3006',
  'http://localhost:5173',
  // Production
  'https://rankb2b.com',
  'https://www.rankb2b.com',
  'https://api.rankb2b.com',
  'https://admin.rankb2b.com',
  'https://vendor.rankb2b.com',
  // Optional: keep the old domain alive during cutover
  // 'https://demand10.com',
  // 'https://www.demand10.com',
  // 'https://api.demand10.com',
  ...(env.FRONTEND_URL ? [env.FRONTEND_URL.replace(/\/+$/, '')] : []),
  ...String(process.env.EXTRA_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
];

// Outside production, local and private-network hosts (LAN testing) are trusted too.
const DEV_HOST = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\]|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/;

export function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (allowedOrigins.includes(origin)) return true;
  return !env.isProd && DEV_HOST.test(origin);
}
