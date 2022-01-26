import * as mongoose from 'mongoose';
import { Store } from 'src/store/models/store.model';
import { Shopper } from 'src/shopper/models/shopper.model';
import { Types } from 'mongoose';

export enum DELIVERY_TYPE {
  BREAKABLE = 'breakable',
  HAZARDOUS = 'hazardous',
  FURNITURE = 'furniture',
  PACKAGE = 'package',
  LIQUID = 'liquid',
  CAN_EXPIRE = 'can expire',
  ELECTRONICS = 'electronics',
}
export enum PRIORITY {
  HIGH = 1,
  NORMAL = 2,
  LOW = 3,
}
export enum DELIVERY_STATUS {
  PENDING = 1,
  ON_THE_WAY = 2,
  DELIVERED = 3,
}
export const DeliverySchema = new mongoose.Schema(
  {
    description: { type: String },
    source: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 255,
      minlength: 4,
    },
    destination: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 255,
      minlength: 4,
    },
    store: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Store,
    },
    shopper: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Shopper,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: { type: Number },
    width: { type: Number },
    type: {
      type: [String],
      required: true,
      default: [DELIVERY_TYPE.PACKAGE],
    },
    priority: {
      type: String,
      default: PRIORITY.LOW,
    },
    status: {
      type: String,
      default: DELIVERY_STATUS.PENDING,
    },
    trackingHistory: {
      type: [
        {
          date: { type: Date, default: new Date().toJSON() },
          description: { type: String },
          location: { type: String },
        },
      ],
    },

    applicants: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);
export class Delivery extends mongoose.Document {
  description: string;
  source: string;
  destination: string;
  store: Types.ObjectId;
  shopper: Types.ObjectId;
  weight: number;
  height: number;
  width: number;
  type: DELIVERY_TYPE[];
  priority: PRIORITY;
  status: DELIVERY_STATUS;
  trackingHistory: { date: Date; description: string, location:string }[];
  applicants: String[];
}
