import { Types } from "mongoose";

export type TCartItem = {
  productId: Types.ObjectId; // reference to Product collection
  quantity: number;
}

export type TCart = {
  userId: Types.ObjectId; // reference to User collection
  items: TCartItem[];
  total: number; // total price of all items in the cart
}