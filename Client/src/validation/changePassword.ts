import z from 'zod';

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Current password is required')
      .refine(v => !/^[_\s]+$/.test(v), 'Invalid current password'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      )
      .refine(v => !/\s/.test(v), 'Password cannot contain spaces'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Type inference
export type PasswordFormValues = z.infer<typeof passwordSchema>;
