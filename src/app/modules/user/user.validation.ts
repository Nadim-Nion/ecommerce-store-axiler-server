import { z } from 'zod';
import { USER_ROLES } from './user.constant';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters long'),
    email: z
      .string({ error: 'Email is required' })
      .email('Invalid email address'),
    password: z
      .string({ error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long'),
    role: z.enum([...USER_ROLES], { error: 'Role is required' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
