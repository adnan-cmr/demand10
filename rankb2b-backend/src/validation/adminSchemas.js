import { z } from 'zod';

export const updateRoleSchema = z.object({
  role: z.enum(['user', 'vendor', 'admin', 'superadmin']),
});
