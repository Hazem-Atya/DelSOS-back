import { ROLE, STATUS } from '../../utils/enum';
import * as mongoose from 'mongoose';

export const ShopperSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
    },
    cinNumber : {type: String},
    cin: {
      filename: { type: String, required: false },
      mimetype: { type: String, required: false },
      path: { type: String },
      originalname: { type: String },
    },
    password: { type: String, select: false },
    username: { type: String },
    age: { type: Number },
    phoneNumber: { type: String },
    role: {
      type: String,
      default: ROLE.shopper,
    },

    lastLogin: {
      type: Date,
    },
    birthdate: {
      type: Date,
    },
    bankDetails: {
      owner: { type: String, default: '' },
      cardNumber: { type: String, default: '' },
      expirationDate: { type: Date, default: new Date() },
    },

    // range in kilometer where the shopper can deliver
    range: { type: Number, default: 0 },
    picture:{ type: String},
    address: { type: String, default: '' },

    status: {
      type: String,
      default: STATUS.deactivated,
    },
  },
  { timestamps: true },
);
export class Shopper extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  cinNumber : String;
  cin : Express.Multer.File;
  password: string;
  age: number;
  phoneNumber: string;
  role: string;
  bankDetails: Object;
  range: Array<number>;
  picture: string;
  address: string;
  status: string;
}
