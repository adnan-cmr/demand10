// backend/src/utils/cookies.js
import { env } from '../config/env.js';

const SAME_SITE = ['strict', 'lax', 'none'].includes(env.COOKIE_SAMESITE)
  ? env.COOKIE_SAMESITE
  : env.isProd ? 'strict' : 'lax';

export const cookieConfig = { sameSite: SAME_SITE, secure: env.isProd || SAME_SITE === 'none' };

const BASE = {
  httpOnly: true,
  secure: cookieConfig.secure,
  sameSite: SAME_SITE,
  path: '/',
  ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
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