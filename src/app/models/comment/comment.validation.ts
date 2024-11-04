import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    post: z.string(),
    user: z.string(),
    comment: z.string(),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    post: z.string().optional(),
    user: z.string().optional(),
    comment: z.string().optional(),
  }),
});

export const CommentValidations = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
};
