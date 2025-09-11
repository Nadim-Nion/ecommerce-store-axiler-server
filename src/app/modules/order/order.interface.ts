import { Types } from 'mongoose';

export type TOrderItem = {
  productId: Types.ObjectId; // reference to the product
  name: string;
  price: number;
  quantity: number;
};

export type TOrder = {
  userId: Types.ObjectId; // reference to the user
  items: TOrderItem[];
  total: number /* price * quantity */;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  isDeleted: boolean;
};
