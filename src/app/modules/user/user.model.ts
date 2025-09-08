import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { USER_ROLES } from './user.constant';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'customer',
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
