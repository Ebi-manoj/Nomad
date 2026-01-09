import z from 'zod';

export const signupDetailsSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters' })
      .regex(/^[A-Za-z ]+$/, 'Name must contain only letters and spaces'),
    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, { message: 'Invalid mobile number' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
      .regex(/[a-z]/, 'Password must include at least one lowercase letter')
      .regex(/\d/, 'Password must include at least one number')
      .regex(
        /[^\w\s]/,
        'Password must include at least one special character'
      )
      .refine(v => !/\s/.test(v), { message: 'Password cannot contain spaces' }),

    confirmPassword: z
      .string()
      .min(8, { message: 'Please confirm your password' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid Email address' }),
  password: z
    .string()
    .min(6, { message: 'Invalid credintials' })
    .refine(v => !/^[_\s]+$/.test(v), {
      message: 'Invalid credintials',
    })
    .refine(v => !/\s/.test(v), { message: 'Invalid credintials' }),
});
export const emailSchema = z.object({
  email: z.email({ message: 'Invalid Email address' }),
});

export const verifyOTPSchema = z.object({
  otp: z
    .string()
    .min(6, { message: 'Provide a valid OTP' })
    .regex(/\d{6}/, { message: 'Provide a valid OTP' }),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
      .regex(/[a-z]/, 'Password must include at least one lowercase letter')
      .regex(/\d/, 'Password must include at least one number')
      .regex(
        /[^\w\s]/,
        'Password must include at least one special character'
      )
      .refine(v => !/\s/.test(v), { message: 'Password cannot contain spaces' }),

    confirmPassword: z
      .string()
      .min(8, { message: 'Please confirm your password' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type signupDetailsFormData = z.infer<typeof signupDetailsSchema>;
export type loginFormData = z.infer<typeof loginSchema>;
export type emailFormData = z.infer<typeof emailSchema>;
export type verifyOTPData = z.infer<typeof verifyOTPSchema>;
export type changePasswordData = z.infer<typeof changePasswordSchema>;
