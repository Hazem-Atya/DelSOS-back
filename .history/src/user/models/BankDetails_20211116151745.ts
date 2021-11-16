import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { BankDetails } from '../../../.history/src/user/models/BankDetails_20211116151610';



export const BankDetailsSchema  = new mongoose.Schema({
  owner: { type: String },
  number: { type: String, }
  
}
);

export interface BankDetails extends mongoose.Document {
  owner:string,
  number: { type: String, }
  
}