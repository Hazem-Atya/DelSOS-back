import * as mongoose from 'mongoose';
import { ROLE, STATUS } from '../../utils/enum';

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
    password: { type: String },
    username: { type: String },
    source: {
      filename: { type: String, required: false },
      mimetype: { type: String, required: false },
      path: { type: String },
      originalname: { type: String },
    },
    website: { type: String },
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
      default: STATUS.deactivated,
    },
  },
  { timestamps: true },
);

export interface Store extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  website: string;
  file: Express.Multer.File;
  role: string;
  address: Array<string>;
  status: string;
}
