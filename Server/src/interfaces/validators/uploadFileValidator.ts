import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const uploadDocSchema = z.object({
  fileURL: z.url('fileURL must be a valid URL'),
  type: z.enum(['aadhaar', 'licence'], {
    message: 'type is required and must be "aadhaar" or "license"',
  }),
  doc_number: z.string({
    message: 'doc_number is required',
  }),
  userId: z
    .string({
      message: 'userId is required',
    })
    .regex(objectIdRegex, 'userId must be a valid MongoDB ObjectId'),
});
