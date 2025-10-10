import z from 'zod';

export const imageSchema = z.object({
  file: z
    .any()
    .refine(file => file?.length > 0, 'Image is required')
    .refine(
      file =>
        file?.[0]?.type === 'image/jpeg' ||
        file?.[0]?.type === 'image/png' ||
        file?.[0]?.type === 'image/jpg',
      'Only JPEG or PNG files are allowed'
    ),
});

export type imageSchemaType = z.infer<typeof imageSchema>;
