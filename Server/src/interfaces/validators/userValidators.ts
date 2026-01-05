import z from 'zod';

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  newPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const updateProfileImageSchema = z.object({
  fileURL: z.string().url({ message: 'fileURL must be a valid URL' }),
});

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(50, { message: 'Full name is too long' }),
  mobile: z.preprocess(
    val => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, { message: 'Invalid mobile number' })
      .optional()
  ),
});
