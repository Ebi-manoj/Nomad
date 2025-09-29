import z from 'zod';

export const signupDetailsSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .regex(/^[A-Za-z ]+$/, 'Name must contain only letters and spaces'),
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
export const signupSchema = z.object({
  email: z.email({ message: 'Invalid Email address' }),
});

export const verifyOTPSchema = z.object({
  otp: z
    .string()
    .min(6, { message: 'Invalid OTP format' })
    .regex(/\d{6}/, { message: 'Invalid OTP format' }),
});

export type signupDetailsFormData = z.infer<typeof signupDetailsSchema>;
export type loginFormData = z.infer<typeof loginSchema>;
export type signUpFormData = z.infer<typeof signupSchema>;
export type verifyOTPData = z.infer<typeof verifyOTPSchema>;
