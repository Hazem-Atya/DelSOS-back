import * as mongoose from 'mongoose';
import { ROLE, STATUS } from './enum';

export const StoreSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
      unique: true,
    },
    password: { type: String, required: true },
    username: { type: String },

    role: {
      type: String,
      default: ROLE.store,
    },

    lastLogin: {
      type: Date,
    },
    address: {
      required: true,
      type: Array<string>(),
    },

    status: {
      type: String,
      default: STATUS.deactivated
    }
  },
  { timestamps: true },
);

export interface Store extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  address: Array<string>;
  status: string
}
