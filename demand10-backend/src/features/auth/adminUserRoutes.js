// backend/src/features/auth/adminUserRoutes.js
import express from 'express';
import { updateUserRole, listUsers, deleteUser, blockUser, activateUser } from './adminUserController.js';
import { authenticate, requireAdmin, requireSuperAdmin } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { updateRoleSchema } from '../../validation/adminSchemas.js';

const router = express.Router();

router.get('/admin/users', authenticate, requireAdmin, listUsers);
router.put('/admin/users/:userId/role', authenticate, requireSuperAdmin, validate(updateRoleSchema), updateUserRole);

router.delete('/admin/users/:userId', authenticate, requireAdmin, deleteUser);
router.put('/admin/users/:userId/block', authenticate, requireAdmin, blockUser);
router.put('/admin/users/:userId/activate', authenticate, requireAdmin, activateUser);

export default router;