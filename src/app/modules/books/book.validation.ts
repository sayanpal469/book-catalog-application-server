import z from 'zod';

const bookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Publish date is required',
    }),
    pdf: z.string({
      required_error: 'Pdf is required',
    }),
    description: z.string({
      required_error: 'Pdf is required',
    }),
    reviews: z
      .array(
        z.object({
          reviewer: z.string(),
          reviewText: z.string(),
        }),
      )
      .optional(),
  }),
});

export const BookValidation = {
  bookZodSchema,
};
