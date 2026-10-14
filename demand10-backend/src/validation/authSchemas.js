import { z } from 'zod';

const password = z.string().min(6).max(128);
const email = z.string().trim().email().transform((value) => value.toLowerCase());

export const registerSchema = z.object({
  email,
  password,
  name: z.string().trim().min(1).max(120).optional(),
  role: z.enum(['user', 'vendor']).optional(),
});

export const loginSchema = z.object({ email, password });
export const forgotPasswordSchema = z.object({ email });
export const resetPasswordSchema = z.object({ token: z.string().min(1), password });
