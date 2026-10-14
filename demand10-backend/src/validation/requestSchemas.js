import { z } from 'zod';

export const datasetRequestSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  phone: z.string().trim().max(40).optional(),
  companySize: z.string().trim().max(40).optional(),
  city: z.string().trim().max(120).optional(),
  message: z.string().trim().max(5000).optional(),
  productTitle: z.string().trim().max(200).optional(),
  categoryName: z.string().trim().max(200).optional(),
});
