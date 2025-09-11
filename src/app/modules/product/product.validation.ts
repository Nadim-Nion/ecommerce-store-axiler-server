import { z } from 'zod';

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ error: 'Name is required' })
      .min(1, 'Name cannot be empty')
      .trim(),
    image: z
      .string({ error: 'Image is required' })
      .min(1, 'Image can not be empty'),
    description: z
      .string({ error: 'Description is required' })
      .min(10, 'Description must be at least 10 characters long'),
    price: z
      .number({ error: 'Price is required' })
      .min(0, 'Price cannot be negative'),
    stock: z
      .number({ error: 'Stock is required' })
      .min(0, 'Stock cannot be negative')
      .default(0),
    category: z
      .string({ error: 'Category is required' })
      .min(1, 'Category cannot be empty')
      .trim()
      .toLowerCase(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
};
