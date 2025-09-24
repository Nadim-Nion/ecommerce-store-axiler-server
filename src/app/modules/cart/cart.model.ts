import { model, Schema } from "mongoose";
import { TCart, TCartItem } from "./cart.interface";

const CartItemSchema = new Schema<TCartItem>(
  {
    productId: { 
       type: Schema.Types.ObjectId, 
       ref: "Product", 
       required: [true , "Product Id is required"]
},
    quantity: { 
       type: Number, 
       required: [true, "Quantity is required"], 
       min: 1 
},
  }
);

const CartSchema = new Schema<TCart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User Id is required"], unique: true },
    items: { type: [CartItemSchema], default: [] },
    total: { type: Number, required: [true, "Total Price is required"], default: 0 },
  },
  { timestamps: true } 
);

export const Cart = model<TCart>("Cart", CartSchema);