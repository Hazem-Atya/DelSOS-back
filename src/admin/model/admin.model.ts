import { ROLE, STATUS } from '../../utils/enum';
import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName:{type: String},
    email: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
    },
    password: { type: String, select: false },
    phoneNumber: { type: String },
    role: {
      type: String,
      default: ROLE.admin,
    },

    birthdate: {
      type: Date,
    },

    status: {
      type: String,
      default: STATUS.deactivated
    },

  },
  { timestamps: true },
);
export class Admin extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string=ROLE.admin;
  status:string;
}
