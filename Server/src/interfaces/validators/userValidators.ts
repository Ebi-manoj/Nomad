import z from 'zod';

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  newPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});
