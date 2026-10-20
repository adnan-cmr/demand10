// backend/src/config/env.js
import dotenv from 'dotenv';
dotenv.config();

const isProduction = (process.env.NODE_ENV || 'development') === 'production';
// SMTP is only mandatory in production; locally emails are logged instead of sent.
const required = [
  'MONGO_URI',
  'JWT_SECRET',
  ...(isProduction ? ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_APP_PASSWORD'] : []),
];

const missing = required.filter((k) => !process.env[k]);

if (missing.length > 0) {
  console.error('❌ Missing required env vars:', missing.join(', '));
  console.error('   Check your .env file (see .env.example).');
  process.exit(1);
}

if (process.env.JWT_SECRET.length < 32) {
  console.error('❌ JWT_SECRET must be at least 32 characters.');
  process.exit(1);
}

export const env = {
  PORT: Number(process.env.PORT) || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
    admin: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
  },
  CLOUDINARY: {
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3001',
  COOKIE_SAMESITE: (process.env.COOKIE_SAMESITE || '').toLowerCase(),
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || undefined,
  isProd: (process.env.NODE_ENV || 'development') === 'production',
};