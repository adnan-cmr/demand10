import express from 'express';
const router = express.Router();
import { register, verifyEmail, login, logout, me, forgotPassword, resetPassword } from '../features/auth/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimit.js';

// User signup
router.post('/user/signup', authLimiter, register);

// Verify email
router.get('/user/verify-email', authLimiter, verifyEmail);

// User login
router.post('/user/login', authLimiter, login);

// User logout
router.post('/user/logout', authMiddleware, logout);

// Get current authenticated user
router.get('/user', authMiddleware, me);

// Forgot password
router.post('/user/forgot-password', authLimiter, forgotPassword);

// Reset password
router.post('/user/reset-password', authLimiter, resetPassword);

export default router;