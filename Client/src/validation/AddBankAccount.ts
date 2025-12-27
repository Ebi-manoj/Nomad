import { z } from 'zod';

export const bankAccountSchema = z
  .object({
    accountHolderName: z
      .string()
      .min(3, 'Account holder name must be at least 3 characters')
      .max(100, 'Account holder name must not exceed 100 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
      .transform(val => val.trim()),

    accountNumber: z
      .string()
      .min(9, 'Account number must be at least 9 digits')
      .max(18, 'Account number must not exceed 18 digits')
      .regex(/^\d+$/, 'Account number should only contain digits'),

    confirmAccountNumber: z
      .string()
      .min(9, 'Please confirm your account number')
      .regex(/^\d+$/, 'Account number should only contain digits'),

    ifscCode: z
      .string()
      .length(11, 'IFSC code must be exactly 11 characters')
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format')
      .transform(val => val.toUpperCase()),

    accountType: z.enum(['savings', 'current'], {
      message: 'Select a account type',
    }),
  })
  .refine(data => data.accountNumber === data.confirmAccountNumber, {
    message: "Account numbers don't match",
    path: ['confirmAccountNumber'],
  });

export type BankAccountFormData = z.infer<typeof bankAccountSchema>;
