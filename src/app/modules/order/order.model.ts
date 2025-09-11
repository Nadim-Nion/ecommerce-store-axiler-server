import { model, Schema } from 'mongoose';
import { TOrder, TOrderItem } from './order.interface';
import { ORDER_STATUS } from './order.constant';

const orderItemSchema = new Schema<TOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

const orderSchema = new Schema<TOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: (val: TOrderItem[]) =>
        val.length > 0 || 'Order must have at least one item',
    },
    total: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: 0,
    },
    status: {
      type: String,
      enum: {
        values: ORDER_STATUS,
        message: `{VALUE} is not valid status`,
      },
      default: 'pending',
    },
  },
  {
    timestamps: true, 
  },
);

// Create and export the model
export const Order = model<TOrder>('Order', orderSchema);
