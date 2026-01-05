import z from 'zod';

export const profileImageSchema = z
  .object({
    file: z.any(),
  })
  .refine(data => data.file?.length > 0, {
    message: 'Image is required',
    path: ['file'],
  })
  .refine(
    data =>
      ['image/jpeg', 'image/png', 'image/jpg'].includes(
        data.file?.[0]?.type ?? ''
      ),
    {
      message: 'Only JPEG or PNG files are allowed',
      path: ['file'],
    }
  )
  .refine(data => (data.file?.[0]?.size ?? Infinity) <= 5 * 1024 * 1024, {
    message: 'Image must be under 5MB',
    path: ['file'],
  });

export type ProfileImageInput = z.infer<typeof profileImageSchema>;
