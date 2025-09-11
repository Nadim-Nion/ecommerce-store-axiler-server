import z from 'zod';
import { ORDER_STATUS } from './order.constant';

const orderItemValidationSchema = z.object({
  productId: z
    .string({ error: 'Product ID is required' })
    .min(1, 'Product ID cannot be empty'),
  name: z
    .string({ error: 'Name is required' })
    .min(1, 'Name cannot be empty')
    .trim(),
  price: z
    .number({ error: 'Price is required' })
    .min(0, 'Price cannot be negative'),
  quantity: z
    .number({ error: 'Quantity is required' })
    .min(1, 'Quantity must be at least 1'),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    userId: z
      .string({ error: 'User ID is required' })
      .min(1, 'User ID cannot be empty'),
    items: z
      .array(orderItemValidationSchema, { error: 'Order items are required' })
      .min(1, 'Order must have at least one item'),
    total: z
      .number({ error: 'Total price is required' })
      .min(0, 'Total cannot be negative'),
    status: z.enum(ORDER_STATUS).optional(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
