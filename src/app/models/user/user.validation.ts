import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

const createUserValidationSchema = z.object({
  body: z.object({
    name: createUserNameValidationSchema,
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    role: z.enum(['admin', 'user']),
    status: z.enum(['basic', 'premium']),
    address: z.string(),
    image: z.string(),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const UpdateUserValidationSchema = z.object({
  body: z.object({
    name: updateUserNameValidationSchema,
    email: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    role: z.enum(['admin', 'user']).optional(),
    status: z.enum(['basic', 'premium']).optional(),
    address: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  UpdateUserValidationSchema,
};
