import z from 'zod';

const userZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is a required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const UserValidation = {
  userZodSchema,
};
