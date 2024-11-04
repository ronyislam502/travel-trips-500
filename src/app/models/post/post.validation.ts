import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    content: z.string(),
    image: z.string(),
    categories: z.string(),
    upVote: z.string(),
    downVote: z.string(),
    isPremium: z.boolean(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
    categories: z.string().optional(),
    upVote: z.string().optional(),
    downVote: z.string().optional(),
    isPremium: z.boolean().optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
