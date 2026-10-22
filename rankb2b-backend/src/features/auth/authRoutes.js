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
import { validate } from '../../middleware/validate.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../../validation/authSchemas.js';

const router = express.Router();

router.post('/auth/register', authLimiter, validate(registerSchema), register);
router.get('/auth/verify-email', verifyEmail);
router.post('/auth/login', authLimiter, validate(loginSchema), login);
router.post('/auth/refresh', refresh);
router.post('/auth/logout', authenticate, logout);
router.get('/auth/me', authenticate, me);
router.post('/auth/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/auth/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword);

export default router;