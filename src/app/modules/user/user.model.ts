import { model, Schema } from 'mongoose';
import { TUser, UserModelType } from './user.interface';
import { USER_ROLES } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModelType>(
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

// Pre save middleware/hook: will work on create() or save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');
  // const user = this;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// Post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Check the user is existed or not
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

// Check the password is matched or not
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Check the password was changed after the JWT was issued (token should be invalidated)
userSchema.statics.isJWTIssuedBeforePasswordChange = function (
  passwordChangeTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordChangeTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModelType>('User', userSchema);
