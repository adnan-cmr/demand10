// backend/src/utils/cookies.js
import { env } from '../config/env.js';

const BASE = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: env.isProd ? 'none' : 'lax',
  path: '/',
};

const ACCESS_MAX_AGE = 15 * 60 * 1000;             // 15 min
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000;   // 7 days

export function setAuthCookies(res, accessToken, refreshToken) {
  res.cookie('accessToken', accessToken, { ...BASE, maxAge: ACCESS_MAX_AGE });
  res.cookie('refreshToken', refreshToken, { ...BASE, maxAge: REFRESH_MAX_AGE });
}

export function clearAuthCookies(res) {
  res.clearCookie('accessToken', BASE);
  res.clearCookie('refreshToken', BASE);
}