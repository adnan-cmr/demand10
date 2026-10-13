// backend/src/features/auth/adminUserRoutes.js
import express from 'express';
import { updateUserRole, listUsers } from './adminUserController.js';
import { authenticate, requireAdmin, requireSuperAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/admin/users', authenticate, requireAdmin, listUsers);
router.put('/admin/users/:userId/role', authenticate, requireSuperAdmin, updateUserRole);

export default router;