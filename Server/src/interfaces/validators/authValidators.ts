import z, { email } from 'zod';

export const signUpShema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .regex(/^[A-Za-z ]+$/, 'Name must contain only letters and spaces'),

  email: z.email({ message: 'Invalid email address' }),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, { message: 'Invalid mobile number' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});
