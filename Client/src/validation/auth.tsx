import z from 'zod';

export const signupSchema = z
  .object({
    name: z
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

    confirmPassword: z
      .string()
      .min(6, { message: 'Please confirm your password' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid Email address' }),
  password: z.string().min(6, { message: 'Invalid credintials' }),
});

export type signUpFormData = z.infer<typeof signupSchema>;
export type loginFormData = z.infer<typeof loginSchema>;
