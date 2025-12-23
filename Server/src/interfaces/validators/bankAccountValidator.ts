import { z } from 'zod';

export const addBankAccountSchema = z.object({
  accountHolderName: z
    .string({ message: 'Account holder name is required' })
    .trim()
    .min(1, { message: 'Account holder name is required' }),
  accountNumber: z
    .string({ message: 'Account number is required' })
    .trim()
    .min(6, { message: 'Account number is too short' })
    .max(25, { message: 'Account number is too long' }),
  ifscCode: z
    .string({ message: 'IFSC code is required' })
    .trim()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/i, { message: 'Invalid IFSC code' }),
  accountType: z.enum(['savings', 'current']),
});
