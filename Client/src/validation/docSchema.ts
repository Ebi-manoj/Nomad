import z from 'zod';

export const docSchema = z.object({
  doc_number: z.string().min(5, { message: 'Provide a valid doc number' }),
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

export type docSchemaType = z.infer<typeof docSchema>;
