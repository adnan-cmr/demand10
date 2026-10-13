// backend/src/features/auth/authRoutes.js
import express from 'express';
import {
  register,
  verifyEmail,
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword,
} from './authController.js';
import { authenticate } from '../../middleware/auth.js';
import { authLimiter } from '../../middleware/rateLimit.js';

const router = express.Router();

router.post('/auth/register', authLimiter, register);
router.get('/auth/verify-email', verifyEmail);
router.post('/auth/login', authLimiter, login);
router.post('/auth/refresh', refresh);
router.post('/auth/logout', authenticate, logout);
router.get('/auth/me', authenticate, me);
router.post('/auth/forgot-password', authLimiter, forgotPassword);
router.post('/auth/reset-password', authLimiter, resetPassword);

export default router;