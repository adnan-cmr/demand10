import express from 'express';
const router = express.Router();
import { getAllUsers, deleteUser, blockUser, activateUser } from '../controller/userController.js';
import { register, verifyEmail, login, logout, me, forgotPassword, resetPassword } from '../features/auth/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';

// User signup
router.post('/user/signup', register);

// Verify email
router.get('/user/verify-email', verifyEmail);

// User login
router.post('/user/login', login);

// User logout
router.post('/user/logout', authMiddleware, logout);

// Get current authenticated user
router.get('/user', authMiddleware, me);

// Forgot password
router.post('/user/forgot-password', forgotPassword);

// Reset password
router.post('/user/reset-password', resetPassword);

// Get all users (admin only)
router.get('/users', adminAuthMiddleware, getAllUsers);

// Delete user by ID (admin only)
router.delete('/user/:userId', adminAuthMiddleware, deleteUser);

// Block user by ID (admin only)
router.put('/user/:userId/block', adminAuthMiddleware, blockUser);

// Activate user by ID (admin only)
router.put('/user/:userId/activate', adminAuthMiddleware, activateUser);

export default router;