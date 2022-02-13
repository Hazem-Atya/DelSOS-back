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
    password: {
       type: String,
       select: false
     },
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
      city: { type: String,default: '' },
      country: { type: String,  default: '' },
      postalCode: { type: String,  default: '' },
      address: { type: String, default: '' },
    },

    phoneNumber: { type: String },
    description: { type: String },

    status: {
      type: String,
      default: STATUS.deactivated,
    },
  },
  { timestamps: true },
);

export class Store extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  website: string;
  file: Express.Multer.File;
  role: string;
  address: Object;
  phoneNumber: string;
  status: string;
  description: string;
}
